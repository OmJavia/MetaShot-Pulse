# AI system design

## Observable workflows

| Workflow | Input | Output | Guardrail / review | Metric |
|---|---|---|---|---|
| Research | account + approved URLs | claims[] with evidence IDs and unknowns | reject uncited material claim | evidence coverage, factuality |
| Qualification | ICP version + evidence | score breakdown, confidence, reasons | reviewer required if low confidence/borderline | precision/recall/F1 |
| Enrichment | missing field + connector permission | provider result + provenance | no provider → unresolved | fill rate, cost |
| Contact research | company + permitted provider | contacts with source/status | no invention; review before use | verification rate |
| Outreach | approved evidence + persona + template | draft + cited evidence IDs | factuality rules + human approval | acceptance, citation coverage |
| Reply classification | recorded reply/event | taxonomy + confidence | low confidence queued | macro F1 |

## Contract rules

All model calls use schema-constrained JSON. Every output contains `trace_id`, `model`, `prompt_version`, `input_evidence_ids`, `confidence`, `unknowns`, and `needs_review`. Retry only transient transport/parse failures with capped exponential backoff; schema or groundedness failure is a terminal review state, not a fabricated fallback.

Prompt rule: use only supplied evidence; cite evidence IDs per claim; write `unknown` when unsupported; never make a contact or business assertion from a domain pattern. Log token/cost/latency and retain redacted prompts where appropriate.
