# MetaShot Pulse demo CSV contract

This contract is for Phase 1 demonstration uploads only. Use synthetic or appropriately anonymised data until privacy approval permits anything else.

## Required

Every file must be UTF-8 CSV with one header row and one stable identifier:

| Field | Accepted aliases | Purpose |
| --- | --- | --- |
| Stable identifier | `email`, `user_id`, `customer_id`, `anonymous_id` | Finds repeat records and supports growth analysis. |

## Recommended registration snapshot fields

| Field | Type | Example | Notes |
| --- | --- | --- | --- |
| `created_at` | ISO-8601 timestamp | `2026-09-01T10:15:00Z` | Registration or record creation time. |
| `country` | text | `IN` | Declared country; use a consistent ISO code if possible. |
| `device_country` | text | `IN` | Optional device signal; do not treat as complete location data. |
| `platform` | enum | `android` | Optional. |
| `app_version` | text | `3.4.0` | Optional. |
| `consent_analytics` | boolean | `true` | Required before production product analytics. |
| `consent_marketing` | boolean | `false` | Never infer this from an application download. |

## Recommended event fields

| Field | Type | Example |
| --- | --- | --- |
| `anonymous_id` or `user_id` | text | `demo_a74f2` |
| `event_name` | enum | `smart_bat_paired` |
| `occurred_at` | ISO-8601 timestamp | `2026-09-01T10:18:12Z` |
| `platform` | enum | `android` |
| `app_version` | text | `3.4.0` |
| `consent_analytics` | boolean | `true` |

Allowed Phase 1 event names: `app_installed`, `onboarding_started`, `smart_bat_paired`, `first_delivery`, `first_match_completed`, `day_7_return`, `purchase_completed`, `purchase_refunded`.

## Do not include in product events

Names, email addresses, phone numbers, precise addresses, free-text feedback, payment details, access tokens, device Bluetooth identifiers, or other direct personal data.

## Demo import behaviour

The current application checks for a header row and a stable identifier, counts parsing warnings and duplicate candidates, and creates an aggregate-only local audit entry. It does not persist raw CSV rows.
