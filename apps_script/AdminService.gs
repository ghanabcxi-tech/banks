function getAdminPortalData(token,filters) {
  const admin=requireAdmin_(token), isSuper=(admin.role==='SUPER_ADMIN'||admin.role==='DEVELOPER_ADMIN');
  const allowed=new Set((admin.institutionIds||[]).map(String));
  const institutions=getObjects_(BCXI.SHEETS.INSTITUTIONS).filter(i=>isSuper || allowed.has(String(i.institutionId))).map(i=>({institutionId:i.institutionId,name:i.name,logoUrl:i.logoUrl}));
  const respondents={};
  if (isSuper) {
    getObjects_(BCXI.SHEETS.RESPONDENTS).forEach(r=>respondents[String(r.respondentId)]=r);
  }
  const submissions={};
  getObjects_(BCXI.SHEETS.SUBMISSIONS).filter(s=>isSuper || allowed.has(String(s.institutionId))).forEach(s=>submissions[String(s.submissionId)]=s);
  
  let items=[];
  if (isSuper) {
    let complaints=getObjects_(BCXI.SHEETS.COMPLAINTS);
    if(filters.institutionId) complaints=complaints.filter(c=>String(c.institutionId)===String(filters.institutionId));
    if(filters.status) complaints=complaints.filter(c=>String(c.status)===String(filters.status));
    complaints.sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
    complaints=complaints.slice(0,200);
    items=complaints.map(c=>{
      const sub=submissions[String(c.submissionId)]||{}, r=respondents[String(c.respondentId)]||{}, consent=bool_(sub.contactConsent);
      return {commentId:c.complaintId,submissionId:c.submissionId,institutionId:c.institutionId,institutionName:sub.institutionName||'',topic:c.topic,body:c.body,status:c.status,createdAt:c.createdAt,bcxiScore:sub.bcxiScore===''?null:Number(sub.bcxiScore),name:r.name||'',email:consent?r.email:maskEmail_(r.email),phone:consent?r.phone:maskPhone_(r.phone),contactConsent:consent};
    });
  } else {
    let publications=getObjects_(BCXI.SHEETS.COMPLAINT_PUBLICATIONS).filter(p=>allowed.has(String(p.institutionId)));
    if(filters.institutionId) publications=publications.filter(p=>String(p.institutionId)===String(filters.institutionId));
    const actions={};
    getObjects_(BCXI.SHEETS.BANK_ACTIONS).forEach(a=>actions[String(a.publicationId)]=a);
    const complaintsMap={};
    getObjects_(BCXI.SHEETS.COMPLAINTS).forEach(c=>complaintsMap[String(c.complaintId)]=c);
    publications.sort((a,b)=>String(b.publishedAt).localeCompare(String(a.publishedAt)));
    publications=publications.slice(0,200);
    items=publications.map(p=>{
      const comp=complaintsMap[p.complaintId]||{};
      const sub=submissions[String(comp.submissionId)]||{};
      const act=actions[p.publicationId]||{};
      return {commentId:comp.complaintId,publicationId:p.publicationId,submissionId:comp.submissionId||'',institutionId:p.institutionId,institutionName:sub.institutionName||'',topic:comp.topic||'Customer Feedback',body:p.moderatedBody,status:act.status||'PUBLISHED_TO_BANK',createdAt:p.publishedAt,bcxiScore:sub.bcxiScore===''?null:Number(sub.bcxiScore),name:'Customer',email:'***',phone:'***',contactConsent:false};
    });
  }
  
  const benchmarks={};
  institutions.forEach(i=>benchmarks[i.institutionId]=getBenchmarkForInstitution_(i.institutionId));
  return {ok:true,profile:admin,institutions,comments:items,benchmarks,auditAreas:getQuestionnaireSeed_().sections.map(s=>({id:s.id,title:s.title}))};
}

function getSubmissionDetail(token,submissionId) {
  const admin=requireAdmin_(token), isSuper=(admin.role==='SUPER_ADMIN'||admin.role==='DEVELOPER_ADMIN');
  const allowed=new Set((admin.institutionIds||[]).map(String));
  const sub=findObjectBy_(BCXI.SHEETS.SUBMISSIONS,'submissionId',submissionId);
  assert_(sub&&(isSuper || allowed.has(String(sub.institutionId))),'Not authorised for this submission.');
  
  if (isSuper) {
    const r=findObjectBy_(BCXI.SHEETS.RESPONDENTS,'respondentId',sub.respondentId)||{}, consent=bool_(sub.contactConsent);
    const complaints=getObjects_(BCXI.SHEETS.COMPLAINTS).filter(c=>String(c.submissionId)===String(submissionId));
    const publications=getObjects_(BCXI.SHEETS.COMPLAINT_PUBLICATIONS).filter(p=>complaints.map(c=>c.complaintId).includes(p.complaintId));
    return {submissionId:sub.submissionId,institutionId:sub.institutionId,institutionName:sub.institutionName,bcxiScore:sub.bcxiScore===''?null:Number(sub.bcxiScore),sectionScores:jsonParse_(sub.sectionScoresJson,{}),outcomeScores:jsonParse_(sub.outcomeScoresJson,{}),npsRating:sub.npsRating,overallRating:sub.overallRating,respondent:{name:r.name||'',email:consent?r.email:maskEmail_(r.email),phone:consent?r.phone:maskPhone_(r.phone),contactConsent:consent},comments:complaints.map(c=>({complaintId:c.complaintId,topic:c.topic,body:c.body,status:c.status,createdAt:c.createdAt,published:publications.some(p=>p.complaintId===c.complaintId)}))};
  } else {
    const complaints=getObjects_(BCXI.SHEETS.COMPLAINTS).filter(c=>String(c.submissionId)===String(submissionId));
    const compIds=complaints.map(c=>c.complaintId);
    const publications=getObjects_(BCXI.SHEETS.COMPLAINT_PUBLICATIONS).filter(p=>compIds.includes(p.complaintId));
    const pubIds=publications.map(p=>p.publicationId);
    const actions=getObjects_(BCXI.SHEETS.BANK_ACTIONS).filter(a=>pubIds.includes(a.publicationId));
    return {submissionId:sub.submissionId,institutionId:sub.institutionId,institutionName:sub.institutionName,bcxiScore:sub.bcxiScore===''?null:Number(sub.bcxiScore),sectionScores:jsonParse_(sub.sectionScoresJson,{}),outcomeScores:jsonParse_(sub.outcomeScoresJson,{}),npsRating:sub.npsRating,overallRating:sub.overallRating,respondent:{name:'Customer',email:'***',phone:'***',contactConsent:false},comments:publications.map(p=>{const comp=complaints.find(c=>c.complaintId===p.complaintId)||{};const act=actions.find(a=>a.publicationId===p.publicationId)||{};return {complaintId:p.complaintId,publicationId:p.publicationId,topic:comp.topic||'Customer Feedback',body:p.moderatedBody,status:act.status||'PUBLISHED_TO_BANK',actionNotes:jsonParse_(act.actionNotesJson,[]),createdAt:p.publishedAt};})};
  }
}

function publishComplaintToBank(token, complaintId, moderatedBody) {
  const admin=requireSuperAdmin_(token);
  const complaint=findObjectBy_(BCXI.SHEETS.COMPLAINTS,'complaintId',complaintId);
  assert_(complaint,'Complaint not found.');
  assert_(String(complaint.status)==='SUBMITTED'||String(complaint.status)==='MODERATED','Complaint is already processed.');
  moderatedBody=cleanText_(moderatedBody,4000); assert_(moderatedBody,'Moderated body text is required.');
  
  const publicationId=uuid_(), t=nowIso_();
  appendRowsLocked_(BCXI.SHEETS.COMPLAINT_PUBLICATIONS,[[publicationId,complaintId,complaint.institutionId,admin.adminId,moderatedBody,t]]);
  updateRowById_(BCXI.SHEETS.COMPLAINTS,'complaintId',complaintId,{status:'PUBLISHED_TO_BANK'});
  
  const actionId=uuid_();
  appendRowsLocked_(BCXI.SHEETS.BANK_ACTIONS,[[actionId,publicationId,complaint.institutionId,'','PUBLISHED_TO_BANK',safeJson_([]),t]]);
  
  logActivity_('SUPER_ADMIN',admin.adminId,'PUBLISH_COMPLAINT','COMPLAINT',complaintId,{publicationId});
  return {ok:true,publicationId};
}

function updateBankAction(token, publicationId, status, note) {
  const admin=requireAdmin_(token), allowed=new Set((admin.institutionIds||[]).map(String));
  const pub=findObjectBy_(BCXI.SHEETS.COMPLAINT_PUBLICATIONS,'publicationId',publicationId);
  assert_(pub,'Publication not found.');
  assert_(allowed.has(String(pub.institutionId))||admin.role==='SUPER_ADMIN'||admin.role==='DEVELOPER_ADMIN','Not authorised.');
  assert_(["ACKNOWLEDGED","IN_ACTION","ACTION_RECORDED","CLOSED"].includes(status),'Invalid status value.');
  note=cleanText_(note,2000);
  
  const action=findObjectBy_(BCXI.SHEETS.BANK_ACTIONS,'publicationId',publicationId);
  assert_(action,'Bank action record not found.');
  
  const notes=jsonParse_(action.actionNotesJson,[]);
  if (note) {
    notes.push({author:admin.name,email:admin.email,note:note,createdAt:nowIso_()});
  }
  updateRowById_(BCXI.SHEETS.BANK_ACTIONS,'publicationId',publicationId,{status:status,actionNotesJson:safeJson_(notes),updatedAt:nowIso_()});
  logActivity_('ADMIN',admin.adminId,'UPDATE_BANK_ACTION','PUBLICATION',publicationId,{status,hasNote:!!note});
  return {ok:true};
}

function adminSendCustomerEmail(token,submissionId,subject,body) {
  const admin=requireSuperAdmin_(token);
  const sub=findObjectBy_(BCXI.SHEETS.SUBMISSIONS,'submissionId',submissionId); assert_(sub,'Submission not found.'); assert_(bool_(sub.contactConsent),'The customer did not grant follow-up consent.');
  const r=findObjectBy_(BCXI.SHEETS.RESPONDENTS,'respondentId',sub.respondentId); assert_(r&&cleanEmail_(r.email),'Customer email unavailable.');
  subject=cleanText_(subject,180); body=cleanText_(body,10000); assert_(subject&&body,'Subject and message are required.');
  
  let status='SENT',error='';
  try {
    MailApp.sendEmail({to:r.email,subject,htmlBody:'<div style="font-family:Arial,sans-serif;line-height:1.6">'+escapeHtml_(body).replace(/\n/g,'<br>')+'</div>',name:getConfigValue_('EMAIL_SENDER_NAME','BCXI-Ghana'),replyTo:admin.email});
  } catch(e){status='FAILED';error=String(e.message||e);}
  
  appendRowsLocked_(BCXI.SHEETS.EMAIL_LOG,[[uuid_(),submissionId,sub.institutionId,r.email,admin.email,subject,status,error,nowIso_()]]);
  if(status==='SENT') {
    appendRowsLocked_(BCXI.SHEETS.COMPLAINTS,[[uuid_(),submissionId,sub.sessionId,sub.respondentId,sub.institutionId,'Super Admin follow-up',body,'CLOSED',nowIso_()]]);
  }
  logActivity_('SUPER_ADMIN',admin.adminId,'EMAIL_CUSTOMER','SUBMISSION',submissionId,{status});
  if(status==='FAILED')throw new Error(error);
  return {ok:true,status};
}

function requestCxAudit(token,institutionId,areas,note) {
  const admin=requireAdmin_(token),allowed=new Set((admin.institutionIds||[]).map(String)); assert_(allowed.has(String(institutionId))||admin.role==='SUPER_ADMIN'||admin.role==='DEVELOPER_ADMIN','Not authorised for this institution.');
  const inst=findObjectBy_(BCXI.SHEETS.INSTITUTIONS,'institutionId',institutionId); assert_(inst,'Institution not found.');
  areas=Array.isArray(areas)?areas:[]; note=cleanText_(note,5000); assert_(areas.length||note,'Select at least one audit area or provide a note.');
  const to=getConfigValue_('CONSULTING_EMAIL','dataformaticgh@gmail.com'); const subject='Customer Experience Audit Request — '+inst.name;
  const html='<h2>'+escapeHtml_(subject)+'</h2><p><strong>Requested by:</strong> '+escapeHtml_(admin.name)+' ('+escapeHtml_(admin.email)+')</p><p><strong>Institution:</strong> '+escapeHtml_(inst.name)+'</p><p><strong>Areas:</strong> '+escapeHtml_(areas.join(', '))+'</p><p><strong>Note:</strong><br>'+escapeHtml_(note).replace(/\n/g,'<br>')+'</p>';
  MailApp.sendEmail({to,subject,htmlBody:html,name:getConfigValue_('EMAIL_SENDER_NAME','BCXI-Ghana'),replyTo:admin.email}); const requestId=uuid_(); appendRowsLocked_(BCXI.SHEETS.AUDIT_REQUESTS,[[requestId,admin.email,institutionId,safeJson_(areas),note,'NEW',nowIso_()]]); logActivity_('ADMIN',admin.adminId,'REQUEST_CX_AUDIT','INSTITUTION',institutionId,{areas}); return {ok:true,requestId};
}

function escapeHtml_(s){return String(s||'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
