# BCXI Orchestrated Feedback Governance — v1.1

## Authoritative access model

### Developer / Super Admin
- Retains access to respondent identity and contact data subject to platform privacy controls and consent.
- Controls publication/release of complaints and qualitative feedback to the relevant bank.
- Can review, moderate, classify, redact where required, publish, withhold, or withdraw a complaint from bank visibility.
- Controls any permitted customer follow-up and communication.
- Maintains the audit trail linking respondent, submission, complaint, publication event, and bank action.

### Bank / Institution Admin
- Access remains server-side filtered to authorised institution IDs.
- Can view only complaints/feedback that BCXI has published to that institution.
- Must not receive respondent phone number, email address, or other direct contact fields.
- Cannot email, call, message, export contact details, or initiate direct customer contact through BCXI.
- Can acknowledge receipt, assign internally, add action notes, change action status, record resolution/action taken, and request a Customer Experience Audit.
- Bank action updates do not expose customer identity.

## Complaint orchestration lifecycle
SUBMITTED -> BCXI_REVIEW -> PUBLISHED_TO_BANK -> ACKNOWLEDGED -> IN_ACTION -> ACTION_RECORDED -> CLOSED

Optional moderation states:
WITHHELD, REDACTED, WITHDRAWN

## Data separation
- RESPONDENTS: identifiable respondent/profile data; Developer/Super Admin restricted.
- RESPONSES: survey answers and scoring data.
- COMPLAINTS: complaint/feedback content linked by internal IDs.
- COMPLAINT_PUBLICATIONS: records when BCXI publishes a complaint to a bank.
- BANK_ACTIONS: bank acknowledgement, assignment, status, notes, action taken and timestamps.
- AUDIT_LOG: immutable actor/action/time/object trail.

## Required bank-admin projection
Bank-admin complaint payloads must exclude direct identifiers and contact fields. Use complaint_id/submission_id pseudonymous references only. The backend, not the browser, enforces this projection.

## Preserved behaviour
Survey journey, scoring guardrails, benchmark logic, NPS calculation, institution filtering, consent capture, audit requests, public launcher/PWA architecture and existing visual asset conventions remain unchanged.
