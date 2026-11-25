# Dataset quality report

Generated: 2026-11-25

| Measure | Result |
|---|---:|
| Verified demonstration accounts | 30 |
| Synthetic accounts | 100 |
| Duplicate account IDs | 0 |
| Personal contacts collected | 0 |
| Records with official source URL | 30 / 30 |
| Records marked partial verification | 30 / 30 |
| Synthetic records separated and labelled | 100 / 100 |

## Validation and limitations

- CSV structural validation passed: all account IDs are populated; synthetic output has 100 records plus header.
- The verified file validates public company identity/category from an official website, but is not a complete distributor due-diligence dossier. Brand lists, territory, revenue, contact and many capabilities are intentionally `unknown` where not field-validated.
- `Performance Bicycle` is included as a reseller candidate and marked low confidence, illustrating that discovery can surface accounts requiring reviewer categorization.
- Last verification is the retrieval date, not an assertion of current operational status. Re-research before activation.
- No duplicate domain resolution, sanctions screening, or corporate-registration matching was performed in this limited demonstration collection.
