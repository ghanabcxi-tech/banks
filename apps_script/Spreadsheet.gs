function initializeSystem() {
  const ss=getSs_();
  Object.keys(BCXI.SHEETS).forEach(k=>{
    const name=BCXI.SHEETS[k]; let sh=ss.getSheetByName(name); if(!sh) sh=ss.insertSheet(name);
    const headers=BCXI.HEADERS[k]; if(headers && sh.getLastRow()===0) sh.getRange(1,1,1,headers.length).setValues([headers]);
    if(headers) { sh.setFrozenRows(1); sh.getRange(1,1,1,headers.length).setFontWeight('bold'); }
  });
  seedConfig_(); seedInstitutions_(); seedQuestions_(); seedAssets_();
  return {ok:true,message:'BCXI-Ghana system initialized. Add authorised administrators to ADMIN_USERS before using the admin portal.'};
}

function seedConfig_() {
  const sh=getSheet_(BCXI.SHEETS.CONFIG); if(sh.getLastRow()>1) return;
  const rows=[
    ['APP_NAME','BCXI-Ghana Experience Intelligence Platform','Public application name'],
    ['DEFAULT_MODE','BENCHMARK','VALIDATION forces one institution; BENCHMARK allows multiple institutions'],
    ['MAX_INSTITUTIONS_PER_SESSION','5','Maximum institutions in multi-institution mode'],
    ['BENCHMARK_MIN_N','30','Minimum institutional sample before peer benchmark is shown'],
    ['CONSULTING_EMAIL','dataformaticgh@gmail.com','Destination for Customer Experience Audit requests'],
    ['SUPPORT_EMAIL','dataformaticgh@gmail.com','Public support email'],
    ['EMAIL_SENDER_NAME','BCXI-Ghana Experience Intelligence','Name shown on outgoing system emails'],
    ['ASSET_BASE_URL','https://ghanabcxi-tech.github.io/banks/assets','Base URL for optimized web assets'],
    ['PRIVACY_NOTICE','Your responses are used for customer-experience analysis and service improvement. Contact details are visible to an authorised institution administrator only when follow-up consent is granted.','Public privacy text'],
    ['INCOME_BANDS','Under GHS 2,000|GHS 2,000–4,999|GHS 5,000–9,999|GHS 10,000–19,999|GHS 20,000+|Prefer not to say','Editable profile choices']
  ]; sh.getRange(2,1,rows.length,3).setValues(rows);
}

function seedInstitutions_() {
  const sh=getSheet_(BCXI.SHEETS.INSTITUTIONS); if(sh.getLastRow()>1) return;
  const names=[
    'Absa Bank Ghana Limited','Access Bank (Ghana) PLC','Agricultural Development Bank (ADB) PLC','Bank of Africa Ghana Limited','CalBank PLC','Consolidated Bank Ghana (CBG) Limited','Ecobank Ghana PLC','FBNBank (Ghana) Limited','Fidelity Bank Ghana Limited','First Atlantic Bank Limited','First National Bank (Ghana) Limited','GCB Bank PLC','Guaranty Trust Bank (Ghana) Limited','National Investment Bank (NIB) Limited','OmniBSIC Bank Ghana Limited','Prudential Bank Limited','Republic Bank (Ghana) PLC','Societe Generale Ghana PLC','Stanbic Bank Ghana Limited','Standard Chartered Bank Ghana PLC','United Bank for Africa (UBA) Ghana Limited','Universal Merchant Bank (UMB) Limited','Zenith Bank (Ghana) Limited'
  ];
  const base=getConfigValue_('ASSET_BASE_URL','').replace(/\/$/,'');
  const rows=names.map((name,i)=>{
    const slug=name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    return ['BANK-'+String(i+1).padStart(2,'0'),name,slug,true,base+'/institutions/'+slug+'/logo.webp',base+'/institutions/'+slug+'/hero.webp','#0B1F3A','#1D6FA5',''];
  }); sh.getRange(2,1,rows.length,rows[0].length).setValues(rows);
}

function seedQuestions_() {
  const sh=getSheet_(BCXI.SHEETS.QUESTIONS); if(sh.getLastRow()>1) return;
  const rows=getQuestionRows_(); sh.getRange(2,1,rows.length,rows[0].length).setValues(rows);
}

function seedAssets_() {
  const sh=getSheet_(BCXI.SHEETS.ASSETS); if(sh.getLastRow()>1) return;
  const base=getConfigValue_('ASSET_BASE_URL','').replace(/\/$/,'');
  const defs=[
    ['CX_WELCOME','welcome/customer-experience-hero.webp','Modern Ghanaian banking customer journey','welcome'],
    ['CX_TOUCHPOINT_BRANCH','shared/banking-hall.webp','Contemporary banking hall','touchpoint'],
    ['CX_TOUCHPOINT_ATM','shared/atm.webp','Customer using an ATM','touchpoint'],
    ['CX_TOUCHPOINT_MOBILE','shared/mobile-banking.webp','Customer using mobile banking','touchpoint'],
    ['CX_TOUCHPOINT_WEB','shared/internet-banking.webp','Customer using internet banking','touchpoint'],
    ['CX_TOUCHPOINT_WHATSAPP','shared/whatsapp-banking.webp','Conversational banking experience','touchpoint'],
    ['CX_TOUCHPOINT_USSD','shared/ussd-banking.webp','USSD banking on a mobile phone','touchpoint'],
    ['CX_TOUCHPOINT_CALLCENTRE','shared/call-centre.webp','Professional banking call centre','touchpoint'],
    ['CX_TOUCHPOINT_RM','shared/relationship-manager.webp','Relationship manager assisting a customer','touchpoint'],
    ['CX_SECTION_JOURNEY','sections/01-customer-journey.webp','Integrated end-to-end banking journey','section'],
    ['CX_SECTION_STRATEGY','sections/02-cx-strategy.webp','Customer experience strategy and leadership','section'],
    ['CX_SECTION_DIFFERENTIATION','sections/03-differentiation-trust.webp','Trust, speed and differentiation in banking','section'],
    ['CX_SECTION_INNOVATION','sections/04-service-innovation.webp','Omnichannel banking service innovation','section'],
    ['CX_SECTION_PSYCHOLOGY','sections/05-empathy-effort.webp','Customer empathy, fairness and ease','section'],
    ['CX_SECTION_RELATIONSHIP','sections/06-long-term-relationship.webp','Long-term banking relationship','section'],
    ['CX_SECTION_RECOVERY','sections/07-service-recovery.webp','Complaint handling and service recovery','section'],
    ['CX_SECTION_CULTURE','sections/08-service-culture.webp','Service excellence culture','section'],
    ['CX_SECTION_MEASUREMENT','sections/09-voice-of-customer.webp','Voice of Customer and continuous improvement','section'],
    ['CX_SECTION_INTERNAL','sections/10-internal-coordination.webp','Internal coordination supporting customer service','section'],
    ['CX_SECTION_OUTCOMES','sections/11-outcomes.webp','Customer satisfaction, loyalty and advocacy','section'],
    ['CX_SECTION_NPS','sections/12-recommendation.webp','Customer recommendation','section'],
    ['CX_SECTION_OVERALL','sections/13-overall-experience.webp','Overall banking experience','section']
  ];
  const rows=defs.map(d=>[d[0],base+'/'+d[1],d[2],d[3],'',true]);
  sh.getRange(2,1,rows.length,rows[0].length).setValues(rows);
}

function addAdminUser(email,name,institutionIds,role) {
  email=cleanEmail_(email); assert_(email,'Email required');
  const ids=Array.isArray(institutionIds)?institutionIds:[];
  appendRowsLocked_(BCXI.SHEETS.ADMIN_USERS,[[uuid_(),email,cleanText_(name,120),safeJson_(ids),role||'INSTITUTION_ADMIN',true,nowIso_()]]);
  return {ok:true,email:email};
}


function refreshAssetUrlsFromConfig() {
  const base=getConfigValue_('ASSET_BASE_URL','').replace(/\/$/,'');
  assert_(base && !base.includes('YOUR-GITHUB-USERNAME'),'Set a valid ASSET_BASE_URL in CONFIG first.');
  const instSh=getSheet_(BCXI.SHEETS.INSTITUTIONS), instData=instSh.getDataRange().getValues(), instHeaders=instData[0].map(String);
  const slugIdx=instHeaders.indexOf('slug'), logoIdx=instHeaders.indexOf('logoUrl'), heroIdx=instHeaders.indexOf('heroUrl');
  for(let r=1;r<instData.length;r++) { const slug=String(instData[r][slugIdx]||''); if(!slug) continue; instSh.getRange(r+1,logoIdx+1).setValue(base+'/institutions/'+slug+'/logo.webp'); instSh.getRange(r+1,heroIdx+1).setValue(base+'/institutions/'+slug+'/hero.webp'); }
  const assetSh=getSheet_(BCXI.SHEETS.ASSETS), assetData=assetSh.getDataRange().getValues(), headers=assetData[0].map(String), keyIdx=headers.indexOf('assetKey'), urlIdx=headers.indexOf('url');
  const paths={CX_WELCOME:'welcome/customer-experience-hero.webp',CX_TOUCHPOINT_BRANCH:'shared/banking-hall.webp',CX_TOUCHPOINT_ATM:'shared/atm.webp',CX_TOUCHPOINT_MOBILE:'shared/mobile-banking.webp',CX_TOUCHPOINT_WEB:'shared/internet-banking.webp',CX_TOUCHPOINT_WHATSAPP:'shared/whatsapp-banking.webp',CX_TOUCHPOINT_USSD:'shared/ussd-banking.webp',CX_TOUCHPOINT_CALLCENTRE:'shared/call-centre.webp',CX_TOUCHPOINT_RM:'shared/relationship-manager.webp',CX_SECTION_JOURNEY:'sections/01-customer-journey.webp',CX_SECTION_STRATEGY:'sections/02-cx-strategy.webp',CX_SECTION_DIFFERENTIATION:'sections/03-differentiation-trust.webp',CX_SECTION_INNOVATION:'sections/04-service-innovation.webp',CX_SECTION_PSYCHOLOGY:'sections/05-empathy-effort.webp',CX_SECTION_RELATIONSHIP:'sections/06-long-term-relationship.webp',CX_SECTION_RECOVERY:'sections/07-service-recovery.webp',CX_SECTION_CULTURE:'sections/08-service-culture.webp',CX_SECTION_MEASUREMENT:'sections/09-voice-of-customer.webp',CX_SECTION_INTERNAL:'sections/10-internal-coordination.webp',CX_SECTION_OUTCOMES:'sections/11-outcomes.webp',CX_SECTION_NPS:'sections/12-recommendation.webp',CX_SECTION_OVERALL:'sections/13-overall-experience.webp'};
  for(let r=1;r<assetData.length;r++) { const key=String(assetData[r][keyIdx]||''); if(paths[key]) assetSh.getRange(r+1,urlIdx+1).setValue(base+'/'+paths[key]); }
  CacheService.getScriptCache().remove('cfg:ASSET_BASE_URL');
  return {ok:true,message:'Institution and shared asset URLs refreshed.'};
}
