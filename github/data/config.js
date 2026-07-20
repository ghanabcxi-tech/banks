const BCXI_CONFIG = {
  siteTitle: 'Ghana CX | Customer Experience Index',
  siteDescription: 'Measuring customer experience across the services that shape daily life in Ghana',

  sectors: [
    {
      id: 'banking',
      name: 'BCXI - Banking',
      slug: 'banks',
      status: 'active',
      description: 'Review the banking institutions you use',
      icon: '🏦',
      defaultFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform'
    },
    {
      id: 'utilities',
      name: 'Utilities',
      slug: 'utilities',
      status: 'coming-soon',
      description: 'Power, water and telecommunications',
      icon: '⚡'
    },
    {
      id: 'education',
      name: 'Educational Institutions',
      slug: 'education',
      status: 'coming-soon',
      description: 'Universities, secondary and vocational schools',
      icon: '📚'
    },
    {
      id: 'public-service',
      name: 'Public & Civil Service',
      slug: 'public-service',
      status: 'coming-soon',
      description: 'Public sector agencies and services',
      icon: '🏛️'
    },
    {
      id: 'telecommunications',
      name: 'Telecommunications',
      slug: 'telecommunications',
      status: 'coming-soon',
      description: 'Mobile and internet service providers',
      icon: '📱'
    },
    {
      id: 'insurance',
      name: 'Insurance',
      slug: 'insurance',
      status: 'coming-soon',
      description: 'Insurance companies and providers',
      icon: '🛡️'
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      slug: 'healthcare',
      status: 'coming-soon',
      description: 'Hospitals, clinics and health services',
      icon: '⚕️'
    }
  ],

  cxDimensions: [
    { name: 'Access & Convenience', slug: 'access-convenience' },
    { name: 'Digital Experience', slug: 'digital-experience' },
    { name: 'Physical Service Experience', slug: 'physical-service' },
    { name: 'Customer Service', slug: 'customer-service' },
    { name: 'Speed & Efficiency', slug: 'speed-efficiency' },
    { name: 'Product / Service Value', slug: 'product-value' },
    { name: 'Trust & Security', slug: 'trust-security' },
    { name: 'Transparency', slug: 'transparency' },
    { name: 'Problem Resolution', slug: 'problem-resolution' },
    { name: 'Overall Experience', slug: 'overall-experience' }
  ]
};
