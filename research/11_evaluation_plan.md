# Evaluation plan

Before using AI outputs operationally, label a held-out golden set of at least 50 accounts/research questions and 30 outreach drafts with two human reviewers plus adjudication.

| Area | Metric | Definition |
|---|---|---|
| Qualification | precision / recall / F1 | compare final qualified label against adjudicated label |
| Research | evidence coverage | supported material claims ÷ material claims |
| Research | factual accuracy | reviewer-confirmed claims ÷ sampled claims |
| Outreach | factuality | drafts with no unsupported material claim ÷ reviewed drafts |
| Outreach | acceptance | approved without material factual edit ÷ reviewed drafts |
| Operations | latency/cost/failure | measured per completed job; retries logged separately |

Evaluation runs snapshot model, prompt, schema, dataset version and thresholds. Report confidence intervals where sample size permits. Do not equate offline scores or simulated replies with revenue impact.
