# Risks and assumptions

| Risk | Mitigation |
|---|---|
| Website facts become stale | freshness policy, re-research queue, visible `last_verified_at` |
| Model hallucinates | evidence-only prompts, JSON validation, reviewer gate |
| Provider credit/rate changes | adapters, spend caps, dry-run and fallback states |
| Incorrect entity match | domain-first identity, candidate queue, no auto-merge at low confidence |
| Privacy/deliverability exposure | simulation-only MVP, suppress-first architecture |
| Demo data mistaken for real | prominent synthetic labels and analytics exclusion |
| ICP subjectivity | versioned criteria and manual override audit |

Assumptions: users have authority to import data; public-site research is permitted only when policy allows it; CRM/provider credentials are workspace-scoped; and market activation follows legal review.
