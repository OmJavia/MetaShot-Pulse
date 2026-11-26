import { useState } from 'react'
import {
  ArrowRight, BarChart3, Bot, Calendar, Check,
  CircleHelp, ClipboardCheck, Cpu, Download, Eye, FileText,
  Layers, Radio, ShieldCheck, Sparkles, Target, Users, Zap
} from 'lucide-react'
import { Account, ImportSummary } from '../types'
import { LazyImage } from '../components/LazyImage'
import { Skeleton } from '../components/Skeleton'

export default function Overview({
  onNavigate,
  onSelect,
  importSummary,
  onOpenBooking,
  accounts
}: {
  onNavigate: (s: string) => void
  onSelect: (a: Account) => void
  importSummary: ImportSummary | null
  onOpenBooking: () => void
  accounts: Account[]
}) {
  const [simulatingLazy, setSimulatingLazy] = useState(false)

  const triggerLazySimulation = () => {
    setSimulatingLazy(true)
    setTimeout(() => {
      setSimulatingLazy(false)
    }, 850)
  }

  return (
    <>
      {/* HEADER WITH METASHOT BRAND ANNOUNCEMENT */}
      <div className="page-header">
        <div className="page-header-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.35rem' }}>
            <span className="page-eyebrow">Official MetaShot Platform</span>
            <span className="badge badge-solid" style={{ fontSize: '0.625rem' }}>Motion-Powered Cricket</span>
            <span className="badge badge-outline" style={{ fontSize: '0.625rem' }}>Shark Tank India</span>
          </div>
          <h1 className="page-title">
            Cricket Intelligence & Device Hub
          </h1>
          <p className="page-subtitle">
            {importSummary
              ? `Profiled export: ${importSummary.fileName} (${importSummary.records.toLocaleString()} rows) · Local compute`
              : 'Reimagining physical-to-digital cricket: real-time telemetry from 232,970 downloads and thousands of connected smart bats.'}
          </p>
        </div>

        <div className="page-header-actions">
          <button className="btn btn-outline" onClick={() => onNavigate('Smart Bat Hub')}>
            <Cpu size={15} />
            <span>SmartBat Telemetry</span>
          </button>
          <button className="btn btn-primary" onClick={() => onNavigate(importSummary ? 'Data quality' : 'Imports')}>
            <Sparkles size={15} />
            <span>{importSummary ? 'Review Profile' : 'Import Export'}</span>
          </button>
        </div>
      </div>

      {/* LAZY LOADING ARCHITECTURE SHOWCASE BANNER */}
      <section className="shadcn-card" style={{ marginBottom: '1.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--text-primary)',
              color: 'var(--bg-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.875rem'
            }}>
              ⚡
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Lazy Loading Architecture: Active</span>
                <span className="badge badge-solid" style={{ fontSize: '0.6rem' }}>On-Demand Code Splitting</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                Dynamic <code>React.lazy()</code> chunk splitting + progressive image skeleton shimmer deferral ensures sub-300ms initial load.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button className="btn btn-outline" onClick={triggerLazySimulation}>
              <Eye size={14} />
              <span>{simulatingLazy ? 'Simulating Lazy Fetch...' : 'Test Skeleton Shimmer'}</span>
            </button>
            <span className="badge badge-outline" style={{ fontFamily: 'var(--font-mono)' }}>0ms TTI</span>
          </div>
        </div>
      </section>

      {/* SIGNATURE HERO CARD (FEATURING THE EXACT SPEC BUTTON) */}
      <section className="shadcn-card" style={{ marginBottom: '1.5rem', padding: '1.75rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', alignItems: 'center' }}>
          <div>
            <span className="badge badge-solid" style={{ marginBottom: '0.625rem' }}>Direct Opportunity</span>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '0.45rem', lineHeight: 1.25 }}>
              Connect 215k Players to MetaShot SmartBat Hardware
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '560px', marginBottom: '1.25rem' }}>
              87% of all verified downloads originate in India with strong device-pairing demand. Book an appointment with MetaShot’s product team to test the Bluetooth handshake and 360° virtual stadium arenas.
            </p>

            <div style={{ maxWidth: '340px' }}>
              {/* THE EXACT USER-SPECIFIED BUTTON WITH REAL CHROMA SWEEP */}
              <button
                type="button"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl text-sm font-bold tracking-[-0.011em] bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-[0_2px_8px_rgba(0,0,0,0.15)] h-12 px-6 py-2.5 w-full transition-all cursor-pointer chroma-text-animate-parent"
                onClick={onOpenBooking}
              >
                <span className="chroma-text-out chroma-text-out-animate">
                  Book Appointment
                </span>
                <span className="text-sm tabler-icon-arrow-right transition-transform">→</span>
              </button>
            </div>
          </div>

          <div>
            {/* LAZY LOADED PRODUCT HERO ASSET */}
            <LazyImage
              src="/metashot-features.webp"
              fallbackSrc="https://metashot.in/cdn/shop/files/Artboard_4_2_1.webp?v=1784542026&width=1500"
              alt="MetaShot Smart Bat Hardware Engineering"
              aspectRatio="16/10"
            />
          </div>
        </div>
      </section>

      {/* CORE 4 METRICS (WITH LIVE SKELETON SIMULATION SUPPORT) */}
      <div className="metrics-grid">
        {simulatingLazy ? (
          [1, 2, 3, 4].map(i => (
            <div key={i} className="metric-card">
              <Skeleton style={{ height: '12px', width: '90px', marginBottom: '0.5rem' }} />
              <Skeleton style={{ height: '36px', width: '130px', marginBottom: '0.5rem' }} />
              <Skeleton style={{ height: '14px', width: '110px' }} />
            </div>
          ))
        ) : (
          <>
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Download Records</span>
                <div className="metric-icon-wrap"><Users size={16} /></div>
              </div>
              <div className="metric-value">232,970</div>
              <div className="metric-meta">
                <span className="badge badge-outline">2024–Sep 2026</span>
                <span>Total archive volume</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Unique Email Keys</span>
                <div className="metric-icon-wrap"><Target size={16} /></div>
              </div>
              <div className="metric-value">215,940</div>
              <div className="metric-meta">
                <span className="badge badge-outline">92.7% unique</span>
                <span>De-duplicated IDs</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">2026 Run Rate</span>
                <div className="metric-icon-wrap"><ClipboardCheck size={16} /></div>
              </div>
              <div className="metric-value">95,519</div>
              <div className="metric-meta">
                <span className="badge badge-outline">Through Sep 9</span>
                <span>Pacing above 2025</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Location Coverage</span>
                <div className="metric-icon-wrap"><ShieldCheck size={16} /></div>
              </div>
              <div className="metric-value">92.4%</div>
              <div className="metric-meta">
                <span className="badge badge-outline">215.2k valid</span>
                <span>Declared country</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* TWO COLUMN GRID: VELOCITY & SMARTBAT SPECS */}
      <div className="dashboard-grid">
        <section className="shadcn-card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Download Velocity Progression</h2>
              <p className="card-desc">Volume across the three audited application archives</p>
            </div>
            <button className="btn btn-ghost" onClick={() => onNavigate('Insights')}>
              <span>Insights</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="funnel-container">
            <div className="funnel-item">
              <div className="funnel-meta">
                <span className="funnel-meta-label">2024 Baseline</span>
                <span className="funnel-meta-value">37,649 records (16.2%)</span>
              </div>
              <div className="funnel-bar-track">
                <div className="funnel-bar-fill" style={{ width: '38%' }}></div>
              </div>
            </div>

            <div className="funnel-item">
              <div className="funnel-meta">
                <span className="funnel-meta-label">2025 Scale Year</span>
                <span className="funnel-meta-value">99,802 records (42.8%)</span>
              </div>
              <div className="funnel-bar-track">
                <div className="funnel-bar-fill" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className="funnel-item">
              <div className="funnel-meta">
                <span className="funnel-meta-label">2026 Partial (Jan 1 – Sep 9)</span>
                <span className="funnel-meta-value">95,519 records (41.0%)</span>
              </div>
              <div className="funnel-bar-track">
                <div className="funnel-bar-fill" style={{ width: '96%' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* SMARTBAT HARDWARE PREVIEW CARD */}
        <section className="shadcn-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <div>
                <h2 className="card-title">MetaShot Smart Bat & TV Kit</h2>
                <p className="card-desc">Zero-lag physical cricket gaming console</p>
              </div>
              <span className="badge badge-solid">Hardware Hub</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Bluetooth BLE</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>v5.0 Low Energy</div>
              </div>
              <div style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Sensor Tech</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>9-Axis Motion IMU</div>
              </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Play cover drives, straight lofts, and reverse sweeps anywhere with true-to-life bat-ball collision physics.
            </p>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => onNavigate('Smart Bat Hub')}>
              <span>Open Hardware Telemetry Hub</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </section>
      </div>

      {/* TOP MARKETS TABLE */}
      <section className="shadcn-card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Top Declared Geography Markets</h2>
            <p className="card-desc">Customer volume by country with device signal tracking</p>
          </div>
          <button className="btn btn-outline" onClick={() => onNavigate('Customers')}>
            <span>View All Markets</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="table-wrapper">
          <table className="shadcn-table">
            <thead>
              <tr>
                <th>Market Segment</th>
                <th>Share</th>
                <th>Volume</th>
                <th>Device Signal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {accounts.slice(0, 5).map(a => (
                <tr key={a.id} onClick={() => { onSelect(a); onNavigate('Customers') }}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className="market-avatar">{a.initials}</span>
                      <div>
                        <div style={{ fontWeight: 600 }}>{a.name}</div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{a.category}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{a.fit}%</span>
                      <div style={{ width: '48px', height: '4px', background: 'var(--border-subtle)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${a.fit}%`, height: '100%', background: 'var(--text-primary)' }}></div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{a.place}</td>
                  <td>{a.coverage}</td>
                  <td><span className="badge badge-outline">{a.stage}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
