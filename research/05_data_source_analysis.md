# Data-source evaluation

| Provider/source | Data available | API available | Cost | Restrictions | Recommended usage |
|---|---|---:|---|---|---|
| Official company site | portfolio, locations, contacts, claims | rarely | free | terms/robots/rate limits; attribute source | primary evidence, polite fetch + cache |
| SEC EDGAR | public issuer filings | yes | free | public-company scope | corporate verification where applicable |
| US Census Business Builder | aggregate business geography | tools/downloads | free | not account enrichment | market planning only |
| SAM.gov | federal award/vendor data | yes | free/account | public procurement scope | optional signal only |
| Apollo | company/contact enrichment | yes | paid credits; plan limits | credentials, terms; no guessed contacts | user-authorized enrichment adapter |
| Clay | orchestration + provider marketplace | HTTP/API plan dependent | credits/actions | provider terms and usage costs | optional research workflow export |
| HubSpot | CRM + enrichment/intent | yes | subscription | workspace authorization | CRM sync, not source of truth for evidence |
| User CSV | customer-provided accounts | n/a | n/a | user responsible for authority | import with validation/provenance |

## Collection safeguards

- Respect robots directives and publisher terms; use low rate limits, user agent, cache, and per-domain policy.
- Store retrieval time, URL, source kind, excerpt/hash and reviewer decision.
- Do not scrape LinkedIn or gated databases. Do not infer emails from naming patterns.
- Treat enrichment as unverified until matched to evidence or a reputable provider result with status/freshness.
