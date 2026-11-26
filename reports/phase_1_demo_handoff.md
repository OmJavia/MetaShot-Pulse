# MetaShot Pulse — Phase 1 demo handoff

## Delivered in the current demo

- Clean React/Vite dashboard branded as MetaShot Pulse.
- Local CSV profiling with identifier checks, field completeness checks, duplicate-candidate counts and parsing warnings.
- Aggregate-only import history persisted in the browser for the demo.
- Admin, Analyst and Viewer interface simulation; Viewer upload/report download actions are hidden or disabled.
- Data-quality, market, activation-contract, experiment, campaign-planning and report-readiness views.
- Downloadable aggregate demo report.
- No raw row persistence, production database integration, live messaging or product-event feed.

## Still required before production

1. Supabase project, Vercel project and account invitations.
2. Supabase Auth, real role policies, database migrations and private object storage.
3. Secure server-side import service with malware scanning, schema versions, audit logs and retention/deletion jobs.
4. Mobile event instrumentation and approved event/metric definitions.
5. Consent, legal, security and data-retention approvals.
6. Production monitoring, backups, restore drills and access-review process.

## Suggested internal walkthrough

1. Open **Imports** and review the validation rules and synthetic processing history.
2. Upload a synthetic CSV using `data/demo_csv_schema.md`.
3. Record the aggregate import and inspect the history entry.
4. Switch the **Demo role** between Admin, Analyst and Viewer.
5. Review **Activation Lab**, **Data quality** and **Reports**.
6. Capture metric-definition decisions and feedback before implementing the backend.
