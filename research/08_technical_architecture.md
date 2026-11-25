# Technical architecture

```text
Next.js web app → FastAPI API → PostgreSQL (RLS) ← worker queue (Redis)
                       │               ↑
                       ├─ object storage: imports/evidence snapshots
                       ├─ provider adapters: website, Apollo, HubSpot, n8n
                       └─ model gateway: structured outputs, cost/trace logs
```

| Decision | Why / alternative | Security + scale |
|---|---|---|
| Next.js + TypeScript + Tailwind/shadcn | rapid, accessible workflow UI; alternative SPA | server-side session checks; component tests |
| FastAPI + Pydantic | typed research/job contracts; alternative NestJS | validation, OpenAPI, service tokens |
| PostgreSQL + Supabase auth/storage | relational provenance/audit and RLS; alternative managed Postgres/Auth0 | workspace RLS, encrypted secrets, PITR |
| Redis-backed worker (Celery/Arq) | retryable long-running research; alternative serverless queues | idempotency keys, DLQ, quotas |
| OpenAI-compatible model gateway | model substitution and traceable JSON; alternative direct SDK | encrypted keys, redaction, spend caps |

Avoid a vector DB in MVP: evidence is structured and per-account retrieval fits PostgreSQL full-text search. Add pgvector only after an evaluated semantic-retrieval need.

Estimated starter cost: managed Postgres/auth and app hosting can begin at low developer tiers; variable costs are model tokens, enrichment credits, and website research. Meter all three per job before broad activation.
