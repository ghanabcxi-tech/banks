function getAdminPortalData(token,filters) {
  const admin=requireAdmin_(token), allowed=new Set((admin.institutionIds||[]).map(String)); const institutions=getObjects_(BCXI.SHEETS.INSTITUTIONS).filter(i=>allowed.has(String(i.institutionId))).map(i=>({institutionId:i.institutionId,name:i.name,logoUrl:i.logoUrl}));
  const respondents={}; getObjects_(BCXI.SHEETS.RESPONDENTS).forEach(r=>respondents[String(r.respondentId)]=r); const submissions={}; getObjects_(BCXI.SHEETS.SUBMISSIONS).filter(s=>allowed.has(String(s.institutionId))).forEach(s=>submissions[String(s.submissionId)]=s);
  let comments=getObjects_(BCXI.SHEETS.COMMENTS).filter(c=>allowed.has(String(c.institutionId))&&String(c.authorType)==='CUSTOMER');
  filters=filters||{}; if(filters.institutionId) comments=comments.filter(c=>String(c.institutionId)===String(filters.institutionId)); if(filters.status) comments=comments.filter(c=>String(c.status)===String(filters.status));
  comments.sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt))); comments=comments.slice(0,200);
  const items=comments.map(c=>{const sub=submissions[String(c.submissionId)]||{},r=respondents[String(c.respondentId)]||{},consent=bool_(sub.contactConsent);return {commentId:c.commentId,submissionId:c.submissionId,institutionId:c.institutionId,institutionName:sub.institutionName||'',topic:c.topic,body:c.body,status:c.status,createdAt:c.createdAt,bcxiScore:sub.bcxiScore===''?null:Number(sub.bcxiScore),name:r.name||'',email:consent?r.email:maskEmail_(r.email),phone:consent?r.phone:maskPhone_(r.phone),contactConsent:consent};});
  const benchmarks={}; institutions.forEach(i=>benchmarks[i.institutionId]=getBenchmarkForInstitution_(i.institutionId));
  return {ok:true,profile:admin,institutions,comments:items,benchmarks,auditAreas:getQuestionnaireSeed_().sections.map(s=>({id:s.id,title:s.title}))};
}

function getSubmissionDetail(token,submissionId) {
  const admin=requireAdmin_(token),allowed=new Set((admin.institutionIds||[]).map(String)); const sub=findObjectBy_(BCXI.SHEETS.SUBMISSIONS,'submissionId',submissionId); assert_(sub&&allowed.has(String(sub.institutionId)),'Not authorised for this submission.');
  const r=findObjectBy_(BCXI.SHEETS.RESPONDENTS,'respondentId',sub.respondentId)||{},consent=bool_(sub.contactConsent); const comments=getObjects_(BCXI.SHEETS.COMMENTS).filter(c=>String(c.submissionId)===String(submissionId)).sort((a,b)=>String(a.createdAt).localeCompare(String(b.createdAt)));
  return {submissionId:sub.submissionId,institutionId:sub.institutionId,institutionName:sub.institutionName,bcxiScore:sub.bcxiScore===''?null:Number(sub.bcxiScore),sectionScores:jsonParse_(sub.sectionScoresJson,{}),outcomeScores:jsonParse_(sub.outcomeScoresJson,{}),npsRating:sub.npsRating,overallRating:sub.overallRating,respondent:{name:r.name||'',email:consent?r.email:maskEmail_(r.email),phone:consent?r.phone:maskPhone_(r.phone),contactConsent:consent},comments};
}

function adminSendCustomerEmail(token,submissionId,subject,body) {
  const admin=requireAdmin_(token),allowed=new Set((admin.institutionIds||[]).map(String)); const sub=findObjectBy_(BCXI.SHEETS.SUBMISSIONS,'submissionId',submissionId); assert_(sub&&allowed.has(String(sub.institutionId)),'Not authorised.'); assert_(bool_(sub.contactConsent),'The customer did not grant follow-up consent.');
  const r=findObjectBy_(BCXI.SHEETS.RESPONDENTS,'respondentId',sub.respondentId); assert_(r&&cleanEmail_(r.email),'Customer email unavailable.'); subject=cleanText_(subject,180); body=cleanText_(body,10000); assert_(subject&&body,'Subject and message are required.');
  let status='SENT',error=''; try { MailApp.sendEmail({to:r.email,subject,htmlBody:'<div style="font-family:Arial,sans-serif;line-height:1.6">'+escapeHtml_(body).replace(/\n/g,'<br>')+'</div>',name:getConfigValue_('EMAIL_SENDER_NAME','BCXI-Ghana'),replyTo:admin.email}); } catch(e){status='FAILED';error=String(e.message||e);}
  appendRowsLocked_(BCXI.SHEETS.EMAIL_LOG,[[uuid_(),submissionId,sub.institutionId,r.email,admin.email,subject,status,error,nowIso_()]]);
  if(status==='SENT') appendRowsLocked_(BCXI.SHEETS.COMMENTS,[[uuid_(),submissionId,sub.sessionId,sub.institutionId,sub.respondentId,'Admin follow-up','ADMIN',admin.email,body,'','SENT_BY_EMAIL',nowIso_()]]);
  logActivity_('ADMIN',admin.adminId,'EMAIL_CUSTOMER','SUBMISSION',submissionId,{status}); if(status==='FAILED')throw new Error(error); return {ok:true,status};
}

function requestCxAudit(token,institutionId,areas,note) {
  const admin=requireAdmin_(token),allowed=new Set((admin.institutionIds||[]).map(String)); assert_(allowed.has(String(institutionId)),'Not authorised for this institution.'); const inst=findObjectBy_(BCXI.SHEETS.INSTITUTIONS,'institutionId',institutionId); assert_(inst,'Institution not found.'); areas=Array.isArray(areas)?areas:[]; note=cleanText_(note,5000); assert_(areas.length||note,'Select at least one audit area or provide a note.');
  const to=getConfigValue_('CONSULTING_EMAIL','dataformaticgh@gmail.com'); const subject='Customer Experience Audit Request — '+inst.name;
  const html='<h2>'+escapeHtml_(subject)+'</h2><p><strong>Requested by:</strong> '+escapeHtml_(admin.name)+' ('+escapeHtml_(admin.email)+')</p><p><strong>Institution:</strong> '+escapeHtml_(inst.name)+'</p><p><strong>Areas:</strong> '+escapeHtml_(areas.join(', '))+'</p><p><strong>Note:</strong><br>'+escapeHtml_(note).replace(/\n/g,'<br>')+'</p>';
  MailApp.sendEmail({to,subject,htmlBody:html,name:getConfigValue_('EMAIL_SENDER_NAME','BCXI-Ghana'),replyTo:admin.email}); const requestId=uuid_(); appendRowsLocked_(BCXI.SHEETS.AUDIT_REQUESTS,[[requestId,admin.email,institutionId,safeJson_(areas),note,'NEW',nowIso_()]]); logActivity_('ADMIN',admin.adminId,'REQUEST_CX_AUDIT','INSTITUTION',institutionId,{areas}); return {ok:true,requestId};
}

function escapeHtml_(s){return String(s||'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
