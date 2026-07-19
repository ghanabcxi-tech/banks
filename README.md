# BCXI-Ghana Experience Intelligence Platform

## Package contents
- `apps_script/` — complete Google Apps Script project files.
- `github/` — GitHub Pages launcher/PWA shell.
- `docs/SYSTEM_DESIGN.md` — architecture, scoring and privacy guardrails.
- `docs/ASSET_MANIFEST_AND_PROMPTS.md` — image requirements, variable names and generation prompts.

## Deployment sequence
1. Create a new Google Sheet.
2. Open Extensions -> Apps Script.
3. Create each `.gs` and `.html` file with the exact names in `apps_script/`, and paste the contents.
4. Replace the default manifest with `appsscript.json` (Project Settings -> Show appsscript.json manifest file).
5. Run `initializeSystem()` once and authorise permissions.
6. Review the seeded `CONFIG`, `INSTITUTIONS`, `QUESTIONS`, and `ASSETS` sheets.
7. Update `ASSET_BASE_URL` to your GitHub Pages asset URL, wait up to five minutes for the config cache to expire (or reload the script), then run `refreshAssetUrlsFromConfig()` to rewrite all institution and shared asset URLs.
8. Add admins by running `addAdminUser('admin@institution.com','Admin Name',['BANK-01'],'INSTITUTION_ADMIN')` or by adding rows directly to `ADMIN_USERS`.
9. Deploy Apps Script as Web App: execute as yourself; access = anyone for the public survey.
10. Copy the Web App URL into `github/index.html` as `APP_SCRIPT_WEB_APP_URL`.
11. Upload `github/` and the optimized `assets/` tree to GitHub Pages.
12. Test public survey, multi-institution completion lock, scoring, benchmarks, admin OTP, customer email, and audit-request email before launch.

## Important production note
Apps Script `MailApp` sends email from the account that owns/executes the deployment. The package sets the institution administrator as `replyTo`, so customer replies go to the admin. If emails must originate from each institution administrator's actual mailbox, implement a separate authorised mail integration (for example, institution-controlled Workspace/Gmail OAuth) rather than relying on the shared deployment account.

## Questionnaire integrity
The source instrument is validation-ready, not yet empirically validated. Use `VALIDATION` mode for one-main-bank research administration. Use `BENCHMARK` mode for the multi-institution operational workflow.
