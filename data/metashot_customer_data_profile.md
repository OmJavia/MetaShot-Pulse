# MetaShot application-download data profile

Source: user-provided `2024.csv`, `2025.csv`, and `2026.csv`, profiled locally on 25 Nov 2026. This report intentionally contains aggregates only; raw PII is not copied into the project.

| Period | Records | Unique non-empty email keys within export | Coverage |
|---|---:|---:|---|
| 2024 | 37,649 | 36,470 | Full year |
| 2025 | 99,802 | 91,083 | Full year |
| 2026 | 95,519 | 92,080 | 1 Jan–9 Sep only |
| Combined | 232,970 | 215,940 cross-export | 2026 partial |

## Safe observations

- All 232,970 records have a unique `_id`; the CSV parser found no malformed rows.
- 10,860 normalized email keys occur more than once across the three exports. Treat this as a deduplication candidate count, not confirmed duplicate people.
- Declared country is present for 92.4% of rows. India is the dominant declared market (202,558 rows); Pakistan, Australia, Bangladesh and the United Kingdom follow at much lower volumes.
- `deviceCountry` is absent in all 2024 rows and 113,829 rows overall; device geography should therefore be shown as an incomplete signal.
- The files have no explicit download/event timestamp. Mongo-style `_id` timestamps were used only to validate each export's date span.

## Product handling rules

Never bundle raw names, email addresses, phone numbers or raw CSV files into the browser application or source control. A production build should store the source in an access-controlled database, hash/normalize email for deduplication, use role-based access, log exports, and apply retention/deletion controls.
