# MetaShot feature opportunity matrix

| Feature | Customer value | Data required | Current feasibility | Decision |
|---|---|---|---|---|
| Activation funnel | Shows where onboarding/pairing fails | timestamped product events | No event feed yet | Add blueprint, not metrics |
| Behavioral cohorts | Compare return/pairing by market/app version | event stream + pseudonymous IDs | No event feed yet | Design contract now |
| Tracking plan / schema QA | Stops unusable events and PII leaks | SDK + server validation | Can specify now | Add now |
| Consent ledger | Controls permissible analytics/activation | consent source/status/version | Not supplied | Add requirement now |
| Experiment notebook | Prevents “ship and hope” | flag/variant + metrics | Can use workflow now | Add now |
| Session replay / heatmaps | Explains pairing-flow friction | explicit consent, masking, mobile SDK | Not supplied | Defer; design safeguards |
| Attribution | Connects installs to acquisition source | MMP/SKAN/partner data | Not supplied | Defer |
| Campaign automation | Re-engages behavior-based audiences | consent, audience, channel provider | Not supplied | Planning only |

The implemented product addition is the Activation Lab: an honest instrumentation blueprint, funnel definition, data contract, consent guardrails and experiment notebook. It adds immediate product-management value without claiming behavioural metrics that the supplied CSV files cannot support.
