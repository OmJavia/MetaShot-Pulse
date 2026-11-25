# Data dictionary

## `verified_distributors.csv`

| Field | Meaning |
|---|---|
| `account_id` | Stable demonstration identifier; not a provider ID. |
| `official_website` / `source_urls` | Public corporate URL reviewed for the record. |
| `verification_status` | `verified_public_site_partial` means identity/category only; other fields may require evidence. |
| `confidence_level` | Record-level collection confidence, not ICP fit. |
| `available_business_contact` | Empty by design; no contact data collected. |

## `synthetic_demo_accounts.csv`

Every row has `is_synthetic=true`, non-routable `example.invalid` URLs, and `synthetic_not_research` status. It may be used for demos/tests only. It must be excluded from provider calls, analytics denominators, research claims, and any activation workflow.

## Core product terms

- **Evidence:** a field-level assertion with source URL, excerpt/hash, observed time, source class and reviewer decision.
- **Fit:** suitability against the active ICP, 0–100.
- **Confidence:** confidence in the evidence supporting a decision, 0–1; never a substitute for fit.
- **Suppression:** a durable prohibition against contact/activation; never delete solely to re-import.
