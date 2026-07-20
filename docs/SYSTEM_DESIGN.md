# BCXI-Ghana Experience Intelligence Platform — L99 System Design

## Product architecture
- Google Sheets is the operational datastore.
- Apps Script is the trusted backend and serves the survey/admin HTML. Frontend calls backend with `google.script.run`, avoiding fragile cross-origin API workarounds.
- GitHub Pages is the branded public launcher/PWA shell and asset host. It redirects into the Apps Script web app.
- Official bank logos and optimized web imagery are stored under the GitHub asset tree and referenced through the `ASSETS`/`INSTITUTIONS` sheets.

## Public journey
1. Welcome/access page.
2. Respondent identity/profile + consent.
3. Institution selection. Validation mode = one main bank. Benchmark mode = multiple institutions, maximum configurable.
4. Institution tabs. Each institution contains 10 core sections, validation outcomes, NPS, overall experience and comments.
5. Every selected institution must be visited and all required items answered before final submission.
6. Server performs authoritative validation, scoring and idempotent submission.
7. Results page returns respondent BCXI score, 10 sub-index scores and institutional aggregate benchmarks when minimum sample threshold is met.

## Scoring guardrails
- Each core section contains 7 items.
- A section score is valid when at least 5 of 7 responses are numeric (1–7); N/A is excluded.
- Section 0–100 score = (mean - 1) / 6 * 100.
- Overall BCXI is valid when at least 8 of 10 section scores are valid, using the mean of valid section means and the same 0–100 conversion.
- Outcome measures, NPS and overall 0–10 rating are stored separately from the core BCXI.
- Institutional NPS is computed only at aggregate level: %Promoters - %Detractors.

## Admin architecture
- Admin email must exist in `ADMIN_USERS` and be active.
- Login uses one-time email code with 10-minute expiry; authenticated session token expires after approximately 6 hours.
- Admin data is filtered server-side by authorised institution IDs.
- Customer PII is shown in full only when follow-up consent is granted; otherwise it is masked.
- Admin can read customer comment stream, open a submission detail, email consenting customers, and request a Customer Experience Audit.
- Audit requests are logged and emailed to the configured consulting email.

## Data/privacy controls
- Keep `RESPONDENTS` separate from `RESPONSES` for cleaner access control and later pseudonymisation.
- Never expose raw spreadsheet IDs, admin lists or server configuration to the browser.
- Escape user-provided content before rendering.
- Use explicit follow-up and research consent.
- Add a published privacy notice and retention policy before production launch.
- For a research study, obtain ethics/IRB-equivalent approval where applicable and finalise demographic category wording before field deployment.

## Scale path
V1 is suitable for an Apps Script/Sheets operational pilot and moderate-volume deployment. For high national traffic or very large response volumes, move the data layer to a transactional database and keep Apps Script/Sheets as reporting or administration surfaces.
