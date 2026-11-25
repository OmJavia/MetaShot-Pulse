import { writeFileSync } from 'node:fs';

const categories = ['Consumer electronics', 'Gaming accessories', 'Sports & recreation', 'Outdoor equipment', 'Retail technology'];
const markets = ['US', 'CA', 'GB', 'DE', 'IN'];
const models = ['Regional distributor', 'Wholesale distributor', 'Specialty reseller', 'E-commerce partner'];
const rows = ['account_id,company_name,official_website,headquarters,country,industry,product_categories,business_model,distribution_capabilities,geographic_coverage,brands_represented,company_description,source_urls,verification_status,last_verified_date,confidence_level,is_synthetic'];
for (let i = 1; i <= 100; i += 1) {
  const category = categories[(i - 1) % categories.length];
  const country = markets[(i - 1) % markets.length];
  const model = models[(i - 1) % models.length];
  const id = `SYN-${String(i).padStart(3, '0')}`;
  rows.push([id, `Demo ${category.replaceAll(' ', '')} Partner ${String(i).padStart(3, '0')}`, `https://example.invalid/${id.toLowerCase()}`, `Demo City ${i}`, country, 'Synthetic demonstration account', category, model, 'Synthetic; not verified', 'Synthetic; not verified', 'unknown', 'Synthetic record for UI and load testing only', 'unknown', 'synthetic_not_research', '2026-11-25', 'not_applicable', 'true'].join(','));
}
writeFileSync(new URL('../data/synthetic_demo_accounts.csv', import.meta.url), `${rows.join('\n')}\n`);
