# Explainable ICP scoring

Fit score is a weighted average of only observed criteria. Confidence is a separate measure of evidence quality/freshness/coverage.

| Dimension | Default weight | Example evidence |
|---|---:|---|
| Product-category compatibility | 25 | official portfolio/category page |
| Geographic coverage | 20 | locations/territory page |
| Distribution capability | 20 | wholesale/fulfillment/services page |
| Brand/retail compatibility | 15 | line card / official partner announcement |
| Commercial scale | 10 | public corporate information |
| Signals / timing | 10 | dated announcement or user-authorized signal |

For an observed criterion `i`, contribution = `weight_i × normalized_match_i`. Overall fit = `100 × Σ contribution / Σ observed weights`. A hard disqualifier (e.g., market exclusion or confirmed portfolio conflict) produces `disqualified` with a reason; it never silently changes a missing field to zero.

Confidence = weighted coverage (45%) + source quality (35%) + freshness decay (20%). Default status: qualified ≥70 fit and ≥0.65 confidence; review for either score outside threshold; disqualified only on evidence-backed hard rule. Weights, rules, thresholds, overrides and evidence IDs are versioned/audited.
