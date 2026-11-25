# MetaShot Pulse

Privacy-safe customer-download intelligence workspace for MetaShot.

## Run locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173`.

## What works in this vertical slice

- Download-growth, geography, and data-quality dashboard built from the supplied 2024–2026 exports.
- Searchable privacy-safe customer-market segments; raw PII is not exposed in the browser.
- Market segmentation with explicit data-completeness caveats.
- Data-quality review for country coverage, duplicate candidates, missing device country, and the 2026 partial-year limit.
- Planning-only campaign brief with no contact data and no sending capability.
- Customer-journey and insight definitions that distinguish download counts from conversion or revenue claims.
- Responsive compact layout for narrow displays.

The UI uses privacy-safe aggregates derived locally from the user-provided MetaShot exports. See [data/metashot_customer_data_profile.md](data/metashot_customer_data_profile.md) for the quality profile. Persistence, secure raw-data ingestion, product-event joins, consent management, and production integrations are intentionally the next build stage; this slice never sends real email.
