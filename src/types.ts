export type Stage = 'Primary market' | 'Expand research' | 'Review location' | 'Emerging market' | 'Data incomplete'

export type Account = {
  id: string
  name: string
  initials: string
  category: string
  place: string
  coverage: string
  fit: number
  confidence: number
  stage: Stage
  evidence: number
  freshness: string
  signal?: string
}

export type Role = 'Admin' | 'Analyst' | 'Viewer'

export type ImportSummary = {
  fileName: string
  importedAt: string
  records: number
  uniqueEmails: number
  countryCoverage: number
  missingDeviceCountry: number
  malformedRows: number
  topCountries: { name: string; count: number }[]
  piiFields: string[]
  sourceYear: string
  validationIssues: string[]
}

export type ImportRecord = Pick<ImportSummary, 'fileName' | 'importedAt' | 'records' | 'uniqueEmails' | 'malformedRows' | 'sourceYear'> & {
  status: 'Processed' | 'Needs review'
  actor: string
  duplicates: number
}
