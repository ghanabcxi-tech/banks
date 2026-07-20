function getBootstrap() {
  const institutions=getObjects_(BCXI.SHEETS.INSTITUTIONS).filter(o=>bool_(o.active)).map(o=>({institutionId:o.institutionId,name:o.name,slug:o.slug,logoUrl:o.logoUrl,heroUrl:o.heroUrl,brandPrimary:o.brandPrimary,brandSecondary:o.brandSecondary}));
  const assets={}; getObjects_(BCXI.SHEETS.ASSETS).filter(o=>bool_(o.active)).forEach(o=>assets[o.assetKey]={url:o.url,alt:o.alt,category:o.category});
  const seed=getQuestionnaireSeed_();
  return {config:getPublicConfig_(),institutions,assets,questionnaire:seed,profileOptions:{regions:['Ahafo','Ashanti','Bono','Bono East','Central','Eastern','Greater Accra','North East','Northern','Oti','Savannah','Upper East','Upper West','Volta','Western','Western North'],education:['No formal education','Basic/JHS','Secondary/SHS/TVET','Diploma/HND','Bachelor’s degree','Postgraduate degree','Other','Prefer not to say'],incomeBands:getConfigValue_('INCOME_BANDS','').split('|').filter(Boolean)}};
}

function startSurvey(profile,institutionIds,mode) {
  profile=profile||{}; institutionIds=Array.isArray(institutionIds)?institutionIds:[]; mode=String(mode||getConfigValue_('DEFAULT_MODE','BENCHMARK')).toUpperCase();
  assert_(cleanText_(profile.name,120),'Name is required.');
  assert_(cleanEmail_(profile.email),'Email is required.');
  assert_(normalizePhone_(profile.phone),'Phone number is required.');
  assert_(bool_(profile.consentResearch),'Consent to aggregated customer-experience analysis is required.');
  assert_(institutionIds.length>0,'Select at least one institution.');
  if(mode==='VALIDATION') assert_(institutionIds.length===1,'Validation mode permits one main bank only.');
  const max=Number(getConfigValue_('MAX_INSTITUTIONS_PER_SESSION','5')); assert_(institutionIds.length<=max,'Select no more than '+max+' institutions in one session.');
  const validIds=new Set(getObjects_(BCXI.SHEETS.INSTITUTIONS).filter(o=>bool_(o.active)).map(o=>String(o.institutionId))); institutionIds.forEach(id=>assert_(validIds.has(String(id)),'Unknown institution selected.'));
  const mainBankId=mode==='VALIDATION'?String(institutionIds[0]):String(profile.mainBankId||'');
  if(mode!=='VALIDATION') assert_(mainBankId && institutionIds.map(String).includes(mainBankId),'Select your main bank from the institutions chosen.');
  const respondentId=uuid_(), sessionId=uuid_(), t=nowIso_();
  appendRowsLocked_(BCXI.SHEETS.RESPONDENTS,[[respondentId,cleanText_(profile.name,120),cleanEmail_(profile.email),normalizePhone_(profile.phone),cleanText_(profile.age,20),cleanText_(profile.gender,40),cleanText_(profile.region,80),cleanText_(profile.occupation,120),cleanText_(profile.education,120),cleanText_(profile.incomeBand,120),mainBankId,bool_(profile.consentFollowup),bool_(profile.consentResearch),t]]);
  appendRowsLocked_(BCXI.SHEETS.SESSIONS,[[sessionId,respondentId,mode,safeJson_(institutionIds),0,safeJson_([]),safeJson_({}), 'IN_PROGRESS',t,t,'']]);
  logActivity_('RESPONDENT',respondentId,'START_SURVEY','SESSION',sessionId,{mode,institutionIds});
  return {ok:true,sessionId,respondentId};
}

function saveDraft(sessionId,draft,visitedInstitutionIds,currentInstitutionIndex) {
  const session=findObjectBy_(BCXI.SHEETS.SESSIONS,'sessionId',sessionId); assert_(session,'Session not found.'); assert_(String(session.status)==='IN_PROGRESS','Session is not editable.');
  const text=safeJson_(draft||{}); assert_(text.length<48000,'Draft is too large. Please submit or reduce long comments.');
  updateRowById_(BCXI.SHEETS.SESSIONS,'sessionId',sessionId,{draftJson:text,visitedInstitutionIdsJson:safeJson_(visitedInstitutionIds||[]),currentInstitutionIndex:Number(currentInstitutionIndex||0),updatedAt:nowIso_()});
  return {ok:true,savedAt:nowIso_()};
}

function getSessionDraft(sessionId) {
  const s=findObjectBy_(BCXI.SHEETS.SESSIONS,'sessionId',sessionId); assert_(s,'Session not found.');
  return {sessionId:s.sessionId,status:s.status,institutionIds:jsonParse_(s.institutionIdsJson,[]),visitedInstitutionIds:jsonParse_(s.visitedInstitutionIdsJson,[]),currentInstitutionIndex:Number(s.currentInstitutionIndex||0),draft:jsonParse_(s.draftJson,{})};
}

function submitSurvey(sessionId,payload) {
  const session=findObjectBy_(BCXI.SHEETS.SESSIONS,'sessionId',sessionId); assert_(session,'Session not found.');
  if(String(session.status)==='COMPLETED') return getResultsBySession_(sessionId);
  assert_(String(session.status)==='IN_PROGRESS' || String(session.status)==='SUBMITTING','Session cannot be submitted.');
  const expectedIds=jsonParse_(session.institutionIdsJson,[]).map(String); const blocks=(payload&&payload.institutions)||[];
  assert_(blocks.length===expectedIds.length,'All selected institutions must be completed before submission.');
  const byId={}; blocks.forEach(b=>byId[String(b.institutionId)]=b); expectedIds.forEach(id=>assert_(byId[id],'Missing institution response: '+id));
  expectedIds.forEach(id=>validateInstitutionBlock_(byId[id]));
  updateRowById_(BCXI.SHEETS.SESSIONS,'sessionId',sessionId,{status:'SUBMITTING',updatedAt:nowIso_()});
  try {
    const respondent=findObjectBy_(BCXI.SHEETS.RESPONDENTS,'respondentId',session.respondentId); const instMap={}; getObjects_(BCXI.SHEETS.INSTITUTIONS).forEach(i=>instMap[String(i.institutionId)]=i);
    expectedIds.forEach(id=>{
      const existing=getObjects_(BCXI.SHEETS.SUBMISSIONS).find(s=>String(s.sessionId)===String(sessionId)&&String(s.institutionId)===id);
      if(existing) return;
      const block=byId[id], institution=instMap[id]; assert_(institution,'Institution unavailable: '+id); const score=scoreInstitution_(block.answers||{}); const submissionId=uuid_(), t=nowIso_();
      appendRowsLocked_(BCXI.SHEETS.SUBMISSIONS,[[submissionId,sessionId,session.respondentId,id,institution.name,score.bcxiScore==null?'':score.bcxiScore,score.validSections,safeJson_(score.sectionScores),safeJson_(score.outcomeScores),score.npsRating==null?'':score.npsRating,score.npsClass,score.overallRating==null?'':score.overallRating,safeJson_(block.comments||{}),bool_(respondent.consentFollowup),t]]);
      const responseRows=[]; Object.keys(block.answers||{}).forEach(qid=>{const raw=block.answers[qid],isArray=Array.isArray(raw),isNA=!isArray&&String(raw).toUpperCase()==='NA';let num='';if(!isArray&&!isNA&&((qid.startsWith('S')&&qid.includes('.'))||qid.startsWith('O')||qid==='NPS'||qid==='OVERALL'))num=Number(raw);const group=['TENURE','BRANCH_FREQ','CHANNELS'].includes(qid)?'CONTEXT':(qid.startsWith('S')?qid.split('.')[0]:(qid.startsWith('O')?'OUTCOME':qid));responseRows.push([uuid_(),submissionId,sessionId,session.respondentId,id,qid,group,isArray?safeJson_(raw):String(raw),num,isNA,t]);}); appendRowsLocked_(BCXI.SHEETS.RESPONSES,responseRows);
      const c=block.comments||{}; [['positive','What worked well'],['improve','What should improve'],['additional','Additional comment']].forEach(pair=>{const body=cleanText_(c[pair[0]],4000);if(body)appendRowsLocked_(BCXI.SHEETS.COMMENTS,[[uuid_(),submissionId,sessionId,id,session.respondentId,pair[1],'CUSTOMER',respondent.email,body,'','OPEN',t]]);});
      updateBenchmarkAggregate_(institution,score); logActivity_('RESPONDENT',session.respondentId,'SUBMIT_INSTITUTION','SUBMISSION',submissionId,{institutionId:id,bcxiScore:score.bcxiScore});
    });
    updateRowById_(BCXI.SHEETS.SESSIONS,'sessionId',sessionId,{status:'COMPLETED',submittedAt:nowIso_(),updatedAt:nowIso_(),draftJson:safeJson_({})});
    return getResultsBySession_(sessionId);
  } catch(e) {
    updateRowById_(BCXI.SHEETS.SESSIONS,'sessionId',sessionId,{status:'IN_PROGRESS',updatedAt:nowIso_()}); throw e;
  }
}

function validateInstitutionBlock_(block) {
  assert_(block && block.institutionId,'Institution response is invalid.'); const a=block.answers||{}; const seed=getQuestionnaireSeed_();
  assert_(['Less than 1 year','1–3 years','4–6 years','7–10 years','More than 10 years'].includes(String(a.TENURE)),'Please select banking tenure for this institution.');
  assert_(['Daily','Weekly','Monthly','Occasionally','Never'].includes(String(a.BRANCH_FREQ)),'Please select branch visit frequency for this institution.');
  assert_(Array.isArray(a.CHANNELS)&&a.CHANNELS.length>0,'Select at least one banking channel used for this institution.');
  seed.sections.forEach(sec=>sec.items.forEach(it=>{const v=a[it[0]];assert_(v!==undefined&&v!==null&&String(v)!=='','Please answer '+it[0]+'.');assert_(String(v).toUpperCase()==='NA'||(Number(v)>=1&&Number(v)<=7),'Invalid value for '+it[0]+'.');}));
  seed.outcomes.forEach(g=>g.items.forEach(it=>{const v=Number(a[it[0]]);assert_(v>=1&&v<=7,'Please answer '+it[0]+' using 1–7.');}));
  assert_(Number(a.NPS)>=0&&Number(a.NPS)<=10,'Please answer the recommendation question.'); assert_(Number(a.OVERALL)>=0&&Number(a.OVERALL)<=10,'Please answer the overall experience rating.');
  ['positive','improve','additional'].forEach(k=>{if(block.comments&&block.comments[k])assert_(String(block.comments[k]).length<=4000,'Comment is too long.');});
}

function getResultsBySession_(sessionId) {
  const submissions=getObjects_(BCXI.SHEETS.SUBMISSIONS).filter(s=>String(s.sessionId)===String(sessionId));
  return {ok:true,sessionId,results:submissions.map(s=>({submissionId:s.submissionId,institutionId:s.institutionId,institutionName:s.institutionName,bcxiScore:s.bcxiScore===''?null:Number(s.bcxiScore),validSections:Number(s.validSections),sectionScores:jsonParse_(s.sectionScoresJson,{}),outcomeScores:jsonParse_(s.outcomeScoresJson,{}),npsRating:s.npsRating===''?null:Number(s.npsRating),npsClass:s.npsClass,overallRating:s.overallRating===''?null:Number(s.overallRating),benchmark:getBenchmarkForInstitution_(s.institutionId)}))};
}
