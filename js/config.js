// Ghana CX Index — Application Configuration

export const CONFIG = {
  // Application metadata
  appName: "Ghana CX Index",
  appSlug: "gcxi",
  version: "1.0.0",
  environment: process.env.NODE_ENV || "production",

  // Backend configuration
  // Replace this with your Google Apps Script deployment URL
  appsScriptUrl: window.APPS_SCRIPT_URL || "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/usercache/exec",

  // Feature flags
  features: {
    enableSurvey: true,
    enableAdmin: true,
    enableComplaintWorkflow: true,
    enableAnalytics: true,
    enablePWA: true,
    enableOfflineMode: false,
  },

  // Assessment configuration
  assessment: {
    mode: "benchmark", // "validation" or "benchmark"
    maxInstitutionsPerRespondent: 5,
    autosaveIntervalMs: 30000,
    sessionTimeoutMs: 3600000, // 1 hour
  },

  // Scoring configuration
  scoring: {
    dimensionValidThreshold: 5,
    dimensionValidDenominator: 7,
    overallValidThreshold: 8,
    scaleMin: 1,
    scaleMax: 7,
    outputMin: 0,
    outputMax: 100,
    // Formula: (mean - 1) / 6 * 100
  },

  // Benchmark configuration
  benchmark: {
    minSampleSize: 30,
    showBenchmarkAt: "institution", // "institution", "region", "industry"
  },

  // Campaign configuration
  campaign: {
    enableQRCode: true,
    enableSMS: false,
    enableEmail: true,
  },

  // Privacy and compliance
  privacy: {
    dataRetentionDays: 730, // 2 years
    separateRespondentFromResponses: true,
    requireExplicitConsent: true,
  },

  // UI configuration
  ui: {
    theme: "light", // "light" or "dark"
    language: "en",
    dateFormat: "DD/MM/YYYY",
    currencyCode: "GHS",
  },

  // API endpoints (relative to appsScriptUrl)
  api: {
    // Public endpoints
    health: "/api/health",
    industries: "/api/respondent/industries",
    institutions: "/api/respondent/institutions",
    institution: "/api/respondent/institution",
    assessmentModel: "/api/respondent/assessment-model",
    respondentCreate: "/api/respondent/create",
    respondentSaveProgress: "/api/respondent/save-progress",
    respondentSubmit: "/api/respondent/submit",
    respondentResult: "/api/respondent/result",
    authRequestOtp: "/api/auth/request-otp",
    authVerifyOtp: "/api/auth/verify-otp",
    authLogout: "/api/auth/logout",

    // Admin endpoints
    adminDashboard: "/api/admin/dashboard",
    adminComplaints: "/api/admin/complaints",
    adminComplaintDetail: "/api/admin/complaints/detail",
    adminComplaintPublish: "/api/admin/complaints/publish",
    adminComplaintAcknowledge: "/api/admin/complaints/acknowledge",
    adminComplaintAction: "/api/admin/complaints/action",
    adminReports: "/api/admin/reports",
  },

  // Analytics configuration
  analytics: {
    googleAnalyticsId: null, // Set to your GA ID
    enableTracking: true,
  },

  // Support and help
  support: {
    helpUrl: "/docs/FAQ.md",
    contactEmail: "support@ghanacxindex.org",
    reportIssueUrl: "https://github.com/your-org/ghana-cx-index/issues",
  },
};

// Export loaded institutions list
export const INSTITUTIONS = [
  {
    id: "BANK_01",
    industry: "banking",
    type: "commercial-bank",
    name: "Absa Bank Ghana",
    slug: "absa-bank-ghana",
    logo: "assets/institutions/absa-bank-ghana/logo.png",
    hero: "assets/institutions/absa-bank-ghana/hero.webp",
    brandColor: "#0056b3",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_02",
    industry: "banking",
    type: "commercial-bank",
    name: "Access Bank Ghana",
    slug: "access-bank-ghana",
    logo: "assets/institutions/access-bank-ghana/logo.png",
    hero: "assets/institutions/access-bank-ghana/hero.webp",
    brandColor: "#003399",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_03",
    industry: "banking",
    type: "development-bank",
    name: "Agricultural Development Bank (ADB)",
    slug: "agricultural-development-bank",
    logo: "assets/institutions/agricultural-development-bank/logo.png",
    hero: "assets/institutions/agricultural-development-bank/hero.webp",
    brandColor: "#2d5016",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_04",
    industry: "banking",
    type: "commercial-bank",
    name: "Bank of Africa Ghana",
    slug: "bank-of-africa-ghana",
    logo: "assets/institutions/bank-of-africa-ghana/logo.png",
    hero: "assets/institutions/bank-of-africa-ghana/hero.webp",
    brandColor: "#cc0000",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_05",
    industry: "banking",
    type: "commercial-bank",
    name: "CalBank",
    slug: "calbank",
    logo: "assets/institutions/calbank/logo.png",
    hero: "assets/institutions/calbank/hero.webp",
    brandColor: "#ff6600",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_06",
    industry: "banking",
    type: "commercial-bank",
    name: "Consolidated Bank Ghana (CBG)",
    slug: "consolidated-bank-ghana",
    logo: "assets/institutions/consolidated-bank-ghana/logo.png",
    hero: "assets/institutions/consolidated-bank-ghana/hero.webp",
    brandColor: "#0066cc",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_07",
    industry: "banking",
    type: "commercial-bank",
    name: "Ecobank Ghana",
    slug: "ecobank-ghana",
    logo: "assets/institutions/ecobank-ghana/logo.png",
    hero: "assets/institutions/ecobank-ghana/hero.webp",
    brandColor: "#c50101",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_08",
    industry: "banking",
    type: "commercial-bank",
    name: "Fidelity Bank Ghana",
    slug: "fidelity-bank-ghana",
    logo: "assets/institutions/fidelity-bank-ghana/logo.png",
    hero: "assets/institutions/fidelity-bank-ghana/hero.webp",
    brandColor: "#0033aa",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_09",
    industry: "banking",
    type: "commercial-bank",
    name: "First Atlantic Bank",
    slug: "first-atlantic-bank",
    logo: "assets/institutions/first-atlantic-bank/logo.png",
    hero: "assets/institutions/first-atlantic-bank/hero.webp",
    brandColor: "#003d7a",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_10",
    industry: "banking",
    type: "commercial-bank",
    name: "First National Bank Ghana (FNB)",
    slug: "first-national-bank-ghana",
    logo: "assets/institutions/first-national-bank-ghana/logo.png",
    hero: "assets/institutions/first-national-bank-ghana/hero.webp",
    brandColor: "#00539b",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_11",
    industry: "banking",
    type: "commercial-bank",
    name: "GCB Bank PLC",
    slug: "gcb-bank",
    logo: "assets/institutions/gcb-bank/logo.png",
    hero: "assets/institutions/gcb-bank/hero.webp",
    brandColor: "#ffc000",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_12",
    industry: "banking",
    type: "commercial-bank",
    name: "Guaranty Trust Bank Ghana (GTBank)",
    slug: "gtbank-ghana",
    logo: "assets/institutions/gtbank-ghana/logo.png",
    hero: "assets/institutions/gtbank-ghana/hero.webp",
    brandColor: "#ce1126",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_13",
    industry: "banking",
    type: "development-bank",
    name: "National Investment Bank (NIB)",
    slug: "national-investment-bank",
    logo: "assets/institutions/national-investment-bank/logo.png",
    hero: "assets/institutions/national-investment-bank/hero.webp",
    brandColor: "#003d82",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_14",
    industry: "banking",
    type: "commercial-bank",
    name: "OmniBSIC Bank Ghana",
    slug: "omnibsic-bank-ghana",
    logo: "assets/institutions/omnibsic-bank-ghana/logo.png",
    hero: "assets/institutions/omnibsic-bank-ghana/hero.webp",
    brandColor: "#003da5",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_15",
    industry: "banking",
    type: "commercial-bank",
    name: "Prudential Bank",
    slug: "prudential-bank",
    logo: "assets/institutions/prudential-bank/logo.png",
    hero: "assets/institutions/prudential-bank/hero.webp",
    brandColor: "#003da5",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_16",
    industry: "banking",
    type: "commercial-bank",
    name: "Republic Bank Ghana",
    slug: "republic-bank-ghana",
    logo: "assets/institutions/republic-bank-ghana/logo.png",
    hero: "assets/institutions/republic-bank-ghana/hero.webp",
    brandColor: "#003d7a",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_17",
    industry: "banking",
    type: "commercial-bank",
    name: "Société Générale Ghana",
    slug: "societe-generale-ghana",
    logo: "assets/institutions/societe-generale-ghana/logo.png",
    hero: "assets/institutions/societe-generale-ghana/hero.webp",
    brandColor: "#003da5",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_18",
    industry: "banking",
    type: "commercial-bank",
    name: "Stanbic Bank Ghana",
    slug: "stanbic-bank-ghana",
    logo: "assets/institutions/stanbic-bank-ghana/logo.png",
    hero: "assets/institutions/stanbic-bank-ghana/hero.webp",
    brandColor: "#003d7a",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_19",
    industry: "banking",
    type: "commercial-bank",
    name: "Standard Chartered Bank Ghana",
    slug: "standard-chartered-bank-ghana",
    logo: "assets/institutions/standard-chartered-bank-ghana/logo.png",
    hero: "assets/institutions/standard-chartered-bank-ghana/hero.webp",
    brandColor: "#003da5",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_20",
    industry: "banking",
    type: "commercial-bank",
    name: "United Bank for Africa (UBA) Ghana",
    slug: "uba-ghana",
    logo: "assets/institutions/uba-ghana/logo.png",
    hero: "assets/institutions/uba-ghana/hero.webp",
    brandColor: "#ce1126",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_21",
    industry: "banking",
    type: "commercial-bank",
    name: "Universal Merchant Bank (UMB)",
    slug: "universal-merchant-bank",
    logo: "assets/institutions/universal-merchant-bank/logo.png",
    hero: "assets/institutions/universal-merchant-bank/hero.webp",
    brandColor: "#003d7a",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_22",
    industry: "banking",
    type: "commercial-bank",
    name: "Zenith Bank Ghana",
    slug: "zenith-bank-ghana",
    logo: "assets/institutions/zenith-bank-ghana/logo.png",
    hero: "assets/institutions/zenith-bank-ghana/hero.webp",
    brandColor: "#ce1126",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
  {
    id: "BANK_23",
    industry: "banking",
    type: "commercial-bank",
    name: "FBNBank Ghana",
    slug: "fbnbank-ghana",
    logo: "assets/institutions/fbnbank-ghana/logo.png",
    hero: "assets/institutions/fbnbank-ghana/hero.webp",
    brandColor: "#003d7a",
    active: true,
    maxAssessmentsPerRespondent: 5,
  },
];

export const INDUSTRIES = [
  { id: "01", slug: "banking", name: "Banking", active: true, institutionCount: 23 },
  { id: "02", slug: "insurance", name: "Insurance", active: false, institutionCount: 0 },
  { id: "03", slug: "telecommunications", name: "Telecommunications", active: false, institutionCount: 0 },
  { id: "04", slug: "healthcare", name: "Healthcare", active: false, institutionCount: 0 },
  { id: "05", slug: "retail", name: "Retail", active: false, institutionCount: 0 },
];

// Utility: Get institution by slug
export function getInstitutionBySlug(slug) {
  return INSTITUTIONS.find((inst) => inst.slug === slug);
}

// Utility: Get active institutions
export function getActiveInstitutions(industrySlug = "banking") {
  return INSTITUTIONS.filter((inst) => inst.active && inst.industry === industrySlug);
}

// Utility: Get active industries
export function getActiveIndustries() {
  return INDUSTRIES.filter((ind) => ind.active);
}
