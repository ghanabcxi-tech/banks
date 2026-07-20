const INSTITUTIONS = {
  banking: [
    { id: 'BANK_01', name: 'Absa Bank Ghana Limited', slug: 'absa-bank-ghana-limited', logoPath: '/assets/institutions/absa-bank-ghana-limited/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_02', name: 'Access Bank (Ghana) PLC', slug: 'access-bank-ghana-plc', logoPath: '/assets/institutions/access-bank-ghana-plc/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_03', name: 'Agricultural Development Bank (ADB) PLC', slug: 'agricultural-development-bank-adb-plc', logoPath: '/assets/institutions/agricultural-development-bank-adb-plc/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_04', name: 'Bank of Africa Ghana Limited', slug: 'bank-of-africa-ghana-limited', logoPath: '/assets/institutions/bank-of-africa-ghana-limited/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_05', name: 'CalBank PLC', slug: 'calbank-plc', logoPath: '/assets/institutions/calbank-plc/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_06', name: 'Consolidated Bank Ghana (CBG) Limited', slug: 'consolidated-bank-ghana-cbg-limited', logoPath: '/assets/institutions/consolidated-bank-ghana-cbg-limited/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_07', name: 'Ecobank Ghana PLC', slug: 'ecobank-ghana-plc', logoPath: '/assets/institutions/ecobank-ghana-plc/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_08', name: 'FBNBank (Ghana) Limited', slug: 'fbnbank-ghana-limited', logoPath: '/assets/institutions/fbnbank-ghana-limited/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_09', name: 'Fidelity Bank Ghana Limited', slug: 'fidelity-bank-ghana-limited', logoPath: '/assets/institutions/fidelity-bank-ghana-limited/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_10', name: 'First Atlantic Bank Limited', slug: 'first-atlantic-bank-limited', logoPath: '/assets/institutions/first-atlantic-bank-limited/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_11', name: 'First National Bank (Ghana) Limited', slug: 'first-national-bank-ghana-limited', logoPath: '/assets/institutions/first-national-bank-ghana-limited/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_12', name: 'GCB Bank PLC', slug: 'gcb-bank-plc', logoPath: '/assets/institutions/gcb-bank-plc/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_13', name: 'Guaranty Trust Bank (Ghana) Limited', slug: 'guaranty-trust-bank-ghana-limited', logoPath: '/assets/institutions/guaranty-trust-bank-ghana-limited/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_14', name: 'National Investment Bank (NIB) Limited', slug: 'national-investment-bank-nib-limited', logoPath: '/assets/institutions/national-investment-bank-nib-limited/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_15', name: 'OmniBSIC Bank Ghana Limited', slug: 'omnibsic-bank-ghana-limited', logoPath: '/assets/institutions/omnibsic-bank-ghana-limited/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_16', name: 'Prudential Bank Limited', slug: 'prudential-bank-limited', logoPath: '/assets/institutions/prudential-bank-limited/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_17', name: 'Republic Bank (Ghana) PLC', slug: 'republic-bank-ghana-plc', logoPath: '/assets/institutions/republic-bank-ghana-plc/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_18', name: 'Societe Generale Ghana PLC', slug: 'societe-generale-ghana-plc', logoPath: '/assets/institutions/societe-generale-ghana-plc/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_19', name: 'Stanbic Bank Ghana Limited', slug: 'stanbic-bank-ghana-limited', logoPath: '/assets/institutions/stanbic-bank-ghana-limited/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_20', name: 'Standard Chartered Bank Ghana PLC', slug: 'standard-chartered-bank-ghana-plc', logoPath: '/assets/institutions/standard-chartered-bank-ghana-plc/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_21', name: 'United Bank for Africa (UBA) Ghana Limited', slug: 'united-bank-for-africa-uba-ghana-limited', logoPath: '/assets/institutions/united-bank-for-africa-uba-ghana-limited/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_22', name: 'Universal Merchant Bank (UMB) Limited', slug: 'universal-merchant-bank-umb-limited', logoPath: '/assets/institutions/universal-merchant-bank-umb-limited/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' },
    { id: 'BANK_23', name: 'Zenith Bank (Ghana) Limited', slug: 'zenith-bank-ghana-limited', logoPath: '/assets/institutions/zenith-bank-ghana-limited/logo.png', formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform' }
  ],

  utilities: [],
  education: [],
  'civil-service': [],
  telecommunications: [],
  insurance: [],
  healthcare: []
};

function getInstitutionBySector(sectorSlug) {
  return INSTITUTIONS[sectorSlug] || [];
}

function getInstitutionBySlug(sectorSlug, institutionSlug) {
  const list = getInstitutionBySector(sectorSlug);
  return list.find(inst => inst.slug === institutionSlug);
}
