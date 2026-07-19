// BCXI v1.1 security invariant
// Apply at the server-side bank-admin data projection boundary.
// Bank admins must never receive customer direct-contact fields.
// Developer/Super Admin retains controlled access under privacy/consent policy.

const BANK_ADMIN_FORBIDDEN_FIELDS = [
  'email','phone','phoneNumber','mobile','whatsapp','contactEmail',
  'contactPhone','respondentEmail','respondentPhone'
];

function sanitizeForBankAdmin(record) {
  const safe = Object.assign({}, record || {});
  BANK_ADMIN_FORBIDDEN_FIELDS.forEach(k => delete safe[k]);
  return safe;
}

function sanitizeListForBankAdmin(records) {
  return (records || []).map(sanitizeForBankAdmin);
}

// Complaint publication should be gated by a Developer/Super Admin action.
// Bank query condition: institution_id authorised AND publication_status == 'PUBLISHED_TO_BANK'.
// Remove/disable bank-admin UI actions that email/message/call customers.
// Preserve acknowledgement, internal assignment, action notes, action status and audit-request actions.
