import { ChangeEvent, useEffect, useMemo, useState, lazy, Suspense } from 'react'
import Papa from 'papaparse'
import {
  ArrowRight, BarChart3, Bell, Bot, Calendar, Check, ChevronDown, CircleHelp,
  ClipboardCheck, Cpu, Database, Download, FileText, Filter, Globe2, Inbox, Layers3,
  LayoutDashboard, Moon, MoreHorizontal, Plus, Search, Send, Settings, ShieldCheck,
  SlidersHorizontal, Sparkles, Sun, Target, Users, X, Zap
} from 'lucide-react'
import { metashotData } from './metashotData'
import { Account, Role, ImportSummary, ImportRecord } from './types'
import { ViewLoadingSkeleton } from './components/Skeleton'

// LAZY LOADED SUB-MODULES (SHOWCASING ROUTE/VIEW LEVEL CODE SPLITTING)
const Overview = lazy(() => import('./views/Overview'))
const SmartBatHub = lazy(() => import('./views/SmartBatHub'))

const accounts: Account[] = [
  { id: 'MKT-IN', name: 'India', initials: 'IN', category: 'Declared customer market', place: '202,558 download records', coverage: '105,502 device-country signals', fit: 87, confidence: 0.924, stage: 'Primary market', evidence: 3, freshness: '2024–Sep 2026', signal: 'Dominant market audience (87%)' },
  { id: 'MKT-PK', name: 'Pakistan', initials: 'PK', category: 'Declared customer market', place: '4,518 download records', coverage: '4,554 device-country signals', fit: 2, confidence: 0.924, stage: 'Expand research', evidence: 3, freshness: '2024–Sep 2026', signal: 'Second largest declared base' },
  { id: 'MKT-AU', name: 'Australia', initials: 'AU', category: 'Declared customer market', place: '3,473 download records', coverage: '413 device-country signals', fit: 1.5, confidence: 0.924, stage: 'Review location', evidence: 3, freshness: '2024–Sep 2026' },
  { id: 'MKT-BD', name: 'Bangladesh', initials: 'BD', category: 'Declared customer market', place: '2,537 download records', coverage: '1,261 device-country signals', fit: 1.1, confidence: 0.924, stage: 'Emerging market', evidence: 3, freshness: '2024–Sep 2026' },
  { id: 'MKT-GB', name: 'United Kingdom', initials: 'GB', category: 'Declared customer market', place: '1,593 download records', coverage: '746 device-country signals', fit: 0.7, confidence: 0.924, stage: 'Emerging market', evidence: 3, freshness: '2024–Sep 2026' },
  { id: 'MKT-XX', name: 'Unresolved location', initials: '??', category: 'Data-quality segment', place: '17,715 download records', coverage: 'No declared country', fit: 7.6, confidence: 0.0, stage: 'Data incomplete', evidence: 1, freshness: '2024–Sep 2026' },
]

const nav = [
  ['Overview', LayoutDashboard],
  ['Smart Bat Hub', Cpu],
  ['Imports', Database],
  ['Customers', Users],
  ['Segments', Target],
  ['Activation Lab', Zap],
  ['Data quality', Sparkles],
  ['Campaigns', Send],
  ['Journeys', Layers3],
  ['Insights', BarChart3],
  ['Reports', FileText]
] as const

const demoHistory: ImportRecord[] = [
  { fileName: 'synthetic-users-2026-q3.csv', importedAt: 'Demo seed · Sep 2026', records: 12540, uniqueEmails: 12186, malformedRows: 0, sourceYear: '2026', status: 'Processed', actor: 'Demo admin', duplicates: 354 },
  { fileName: 'synthetic-events-2026-q2.csv', importedAt: 'Demo seed · Jun 2026', records: 48320, uniqueEmails: 0, malformedRows: 7, sourceYear: '2026', status: 'Needs review', actor: 'Demo analyst', duplicates: 0 }
]

const formatPercent = (n: number) => `${Math.round(n * 100)}%`

export default function App() {
  const [active, setActive] = useState('Overview')
  const [selected, setSelected] = useState<Account>(accounts[0])
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState('')
  const [draftApproved, setDraftApproved] = useState(false)
  const [showPanel, setShowPanel] = useState(true)
  const [importSummary, setImportSummary] = useState<ImportSummary | null>(null)
  const [governanceReady, setGovernanceReady] = useState(false)
  const [role, setRole] = useState<Role>('Admin')
  const [history, setHistory] = useState<ImportRecord[]>(demoHistory)
  const [darkMode, setDarkMode] = useState(true)
  const [bookingOpen, setBookingOpen] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [darkMode])

  useEffect(() => {
    const stored = localStorage.getItem('metashot-pulse-import-summary')
    const audit = localStorage.getItem('metashot-pulse-import-history')
    if (stored) {
      try { setImportSummary(JSON.parse(stored)) } catch { localStorage.removeItem('metashot-pulse-import-summary') }
    }
    if (audit) {
      try { setHistory(JSON.parse(audit)) } catch { localStorage.removeItem('metashot-pulse-import-history') }
    }
  }, [])

  const commitImport = (summary: ImportSummary) => {
    const record: ImportRecord = {
      fileName: summary.fileName,
      importedAt: summary.importedAt,
      records: summary.records,
      uniqueEmails: summary.uniqueEmails,
      malformedRows: summary.malformedRows,
      sourceYear: summary.sourceYear,
      status: summary.validationIssues.length ? 'Needs review' : 'Processed',
      actor: `Demo ${role.toLowerCase()}`,
      duplicates: Math.max(0, summary.records - summary.uniqueEmails)
    }
    const next = [record, ...history]
    setImportSummary(summary)
    setHistory(next)
    localStorage.setItem('metashot-pulse-import-summary', JSON.stringify(summary))
    localStorage.setItem('metashot-pulse-import-history', JSON.stringify(next))
    notify(`${summary.fileName} aggregated successfully into audit log.`)
  }

  const filtered = useMemo(() =>
    accounts.filter(a =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
    ), [query])

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }

  return (
    <div className="app-shell">
      {/* SHADCN MINIMALIST MONOCHROME SIDEBAR WITH OFFICIAL METASHOT LOGO */}
      <aside className="sidebar">
        <div className="brand">
          <img
            src="/metashot-logo.png"
            alt="MetaShot"
            className="brand-logo-img"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <span className="brand-badge">Pulse</span>
        </div>

        <div className="workspace-card">
          <div className="workspace-avatar">MP</div>
          <div className="workspace-info">
            <span className="workspace-name">MetaShot Intelligence</span>
            <span className="workspace-sub">232.9k Records · Q3</span>
          </div>
          <ChevronDown size={14} className="text-muted" />
        </div>

        <div className="nav-group">
          <div className="nav-label">Navigation</div>
          <nav>
            {nav.map(([name, Icon]) => (
              <button
                key={name}
                aria-label={name}
                className={`nav-item ${active === name ? 'active' : ''}`}
                onClick={() => setActive(name)}
              >
                <Icon size={16} />
                <span>{name}</span>
                {name === 'Smart Bat Hub' && <span className="nav-badge" style={{ fontSize: '0.6rem' }}>NEW</span>}
                {name === 'Data quality' && <span className="nav-badge">3</span>}
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <button
            aria-label="Settings"
            className={`nav-item ${active === 'Settings' ? 'active' : ''}`}
            onClick={() => setActive('Settings')}
          >
            <Settings size={16} />
            <span>Workspace Settings</span>
          </button>

          <div className="user-profile">
            <div className="user-avatar">OJ</div>
            <div className="user-info">
              <span className="user-name">Om Javia</span>
              <span className="user-role">{role} Access</span>
            </div>
            <MoreHorizontal size={14} className="text-muted" />
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="main">
        {/* FROSTED STICKY TOPBAR */}
        <header className="topbar">
          <div className="breadcrumbs">
            <span>MetaShot</span>
            <span className="text-muted">/</span>
            <span className="breadcrumb-active">{active}</span>
          </div>

          <div className="top-actions">
            {/* Dark / Light Toggle */}
            <button
              className="icon-btn"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle theme mode"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Role Switcher */}
            <label className="role-pill">
              <span>Role:</span>
              <select
                aria-label="Demo role"
                value={role}
                onChange={e => setRole(e.target.value as Role)}
              >
                <option>Admin</option>
                <option>Analyst</option>
                <option>Viewer</option>
              </select>
            </label>

            {/* Quick Demo Appointment Trigger */}
            <button
              className="btn btn-outline"
              onClick={() => setBookingOpen(true)}
              style={{ height: '36px', padding: '0 12px' }}
            >
              <Calendar size={14} />
              <span>Book Appointment</span>
            </button>

            <button className="icon-btn" title="Help & Documentation">
              <CircleHelp size={16} />
            </button>
            <button className="icon-btn" title="Notifications">
              <Bell size={16} />
            </button>

            {role !== 'Viewer' && (
              <button className="btn btn-primary" onClick={() => setActive('Imports')}>
                <Plus size={14} />
                <span>Import CSV</span>
              </button>
            )}
          </div>
        </header>

        {/* INNER CONTENT CONTAINER (WRAPPED IN SUSPENSE FOR LAZY LOADING) */}
        <section className="content-wrapper">
          <Suspense fallback={<ViewLoadingSkeleton />}>
            {active === 'Overview' && (
              <Overview
                onNavigate={setActive}
                onSelect={a => { setSelected(a); setActive('Customers') }}
                importSummary={importSummary}
                onOpenBooking={() => setBookingOpen(true)}
                accounts={accounts}
              />
            )}
            {active === 'Smart Bat Hub' && (
              <SmartBatHub onOpenBooking={() => setBookingOpen(true)} />
            )}
            {active === 'Imports' && (
              <ImportCenter onCommit={commitImport} history={history} canImport={role !== 'Viewer'} />
            )}
            {active === 'Customers' && (
              <AccountsView
                accounts={filtered}
                query={query}
                setQuery={setQuery}
                selected={selected}
                setSelected={setSelected}
                showPanel={showPanel}
                setShowPanel={setShowPanel}
                notify={notify}
                onOpenBooking={() => setBookingOpen(true)}
              />
            )}
            {active === 'Segments' && <MetashotSegments notify={notify} />}
            {active === 'Activation Lab' && <ActivationLab notify={notify} />}
            {active === 'Data quality' && <MetashotQuality notify={notify} />}
            {active === 'Campaigns' && (
              <MetashotCampaigns approved={draftApproved} setApproved={setDraftApproved} notify={notify} />
            )}
            {active === 'Journeys' && <MetashotJourneys />}
            {active === 'Insights' && <MetashotInsights />}
            {active === 'Reports' && <ReportsView history={history} role={role} notify={notify} />}
            {active === 'Settings' && (
              <GovernanceCenter ready={governanceReady} setReady={setGovernanceReady} notify={notify} />
            )}
          </Suspense>
        </section>
      </main>

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="toast-container">
          <Check size={16} />
          <span>{toast}</span>
        </div>
      )}

      {/* BOOK APPOINTMENT MODAL (FEATURING THE EXACT SIGNATURE BUTTON WITH CHROMA WAVE) */}
      {bookingOpen && (
        <div className="dialog-overlay" onClick={() => setBookingOpen(false)}>
          <div className="dialog-content" onClick={e => e.stopPropagation()}>
            <div className="dialog-header">
              <h2 className="card-title" style={{ fontSize: '1.25rem' }}>Schedule SmartBat Briefing</h2>
              <p className="card-desc">Reserve a dedicated 30-minute hardware walkthrough and telemetry review with MetaShot.</p>
              <button className="dialog-close" onClick={() => setBookingOpen(false)} aria-label="Close dialog">
                <X size={18} />
              </button>
            </div>
            <div className="dialog-body">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" defaultValue="Om Javia" placeholder="Your name" />
              </div>
              <div className="form-group">
                <label className="form-label">Work Email</label>
                <input className="form-input" defaultValue="om@metashot.pulse" placeholder="you@company.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Consultation Focus</label>
                <input className="form-input" defaultValue="Smart Bat TV Kit & Motion Telemetry Review" />
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                {/* THE SIGNATURE BUTTON WITH CHROMATIC WAVE HOVER SWEEP */}
                <button
                  type="button"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl text-sm font-bold tracking-[-0.011em] bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-[0_2px_8px_rgba(0,0,0,0.15)] h-12 px-6 py-2.5 w-full transition-all cursor-pointer chroma-text-animate-parent"
                  onClick={() => {
                    setBookingOpen(false)
                    notify('Appointment confirmed. Confirmation dispatch sent.')
                  }}
                >
                  <span className="chroma-text-out chroma-text-out-animate">
                    Confirm Appointment
                  </span>
                  <span className="text-sm tabler-icon-arrow-right transition-transform">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ==========================================================================
   VIEW: IMPORTS CENTER (CSV PROCESSING)
   ========================================================================== */

function ImportCenter({
  onCommit,
  history,
  canImport
}: {
  onCommit: (s: ImportSummary) => void
  history: ImportRecord[]
  canImport: boolean
}) {
  const [summary, setSummary] = useState<ImportSummary | null>(null)
  const [status, setStatus] = useState('Select an export file (.csv) to compute an aggregate profile.')

  const onFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setStatus(`Processing ${file.name} locally...`)

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: 'greedy',
      complete: ({ data, errors, meta }) => {
        const rows = data.filter(r => Object.values(r).some(v => String(v ?? '').trim()))
        const fields = meta.fields ?? []
        const field = (p: RegExp) => fields.find(v => p.test(v.trim()))
        const emailField = field(/^e-?mail$/i) ?? field(/email/i)
        const countryField = field(/^country$/i)
        const deviceCountryField = field(/^device.?country$/i)
        const countries = new Map<string, number>()
        const emailKeys = new Set<string>()
        let withCountry = 0
        let missingDeviceCountry = 0

        rows.forEach(r => {
          const email = emailField ? String(r[emailField] ?? '').trim().toLowerCase() : ''
          if (email) emailKeys.add(email)
          const country = countryField ? String(r[countryField] ?? '').trim() : ''
          if (country) {
            withCountry += 1
            countries.set(country, (countries.get(country) ?? 0) + 1)
          }
          if (!deviceCountryField || !String(r[deviceCountryField] ?? '').trim()) {
            missingDeviceCountry += 1
          }
        })

        const validationIssues = [
          !rows.length ? 'No valid rows detected.' : '',
          !emailField && !field(/^(user_?id|customer_?id)$/i) ? 'Identifier column recommended (email or user_id).' : '',
          errors.length ? `${errors.length} formatting warnings logged.` : ''
        ].filter(Boolean)

        const next: ImportSummary = {
          fileName: file.name,
          importedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          records: rows.length,
          uniqueEmails: emailKeys.size,
          countryCoverage: rows.length ? withCountry / rows.length : 0,
          missingDeviceCountry,
          malformedRows: errors.length,
          topCountries: [...countries.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => ({ name, count })),
          piiFields: fields.filter(v => /(name|email|phone|address)/i.test(v)),
          sourceYear: file.name.match(/20\d{2}/)?.[0] ?? '2026',
          validationIssues
        }
        setSummary(next)
        setStatus('Profile completed in browser memory. Raw lines will not be persisted.')
        event.target.value = ''
      },
      error: () => setStatus('Failed to parse CSV. Verify header row format.')
    })
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-info">
          <span className="page-eyebrow">Data Ingestion · Local Compute</span>
          <h1 className="page-title">CSV Import Engine</h1>
          <p className="page-subtitle">
            Ingest local application logs and customer registration dumps. Zero rows leave your browser session.
          </p>
        </div>
      </div>

      <div className="import-layout">
        <div className="shadcn-card dropzone">
          <Database size={32} />
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Drop Export CSV Here</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Supports application snapshots with email, country, and deviceCountry headers.
            </p>
          </div>
          {canImport ? (
            <label className="btn btn-primary" style={{ position: 'relative' }}>
              <Plus size={15} />
              <span>Browse Local File</span>
              <input type="file" accept=".csv,text/csv" onChange={onFile} />
            </label>
          ) : (
            <span className="badge badge-outline">Viewer Role: Upload Disabled</span>
          )}
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{status}</span>
        </div>

        <aside className="shadcn-card">
          <h3 className="card-title">Compliance Ingestion Bar</h3>
          <p className="card-desc">Production pipelines enforce four automatic safeguards:</p>
          <div className="checklist">
            <div className="check-item">
              <span className="check-icon-wrap"><Check size={12} /></span>
              <span>Header inspection confirms valid schema keys.</span>
            </div>
            <div className="check-item">
              <span className="check-icon-wrap"><Check size={12} /></span>
              <span>Normalized email keys stripped of leading/trailing whitespace.</span>
            </div>
            <div className="check-item">
              <span className="check-icon-wrap"><Check size={12} /></span>
              <span>Strict aggregate rollup: zero customer names retained.</span>
            </div>
            <div className="check-item">
              <span className="check-icon-wrap"><Check size={12} /></span>
              <span>All validation warnings saved to immutable audit history.</span>
            </div>
          </div>
        </aside>
      </div>

      {summary && (
        <section className="shadcn-card" style={{ marginTop: '1.5rem' }}>
          <div className="card-header">
            <div>
              <h2 className="card-title">Parsed Summary: {summary.fileName}</h2>
              <p className="card-desc">{summary.records.toLocaleString()} rows analyzed · Source year {summary.sourceYear}</p>
            </div>
            {canImport && (
              <button className="btn btn-primary" onClick={() => onCommit(summary)}>
                <Check size={15} />
                <span>Save to Workspace Audit</span>
              </button>
            )}
          </div>

          <div className="metrics-grid" style={{ marginBottom: '1.25rem' }}>
            <div className="metric-card">
              <span className="metric-label">Parsed Rows</span>
              <div className="metric-value">{summary.records.toLocaleString()}</div>
            </div>
            <div className="metric-card">
              <span className="metric-label">Unique Keys</span>
              <div className="metric-value">{summary.uniqueEmails.toLocaleString()}</div>
            </div>
            <div className="metric-card">
              <span className="metric-label">Country Coverage</span>
              <div className="metric-value">{formatPercent(summary.countryCoverage)}</div>
            </div>
            <div className="metric-card">
              <span className="metric-label">Missing Device Country</span>
              <div className="metric-value">{summary.missingDeviceCountry.toLocaleString()}</div>
            </div>
          </div>
        </section>
      )}

      {/* AUDIT LOG TABLE */}
      <section className="shadcn-card" style={{ marginTop: '1.5rem' }}>
        <div className="card-header">
          <div>
            <h2 className="card-title">Workspace Audit History</h2>
            <p className="card-desc">Permanent record of imports processed during this session</p>
          </div>
          <span className="badge badge-outline">{history.length} records</span>
        </div>

        <div className="table-wrapper">
          <table className="shadcn-table">
            <thead>
              <tr>
                <th>Source Export</th>
                <th>Records</th>
                <th>Duplicates</th>
                <th>Actor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{h.fileName}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{h.importedAt}</div>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{h.records.toLocaleString()}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{h.duplicates.toLocaleString()}</td>
                  <td>{h.actor}</td>
                  <td>
                    <span className="badge badge-solid">{h.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

/* ==========================================================================
   VIEW: CUSTOMERS & MARKETS TABLE + DETAIL DRAWER
   ========================================================================== */

function AccountsView({
  accounts,
  query,
  setQuery,
  selected,
  setSelected,
  showPanel,
  setShowPanel,
  notify,
  onOpenBooking
}: {
  accounts: Account[]
  query: string
  setQuery: (v: string) => void
  selected: Account
  setSelected: (v: Account) => void
  showPanel: boolean
  setShowPanel: (v: boolean) => void
  notify: (m: string) => void
  onOpenBooking: () => void
}) {
  return (
    <>
      <div className="page-header">
        <div className="page-header-info">
          <span className="page-eyebrow">Customer Geography</span>
          <h1 className="page-title">
            Market Directory <span className="badge badge-outline">{accounts.length} Segments</span>
          </h1>
          <p className="page-subtitle">
            Declared customer markets synthesized from MetaShot registration logs without exposing personal data.
          </p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={onOpenBooking}>
            <Calendar size={15} />
            <span>Schedule Review</span>
          </button>
        </div>
      </div>

      <div className="toolbar">
        <div className="search-input-wrap">
          <Search size={15} className="search-icon" />
          <input
            className="search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search markets, countries or status..."
          />
          <span className="kbd-shortcut">⌘K</span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-outline" onClick={() => notify('Filters applied: Active segments')}>
            <Filter size={14} />
            <span>Filter Active</span>
          </button>
          <button className="btn btn-outline" onClick={() => setShowPanel(!showPanel)}>
            <SlidersHorizontal size={14} />
            <span>{showPanel ? 'Hide Inspector' : 'Show Inspector'}</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: showPanel ? '1.4fr 1fr' : '1fr', gap: '1.25rem', alignItems: 'start' }}>
        <div className="table-wrapper">
          <table className="shadcn-table">
            <thead>
              <tr>
                <th>Market Segment</th>
                <th>Share</th>
                <th>Confidence</th>
                <th>Stage</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(a => (
                <tr
                  key={a.id}
                  className={selected.id === a.id ? 'selected' : ''}
                  onClick={() => { setSelected(a); setShowPanel(true) }}
                >
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className="market-avatar">{a.initials}</span>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{a.name}</div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{a.place}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{a.fit}%</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{formatPercent(a.confidence)}</td>
                  <td>
                    <span className="badge badge-outline">{a.stage}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showPanel && (
          <aside className="detail-drawer">
            <div className="drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="market-avatar" style={{ width: '36px', height: '36px', fontSize: '0.875rem' }}>
                  {selected.initials}
                </span>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>{selected.name}</h3>
                  <span className="badge badge-solid">{selected.stage}</span>
                </div>
              </div>
              <button className="icon-btn" onClick={() => setShowPanel(false)}>
                <X size={15} />
              </button>
            </div>

            <div className="meta-stats-grid">
              <div className="meta-stat-item">
                <span className="meta-stat-label">Market Share</span>
                <span className="meta-stat-val">{selected.fit}%</span>
              </div>
              <div className="meta-stat-item">
                <span className="meta-stat-label">Coverage Quality</span>
                <span className="meta-stat-val">{formatPercent(selected.confidence)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.8125rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Total Download Records:</span>
                <div style={{ fontWeight: 600 }}>{selected.place}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Device Location Signals:</span>
                <div style={{ fontWeight: 600 }}>{selected.coverage}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Export Chronology:</span>
                <div style={{ fontWeight: 600 }}>{selected.freshness}</div>
              </div>
            </div>

            {selected.signal && (
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', fontSize: '0.75rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>Signal Note:</div>
                <div style={{ color: 'var(--text-secondary)' }}>{selected.signal}</div>
              </div>
            )}

            <div style={{ marginTop: '0.5rem' }}>
              <button
                type="button"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl text-sm font-bold tracking-[-0.011em] bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-[0_2px_8px_rgba(0,0,0,0.15)] h-12 px-6 py-2.5 w-full transition-all cursor-pointer chroma-text-animate-parent"
                onClick={() => {
                  onOpenBooking()
                  notify(`${selected.name} staged for briefing.`)
                }}
              >
                <span className="chroma-text-out chroma-text-out-animate">
                  Book Briefing for {selected.name}
                </span>
                <span className="text-sm tabler-icon-arrow-right transition-transform">→</span>
              </button>
            </div>
          </aside>
        )}
      </div>
    </>
  )
}

/* ==========================================================================
   VIEW: SEGMENTS
   ========================================================================== */

function MetashotSegments({ notify }: { notify: (m: string) => void }) {
  return (
    <>
      <div className="page-header">
        <div className="page-header-info">
          <span className="page-eyebrow">Audience Segmentation</span>
          <h1 className="page-title">Market Demand Clusters</h1>
          <p className="page-subtitle">Deterministic cohorts based strictly on verified export geographic signals.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => notify('Segment rules locked to session.')}>
            <Check size={15} />
            <span>Save Rules</span>
          </button>
        </div>
      </div>

      <div className="studio-grid">
        <section className="shadcn-card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Active Market Rules</h2>
              <p className="card-desc">Weighted customer clusters by declared country presence</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <div style={{ padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>India · Dominant Market</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>202,558 records (87.0%)</div>
              </div>
              <span className="badge badge-solid">Primary Cohort</span>
            </div>

            <div style={{ padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Pakistan · Expansion Cluster</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>4,518 records (1.9%)</div>
              </div>
              <span className="badge badge-outline">Expansion</span>
            </div>

            <div style={{ padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Unresolved Location Cohort</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>17,715 records (7.6%)</div>
              </div>
              <span className="badge badge-outline">Data Incomplete</span>
            </div>
          </div>
        </section>

        <section className="shadcn-card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Cluster Dominance Meter</h2>
              <p className="card-desc">India account footprint vs remaining territory</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', margin: '1rem 0' }}>
            <div className="score-ring-mono">
              <div className="score-ring-mono-content">
                <div className="score-ring-val">87%</div>
                <div className="score-ring-label">of base</div>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Concentrated Opportunity</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                MetaShot’s hardware and app experience is overwhelmingly consumed in South Asia. Focus engagement resources here first.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

/* ==========================================================================
   VIEW: ACTIVATION LAB
   ========================================================================== */

function ActivationLab({ notify }: { notify: (m: string) => void }) {
  const [tab, setTab] = useState<'Funnel' | 'Contract' | 'Experiments'>('Funnel')
  const steps = [
    ['App Installed', 'Baseline app store registration record'],
    ['Onboarding Started', 'First in-app user account profile setup'],
    ['Smart Bat Paired', 'Bluetooth telemetry handshake established'],
    ['First Delivery Faced', 'First live swing or ball tracking event'],
    ['First Match Completed', 'Primary activation milestone achieved'],
    ['Day-7 Return', 'Repeat gameplay retention indicator']
  ]

  return (
    <>
      <div className="page-header">
        <div className="page-header-info">
          <span className="page-eyebrow">Product Telemetry Blueprint</span>
          <h1 className="page-title">Activation Lab</h1>
          <p className="page-subtitle">
            Bridge physical cricket hardware with digital app telemetry: Bat pairing → Match completion.
          </p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => notify('Activation blueprint saved to product roadmap.')}>
            <Check size={15} />
            <span>Save Blueprint</span>
          </button>
        </div>
      </div>

      <div className="shadcn-tabs">
        <button className={`shadcn-tab-btn ${tab === 'Funnel' ? 'active' : ''}`} onClick={() => setTab('Funnel')}>
          Funnel Architecture
        </button>
        <button className={`shadcn-tab-btn ${tab === 'Contract' ? 'active' : ''}`} onClick={() => setTab('Contract')}>
          Event Contract Schema
        </button>
        <button className={`shadcn-tab-btn ${tab === 'Experiments' ? 'active' : ''}`} onClick={() => setTab('Experiments')}>
          Pairing Experiments
        </button>
      </div>

      {tab === 'Funnel' && (
        <div className="activation-grid">
          <section className="shadcn-card">
            <div className="card-header">
              <div>
                <h2 className="card-title">Hardware-to-Software Progression</h2>
                <p className="card-desc">Six sequential milestones defining customer success</p>
              </div>
              <span className="badge badge-outline">Specification</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {steps.map(([title, desc], i) => (
                <div className="step-item" key={title}>
                  <div className="step-number">{i + 1}</div>
                  <div className="step-details">
                    <div className="step-title">{title}</div>
                    <div className="step-desc">{desc}</div>
                  </div>
                  <span className="badge badge-outline">Ready</span>
                </div>
              ))}
            </div>
          </section>

          <aside className="shadcn-card">
            <h3 className="card-title">Instrumentation Guardrails</h3>
            <div className="checklist">
              <div className="check-item">
                <span className="check-icon-wrap"><Check size={12} /></span>
                <span>Use pseudonymous UUIDs only—never raw phone/email in payloads.</span>
              </div>
              <div className="check-item">
                <span className="check-icon-wrap"><Check size={12} /></span>
                <span>Include hardware firmware version on pairing handshake.</span>
              </div>
              <div className="check-item">
                <span className="check-icon-wrap"><Check size={12} /></span>
                <span>Enforce ISO 8601 UTC timestamps on every bat swing event.</span>
              </div>
            </div>
          </aside>
        </div>
      )}

      {tab === 'Contract' && (
        <section className="shadcn-card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Telemetry Contract Schema (v1.2)</h2>
              <p className="card-desc">Standard payload definitions for mobile SDK integration</p>
            </div>
            <button className="btn btn-outline" onClick={() => notify('Schema copied to clipboard.')}>
              <span>Copy JSON Schema</span>
            </button>
          </div>

          <div className="table-wrapper">
            <table className="shadcn-table">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Trigger Point</th>
                  <th>Payload Attributes</th>
                  <th>PII Safe</th>
                </tr>
              </thead>
              <tbody>
                {steps.map(([name], i) => (
                  <tr key={name}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      {name.toLowerCase().replaceAll(' ', '_')}
                    </td>
                    <td>{['App launched', 'User created profile', 'Bat connected via BLE', 'Swing sensor logged', '6 overs finished', 'App reopened on day 7'][i]}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                      app_version, user_uuid, ble_rssi, timestamp
                    </td>
                    <td>
                      <span className="badge badge-solid">Guaranteed</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tab === 'Experiments' && (
        <div className="activation-grid">
          <section className="shadcn-card">
            <div className="card-header">
              <div>
                <h2 className="card-title">Active Test: Visual Bluetooth Guided Setup</h2>
                <p className="card-desc">Hypothesis: 3D interactive bat orientation reduces pairing drop-off</p>
              </div>
              <span className="badge badge-solid">Draft</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.8125rem' }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem' }}>TARGET AUDIENCE:</div>
                <div>All new India Android downloads during first launch.</div>
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem' }}>PRIMARY METRIC:</div>
                <div>Bat pairing completion percentage within 10 minutes of app opening.</div>
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem' }}>GUARDRAIL:</div>
                <div>Bluetooth reconnection error rate &lt; 0.5%.</div>
              </div>
            </div>
          </section>

          <aside className="shadcn-card">
            <h3 className="card-title">Rollout Requirements</h3>
            <p className="card-desc">50/50 randomized split across user UUID hash modulus.</p>
          </aside>
        </div>
      )}
    </>
  )
}

/* ==========================================================================
   VIEW: DATA QUALITY
   ========================================================================== */

function MetashotQuality({ notify }: { notify: (m: string) => void }) {
  const [marked, setMarked] = useState(false)
  return (
    <>
      <div className="page-header">
        <div className="page-header-info">
          <span className="page-eyebrow">Data Hygiene & Governance</span>
          <h1 className="page-title">Dataset Integrity Audit</h1>
          <p className="page-subtitle">
            Auditing completeness, deduplication candidates, and boundary caveats across 3 export archives.
          </p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => { setMarked(!marked); notify(marked ? 'Reopened review.' : 'Quality verified.') }}>
            <Check size={15} />
            <span>{marked ? 'Audit Complete' : 'Mark Reviewed'}</span>
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">Country Completeness</span>
          <div className="metric-value">92.4%</div>
          <span className="metric-meta">215,255 of 232,970 records</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Email Key Rate</span>
          <div className="metric-value">97.2%</div>
          <span className="metric-meta">215,940 unique keys</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Phone Coverage</span>
          <div className="metric-value">83.3%</div>
          <span className="metric-meta">194,146 verified rows</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Dedup Candidates</span>
          <div className="metric-value">10,860</div>
          <span className="metric-meta">Cross-export matches</span>
        </div>
      </div>
    </>
  )
}

/* ==========================================================================
   VIEW: CAMPAIGNS
   ========================================================================== */

function MetashotCampaigns({
  approved,
  setApproved,
  notify
}: {
  approved: boolean
  setApproved: (b: boolean) => void
  notify: (m: string) => void
}) {
  return (
    <>
      <div className="page-header">
        <div className="page-header-info">
          <span className="page-eyebrow">Outreach Studio</span>
          <h1 className="page-title">Engagement Brief Builder</h1>
          <p className="page-subtitle">
            Plan customer activation communications with consent verification. Simulation mode enabled.
          </p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => { setApproved(!approved); notify(approved ? 'Reopened draft.' : 'Campaign brief approved.') }}>
            <Check size={15} />
            <span>{approved ? 'Approved' : 'Approve Brief'}</span>
          </button>
        </div>
      </div>

      <div className="outreach-grid">
        <section className="shadcn-card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Campaign Brief: India Onboarding Journey</h2>
              <p className="card-desc">Target cohort: 202,558 declared India app download accounts</p>
            </div>
            <span className="badge badge-outline">Simulation</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <div className="form-group">
              <label className="form-label">Subject Line</label>
              <input className="form-input" defaultValue="Maximize your MetaShot Smart Bat: 3 Quick Setup Tips" readOnly />
            </div>
            <div className="form-group">
              <label className="form-label">Key Message Strategy</label>
              <div style={{ padding: '0.875rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', fontSize: '0.8125rem', lineHeight: 1.6 }}>
                Hi Cricketer,<br /><br />
                We noticed you recently downloaded the MetaShot companion app. Connect your smart bat via Bluetooth to unlock real-time bat speed, shot power analysis, and interactive match play.<br /><br />
                Need help pairing? Our guided walkthrough takes less than 60 seconds.
              </div>
            </div>
          </div>
        </section>

        <aside className="shadcn-card">
          <h3 className="card-title">Deliverability Checklist</h3>
          <div className="checklist">
            <div className="check-item">
              <span className="check-icon-wrap"><Check size={12} /></span>
              <span>Explicit consent verified (separate from app install terms).</span>
            </div>
            <div className="check-item">
              <span className="check-icon-wrap"><Check size={12} /></span>
              <span>Unsubscribe and preference management link embedded.</span>
            </div>
            <div className="check-item">
              <span className="check-icon-wrap"><Check size={12} /></span>
              <span>Direct personal PII isolated behind secure proxy.</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}

/* ==========================================================================
   VIEW: JOURNEYS (KANBAN BOARD)
   ========================================================================== */

function MetashotJourneys() {
  const columns = [
    { title: 'Downloaded App', count: 2, items: [accounts[0], accounts[1]] },
    { title: 'Awaiting Hardware Data', count: 2, items: [accounts[5], accounts[2]] },
    { title: 'Expansion Research', count: 2, items: [accounts[3], accounts[4]] }
  ]

  return (
    <>
      <div className="page-header">
        <div className="page-header-info">
          <span className="page-eyebrow">Customer Progression</span>
          <h1 className="page-title">Market Lifecycle Kanban</h1>
          <p className="page-subtitle">Track accounts and cohorts across data verification stages.</p>
        </div>
      </div>

      <div className="kanban-board">
        {columns.map(col => (
          <div className="kanban-column" key={col.title}>
            <div className="kanban-col-header">
              <span>{col.title}</span>
              <span className="badge badge-outline">{col.count}</span>
            </div>
            {col.items.map(item => (
              <div className="kanban-card" key={item.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <span className="market-avatar">{item.initials}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{item.category}</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.place}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.35rem' }}>
                  <span className="badge badge-outline">{item.stage}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600 }}>{item.fit}%</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

/* ==========================================================================
   VIEW: INSIGHTS
   ========================================================================== */

function MetashotInsights() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-info">
          <span className="page-eyebrow">Analytics Deep Dive</span>
          <h1 className="page-title">Historical Download Velocity</h1>
          <p className="page-subtitle">Annual volume trends extracted from raw archive exports.</p>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">2024 Total</span>
          <div className="metric-value">37,649</div>
          <span className="metric-meta">Full calendar year</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">2025 Total</span>
          <div className="metric-value">99,802</div>
          <span className="metric-meta">+165% YoY growth</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">2026 Run Rate</span>
          <div className="metric-value">95,519</div>
          <span className="metric-meta">Through Sep 9 only</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Compound Pace</span>
          <div className="metric-value">+31.2%</div>
          <span className="metric-meta">Annualized pace</span>
        </div>
      </div>
    </>
  )
}

/* ==========================================================================
   VIEW: REPORTS
   ========================================================================== */

function ReportsView({
  history,
  role,
  notify
}: {
  history: ImportRecord[]
  role: Role
  notify: (m: string) => void
}) {
  const downloadReport = () => {
    const rows = [
      ['MetaShot Pulse Customer Intelligence Report'],
      ['Metric', 'Value'],
      ['Total Records', '232970'],
      ['Unique Email Keys', '215940'],
      ['Location Completeness', '92.4%'],
      [],
      ['Export Audit History'],
      ['File', 'Records', 'Duplicates', 'Actor', 'Status'],
      ...history.map(h => [h.fileName, String(h.records), String(h.duplicates), h.actor, h.status])
    ]
    const csv = rows.map(r => r.map(v => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'metashot-pulse-report.csv'
    a.click()
    URL.revokeObjectURL(url)
    notify('Executive CSV export downloaded.')
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-info">
          <span className="page-eyebrow">Executive Exports</span>
          <h1 className="page-title">Intelligence Reports</h1>
          <p className="page-subtitle">Export aggregate summaries for stakeholders and board review.</p>
        </div>
        <div className="page-header-actions">
          {role !== 'Viewer' && (
            <button className="btn btn-primary" onClick={downloadReport}>
              <Download size={15} />
              <span>Download CSV Report</span>
            </button>
          )}
        </div>
      </div>

      <section className="shadcn-card">
        <h2 className="card-title">Available Export Datasets</h2>
        <p className="card-desc">All downloads include verified aggregate counts and data completeness metrics.</p>
      </section>
    </>
  )
}

/* ==========================================================================
   VIEW: GOVERNANCE & SETTINGS
   ========================================================================== */

function GovernanceCenter({
  ready,
  setReady,
  notify
}: {
  ready: boolean
  setReady: (b: boolean) => void
  notify: (m: string) => void
}) {
  return (
    <>
      <div className="page-header">
        <div className="page-header-info">
          <span className="page-eyebrow">Compliance Configuration</span>
          <h1 className="page-title">Workspace Governance</h1>
          <p className="page-subtitle">Configure retention windows, audit logging, and team permissions.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => { setReady(!ready); notify(ready ? 'Governance reopened.' : 'Governance verified.') }}>
            <Check size={15} />
            <span>{ready ? 'Verified' : 'Confirm Readiness'}</span>
          </button>
        </div>
      </div>

      <div className="governance-grid">
        <section className="shadcn-card">
          <h2 className="card-title">Privacy Protection Safeguards</h2>
          <div className="checklist">
            <div className="check-item">
              <span className="check-icon-wrap"><Check size={12} /></span>
              <span>All browser processing runs in memory without remote persistence.</span>
            </div>
            <div className="check-item">
              <span className="check-icon-wrap"><Check size={12} /></span>
              <span>Deduplication handles candidate identification without merging records.</span>
            </div>
            <div className="check-item">
              <span className="check-icon-wrap"><Check size={12} /></span>
              <span>Export logs are cryptographically fingerprinted with audit trails.</span>
            </div>
          </div>
        </section>

        <aside className="shadcn-card">
          <h3 className="card-title">Retention Schedule</h3>
          <p className="card-desc">Session aggregate retention: 90 days. Raw records: 0 days (ephemeral).</p>
        </aside>
      </div>
    </>
  )
}
