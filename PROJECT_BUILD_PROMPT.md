# Build brief — ChannelSignal

Build ChannelSignal, a production-quality, evidence-first **AI Distributor Intelligence & Pipeline Engine**. Use the Phase 1 package in this repository as the product source of truth. Do not replace it with a generic CRM, fabricate enrichment, guess contacts, scrape restricted sources, or enable real email delivery.

## Product definition

**Users:** channel/GTM managers, partnership teams, RevOps and approved researchers. **Customer:** a physical-product brand finding US distribution partners. **Core job:** turn an account list and public evidence into defensible distributor qualification, a human-approved outreach draft, and a measurable pipeline next step.

**Differentiation:** field-level provenance; separate commercial fit from evidence confidence; category/portfolio/coverage-aware ICPs; and approval-only activation. MVP objectives: import/discover accounts, research them with cited evidence, score them explainably, manage review/pipeline, draft grounded messages, simulate sequences, and measure real database events. Non-goals: a contact-data vendor, LinkedIn scraper, autonomous email sender, or a full CRM replacement.

## Required UX

Use Next.js/React/TypeScript, Tailwind, shadcn/ui, Lucide and subtle Motion. Aim for a dark “signal room” aesthetic: high-density but calm, visible provenance chips, timeline events, clear empty states, keyboard-first tables, responsive layout and WCAG-minded contrast. Use server-calculated metrics; never static dashboard numbers except explicitly marked seed/demo data.

### Modules

1. **Dashboard:** totals for discovered, researched, qualified, review-needed, verified contacts, drafts, approved drafts, positive replies, meetings, opportunities and pipeline amount only where actual opportunity values exist. Include funnel, market distribution, qualification breakdown, recent activity, data-quality and AI-performance cards. Synthetic data must be excluded by default and visibly labelled if included.
2. **ICP Studio:** create/version ICPs; industries, countries, size range, categories, requirements, weights, hard disqualifiers; preview accounts. Show criterion contributions, unknowns and fit/confidence separately.
3. **Account Discovery:** CSV import with preview/errors, manual accounts, provider connector stubs, country/category filters, domain-first dedupe candidates and research-job initiation.
4. **Research Workbench:** profile, field-level evidence cards (URL, excerpt, captured date, source class, status), missing information, freshness and approve/correct/reject actions. A correction creates an audit event.
5. **Intelligent Scoring:** fit /100, confidence /1, criterion scores, evidence and explanations; versioned manual overrides with reason.
6. **Contact Intelligence:** only user-supplied/publicly-listed/provider-enriched contacts; source, verification, freshness, suppression. Never derive an email address.
7. **Outreach Studio:** email types: first touch, follow-up, partnership, introduction, product pitch. Generate only from approved evidence; display used evidence; edit/approve/reject. Delivery remains simulation-only.
8. **Sequence Management:** named sequence, target ICP, 7-day configurable steps/delays/exit conditions. Simulate activity and let users record replies.
9. **Pipeline:** stages New, Researching, Qualified, Contact identified, Outreach drafted, Approved, Contacted, Replied, Meeting scheduled, Opportunity, Won, Lost, Suppressed. Drag/drop or explicit transition, notes/tasks/owner/history.
10. **Revenue Analytics:** use documented numerator/denominator. No commercial results from seeded data.
11. **Evaluation Lab:** qualification precision/recall/F1, research evidence coverage, outreach factuality, acceptance, model cost and latency; compare immutable evaluation runs.
12. **Settings/integrations:** connection status for Apollo, HubSpot, model provider, n8n, CSV and email simulation; secrets never returned to client; retention, theme, suppression and audit views.

## Data model (PostgreSQL)

Use UUID PKs, `workspace_id`, `created_at`, `updated_at` widely; enforce RLS by workspace membership. Add composite indexes on workspace/status/timestamps and unique normalized domain per workspace where non-null.

| Entity | Essential fields / relationships |
|---|---|
| users, workspaces, memberships | auth identity, role (`admin`,`operator`,`reviewer`,`viewer`) |
| icp_profiles, icp_criteria, icp_versions | criteria JSON/schema, weight, hard-rule, active version |
| accounts | normalized_name/domain, HQ, country, category, model, synthetic flag, lifecycle stage |
| account_sources, research_evidence | source type/url, retrieval time; evidence field/path, excerpt, hash, confidence, reviewer status |
| research_jobs, research_runs | input snapshot, status, provider/model trace, error/retry/cost/latency |
| account_scores, score_criteria_results | fit, confidence, reasons, ICP version, override metadata |
| contacts, suppression_entries | source/verification/freshness; canonical normalized email only when lawfully supplied; immutable suppression reason |
| buying_signals | type, source, occurred_at, confidence, evidence link |
| outreach_drafts | content, purpose, evidence IDs, status, reviewer, prompt/model trace |
| sequences, sequence_steps, enrollments, email_events | simulation only; transition-safe event state |
| pipeline_events, tasks, activities | from/to stage, owner, due date, note, actor |
| integrations, crm_sync_records | encrypted config reference, status, external ID, sync hash/result |
| evaluation_datasets, evaluation_items, evaluation_runs, evaluation_results | immutable dataset/model/prompt versions, labels, metrics |
| audit_logs | actor, action, entity, before/after redacted JSON, trace ID |

Do not duplicate evidence text onto accounts. Evidence claims should be append-only; user corrections create superseding records. Add a `data_classification` and retention field for personal data.

## API and service architecture

Use FastAPI + Pydantic v2 and OpenAPI. Make long work asynchronous via Redis + worker (Celery or Arq). Endpoints include:

```text
POST /v1/accounts/imports              # CSV, dry-run errors + committed batch
GET  /v1/accounts?filters=...          # paginated, workspace scoped
POST /v1/accounts/{id}/research-jobs   # idempotency key required
POST /v1/accounts/{id}/score
POST /v1/accounts/{id}/stage-transitions
POST /v1/icps / PATCH /v1/icps/{id}
POST /v1/outreach/drafts               # evidence IDs required
POST /v1/outreach/drafts/{id}/approve
POST /v1/sequences/{id}/simulate
POST /v1/replies/classify
GET  /v1/analytics/funnel
POST /v1/evaluations/runs
GET  /v1/integrations / POST /v1/integrations/{provider}/test
```

Validate imports with row number/error/warning; normalize domains; hash source URLs; reject cross-workspace IDs. Use an idempotency record for external/provider calls and stage actions. Workers retry only transient errors with exponential backoff and a dead-letter/review state. Do not silently retry model factuality/schema failures.

## AI implementation contracts

Use a model gateway and structured JSON schemas. Each run records `trace_id`, model, prompt version, input evidence IDs, unknowns, confidence, token estimate/cost and latency.

```ts
type ResearchClaim = { field: string; value: string | null; evidence_ids: string[]; confidence: number; unknown_reason?: string }
type Qualification = { fit_score: number; evidence_confidence: number; criterion_results: Criterion[]; disqualified: boolean; reasons: string[]; unknowns: string[] }
type OutreachDraft = { subject: string; body: string; claims: { text: string; evidence_ids: string[] }[]; needs_review: true }
```

The system prompt must enforce: use supplied evidence only; no material claim without at least one evidence ID; return `unknown` rather than infer; never make or guess contact details; drafts need review. Groundedness validation rejects unsupported evidence references. Cache by account evidence snapshot + prompt version. Cap cost/account and show a preview/dry-run.

## Scoring, analytics and evaluation

Implement the Phase 1 default scoring weights (category 25, geography 20, capability 20, brand/retail 15, scale 10, signals 10). Calculate fit over observed weights only. Confidence is coverage/source quality/freshness; do not penalize missing information as negative fit. Hard rules require cited evidence and explicit reason.

Define conversions in UI tooltips/API:

- qualification rate = qualified accounts / researched accounts;
- contact verification = verified contacts / contacts with verification attempted;
- approval rate = approved drafts / reviewed drafts;
- reply rate = replied enrollments / delivered simulated events (or `not available` when no delivery);
- positive reply rate = positive replies / classified replies;
- meeting conversion = meetings / positive replies;
- opportunity conversion = opportunities / meetings;
- pipeline generated = sum of actual `opportunity.amount` where source is non-synthetic.

Evaluation datasets are human-labelled and versioned. Calculate precision, recall, F1 and false-positive/negative rates only with a completed golden set; display sample count and `insufficient data` otherwise.

## Integrations and security

Implement provider interfaces plus mock adapters. Apollo/HubSpot/n8n must show `not_configured`, `testing`, `connected`, `degraded`, or `failed`, and function gracefully without credentials. Encrypt secrets at rest; scoped service roles; HTTPS; RLS tests; audit privileged/export actions; redact secrets/PII in logs. Respect robots/terms in website research. Model inputs must minimize personal data.

`EmailProvider` must only expose a simulation adapter in MVP. Do not ship SMTP/Resend/SendGrid real sending code behind a hidden flag. Implement suppression before any simulation; a suppression blocks enrollment and records why.

## Seed and acceptance criteria

Load `data/verified_distributors.csv` as partial evidence-backed demo accounts and `data/synthetic_demo_accounts.csv` only behind an explicit “include synthetic” toggle. Seed no personal contacts or invented replies/opportunities.

- A user can import a malformed CSV and receive precise row errors without partial corruption.
- Research stores evidence/unknowns and cannot create uncited claims.
- Changing ICP weights recalculates a versioned, explainable score.
- A manual score correction appears in audit history.
- A draft visibly links each factual statement to evidence and cannot send.
- A suppressed contact cannot be enrolled.
- Metrics change from database records and show `not available` when denominators are zero.
- RLS and cross-workspace access tests pass; API/schema, worker retry, scoring, and groundedness tests pass.

Deliver migrations, seed loaders, `.env.example`, setup README, architectural decision notes, API docs, unit/integration tests and a short evaluation report. Build a polished, working vertical slice before optional connector breadth.
