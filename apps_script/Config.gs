/** BCXI-Ghana Experience Intelligence Platform - Configuration */
const BCXI = Object.freeze({
  VERSION: '1.0.0',
  SHEETS: {
    CONFIG: 'CONFIG',
    INSTITUTIONS: 'INSTITUTIONS',
    QUESTIONS: 'QUESTIONS',
    RESPONDENTS: 'RESPONDENTS',
    SESSIONS: 'SURVEY_SESSIONS',
    SUBMISSIONS: 'SUBMISSIONS',
    RESPONSES: 'RESPONSES',
    COMMENTS: 'COMMENTS',
    ADMIN_USERS: 'ADMIN_USERS',
    AUDIT_REQUESTS: 'AUDIT_REQUESTS',
    EMAIL_LOG: 'EMAIL_LOG',
    ACTIVITY_LOG: 'ACTIVITY_LOG',
    ASSETS: 'ASSETS',
    BENCHMARKS: 'BENCHMARKS'
  },
  HEADERS: {
    CONFIG: ['key','value','description'],
    INSTITUTIONS: ['institutionId','name','slug','active','logoUrl','heroUrl','brandPrimary','brandSecondary','adminContact'],
    QUESTIONS: ['questionId','groupId','sectionOrder','itemOrder','type','prompt','required','allowNA','scoreGroup','reverse','optionsJson','imageKey','active'],
    RESPONDENTS: ['respondentId','name','email','phone','age','gender','region','occupation','education','incomeBand','mainBankId','consentFollowup','consentResearch','createdAt'],
    SESSIONS: ['sessionId','respondentId','mode','institutionIdsJson','currentInstitutionIndex','visitedInstitutionIdsJson','draftJson','status','createdAt','updatedAt','submittedAt'],
    SUBMISSIONS: ['submissionId','sessionId','respondentId','institutionId','institutionName','bcxiScore','validSections','sectionScoresJson','outcomeScoresJson','npsRating','npsClass','overallRating','commentsJson','contactConsent','submittedAt'],
    RESPONSES: ['responseId','submissionId','sessionId','respondentId','institutionId','questionId','groupId','valueRaw','valueNumeric','isNA','createdAt'],
    COMMENTS: ['commentId','submissionId','sessionId','institutionId','respondentId','topic','authorType','authorEmail','body','parentCommentId','status','createdAt'],
    ADMIN_USERS: ['adminId','email','name','institutionIdsJson','role','active','createdAt'],
    AUDIT_REQUESTS: ['requestId','adminEmail','institutionId','areasJson','note','status','createdAt'],
    EMAIL_LOG: ['emailId','submissionId','institutionId','toEmail','fromActor','subject','status','error','createdAt'],
    ACTIVITY_LOG: ['logId','actorType','actorId','action','entityType','entityId','metadataJson','createdAt'],
    ASSETS: ['assetKey','url','alt','category','institutionId','active'],
    BENCHMARKS: ['institutionId','institutionName','submissionCount','validBcxiCount','bcxiSum','sectionSumsJson','sectionCountsJson','promoters','passives','detractors','npsCount','overallRatingSum','overallRatingCount','lastUpdated']
  }
});

function getConfigValue_(key, fallback) {
  const cache = CacheService.getScriptCache();
  const cacheKey = 'cfg:' + key;
  const cached = cache.get(cacheKey);
  if (cached !== null) return cached;
  const sh = getSheet_(BCXI.SHEETS.CONFIG);
  if (!sh || sh.getLastRow() < 2) return fallback;
  const values = sh.getRange(2,1,sh.getLastRow()-1,2).getValues();
  for (let i=0;i<values.length;i++) {
    if (String(values[i][0]).trim() === key) {
      const val = String(values[i][1]);
      cache.put(cacheKey, val, 300);
      return val;
    }
  }
  return fallback;
}

function getPublicConfig_() {
  return {
    appName: getConfigValue_('APP_NAME','BCXI-Ghana Experience Intelligence Platform'),
    mode: getConfigValue_('DEFAULT_MODE','BENCHMARK'),
    maxInstitutions: Number(getConfigValue_('MAX_INSTITUTIONS_PER_SESSION','5')),
    benchmarkMinN: Number(getConfigValue_('BENCHMARK_MIN_N','30')),
    privacyText: getConfigValue_('PRIVACY_NOTICE','Your responses are used for customer-experience analysis and service improvement. Contact details are visible to an authorised institution administrator only when follow-up consent is granted.'),
    supportEmail: getConfigValue_('SUPPORT_EMAIL','dataformaticgh@gmail.com')
  };
}
