// Privacy-safe aggregates derived locally from the three user-provided exports.
// No customer names, emails, phone numbers, or raw rows are bundled into the UI.
export const metashotData = {
  source: 'Application download exports: 2024.csv, 2025.csv, 2026.csv',
  totalRecords: 232970,
  uniqueEmailKeys: 215940,
  locationCompleteness: 92.4,
  years: [
    { year: '2024', records: 37649, label: 'Full year' },
    { year: '2025', records: 99802, label: 'Full year' },
    { year: '2026', records: 95519, label: 'Jan 1 – Sep 9' },
  ],
  topDeclaredMarkets: [
    { market: 'India', records: 202558, share: 87.0, deviceRecords: 105502 },
    { market: 'Pakistan', records: 4518, share: 1.9, deviceRecords: 4554 },
    { market: 'Australia', records: 3473, share: 1.5, deviceRecords: 413 },
    { market: 'Bangladesh', records: 2537, share: 1.1, deviceRecords: 1261 },
    { market: 'United Kingdom', records: 1593, share: 0.7, deviceRecords: 746 },
  ],
  quality: {
    missingDeclaredCountry: 17715,
    missingPhone: 38824,
    repeatedEmailKeys: 10860,
    missingDeviceCountry: 113829,
  },
  caveat: 'The 2026 export ends on 9 September; it is not a full-year comparison.'
} as const
