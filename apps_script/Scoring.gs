function scoreInstitution_(answers) {
  const seed=getQuestionnaireSeed_(); const sectionScores={}; let validSections=0; let sectionMeanSum=0;
  seed.sections.forEach(sec=>{
    const nums=sec.items.map(it=>answers[it[0]]).filter(v=>v!==undefined && v!==null && String(v).toUpperCase()!=='NA').map(Number).filter(v=>v>=1&&v<=7);
    if(nums.length>=5) {
      const mean=nums.reduce((a,b)=>a+b,0)/nums.length;
      const score=(mean-1)/6*100;
      sectionScores[sec.id]={title:sec.title,mean:round2_(mean),score:round2_(score),validItems:nums.length};
      validSections++; sectionMeanSum+=mean;
    } else sectionScores[sec.id]={title:sec.title,mean:null,score:null,validItems:nums.length};
  });
  let bcxiScore=null;
  if(validSections>=8) {
    const overallMean=sectionMeanSum/validSections;
    bcxiScore=round2_((overallMean-1)/6*100);
  }
  const outcomeScores={};
  seed.outcomes.forEach(g=>{
    const nums=g.items.map(it=>Number(answers[it[0]])).filter(v=>v>=1&&v<=7);
    outcomeScores[g.id]={title:g.title,mean:nums.length?round2_(nums.reduce((a,b)=>a+b,0)/nums.length):null};
  });
  const nps=Number(answers.NPS); const overall=Number(answers.OVERALL);
  return {bcxiScore,validSections,sectionScores,outcomeScores,npsRating:(nps>=0&&nps<=10?nps:null),npsClass:npsClass_(nps),overallRating:(overall>=0&&overall<=10?overall:null)};
}
function npsClass_(n) { n=Number(n); if(n>=9&&n<=10)return 'Promoter'; if(n>=7&&n<=8)return 'Passive'; if(n>=0&&n<=6)return 'Detractor'; return ''; }
function round2_(n) { return Math.round((Number(n)+Number.EPSILON)*100)/100; }

function updateBenchmarkAggregate_(institution, score) {
  const sh=getSheet_(BCXI.SHEETS.BENCHMARKS); const headers=BCXI.HEADERS.BENCHMARKS;
  const data=sh.getDataRange().getValues(); const idIdx=headers.indexOf('institutionId'); let rowIndex=-1;
  for(let r=1;r<data.length;r++) if(String(data[r][idIdx])===String(institution.institutionId)){rowIndex=r+1;break;}
  const lock=LockService.getScriptLock(); lock.waitLock(30000);
  try {
    let obj={institutionId:institution.institutionId,institutionName:institution.name,submissionCount:0,validBcxiCount:0,bcxiSum:0,sectionSumsJson:'{}',sectionCountsJson:'{}',promoters:0,passives:0,detractors:0,npsCount:0,overallRatingSum:0,overallRatingCount:0,lastUpdated:''};
    if(rowIndex>0){ const row=sh.getRange(rowIndex,1,1,headers.length).getValues()[0]; headers.forEach((h,i)=>obj[h]=row[i]); }
    obj.submissionCount=Number(obj.submissionCount||0)+1;
    if(score.bcxiScore!=null){obj.validBcxiCount=Number(obj.validBcxiCount||0)+1;obj.bcxiSum=Number(obj.bcxiSum||0)+score.bcxiScore;}
    const sums=jsonParse_(obj.sectionSumsJson,{}), counts=jsonParse_(obj.sectionCountsJson,{});
    Object.keys(score.sectionScores).forEach(k=>{const s=score.sectionScores[k].score;if(s!=null){sums[k]=Number(sums[k]||0)+s;counts[k]=Number(counts[k]||0)+1;}});
    obj.sectionSumsJson=safeJson_(sums);obj.sectionCountsJson=safeJson_(counts);
    if(score.npsClass==='Promoter')obj.promoters=Number(obj.promoters||0)+1;
    if(score.npsClass==='Passive')obj.passives=Number(obj.passives||0)+1;
    if(score.npsClass==='Detractor')obj.detractors=Number(obj.detractors||0)+1;
    if(score.npsRating!=null)obj.npsCount=Number(obj.npsCount||0)+1;
    if(score.overallRating!=null){obj.overallRatingSum=Number(obj.overallRatingSum||0)+score.overallRating;obj.overallRatingCount=Number(obj.overallRatingCount||0)+1;}
    obj.lastUpdated=nowIso_(); const row=headers.map(h=>obj[h]);
    if(rowIndex>0) sh.getRange(rowIndex,1,1,row.length).setValues([row]); else sh.appendRow(row);
  } finally { lock.releaseLock(); }
}

function getBenchmarkForInstitution_(institutionId) {
  const obj=findObjectBy_(BCXI.SHEETS.BENCHMARKS,'institutionId',institutionId);
  if(!obj) return {available:false,sampleSize:0};
  const minN=Number(getConfigValue_('BENCHMARK_MIN_N','30')); const count=Number(obj.submissionCount||0);
  const sums=jsonParse_(obj.sectionSumsJson,{}), counts=jsonParse_(obj.sectionCountsJson,{}), sections={};
  Object.keys(sums).forEach(k=>sections[k]=counts[k]?round2_(Number(sums[k])/Number(counts[k])):null);
  const npsCount=Number(obj.npsCount||0); const nps=npsCount?round2_(((Number(obj.promoters||0)-Number(obj.detractors||0))/npsCount)*100):null;
  return {available:count>=minN,sampleSize:count,minRequired:minN,bcxiAverage:Number(obj.validBcxiCount||0)?round2_(Number(obj.bcxiSum||0)/Number(obj.validBcxiCount)):null,sectionAverages:sections,nps:nps,overallRatingAverage:Number(obj.overallRatingCount||0)?round2_(Number(obj.overallRatingSum||0)/Number(obj.overallRatingCount)):null};
}
