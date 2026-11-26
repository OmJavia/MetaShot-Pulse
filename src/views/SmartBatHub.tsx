import { useState } from 'react'
import {
  Activity, ArrowRight, Battery, Bluetooth, Cpu, Eye,
  Gamepad2, Layers, Play, Radio, ShieldCheck, Sparkles, Tv, Wifi, Zap
} from 'lucide-react'
import { LazyImage } from '../components/LazyImage'

export default function SmartBatHub({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [activeMode, setActiveMode] = useState('Super Over')
  const [telemetryActive, setTelemetryActive] = useState(true)

  const specs = [
    { label: 'Motion Tracking', value: '9-Axis IMU Sensors', meta: 'Real-time swing telemetry', icon: <Cpu size={16} /> },
    { label: 'Bat Speed Range', value: 'Up to 160 km/h', meta: 'Precision micro-second capture', icon: <Activity size={16} /> },
    { label: 'Connectivity', value: 'Bluetooth Low Energy 5.0', meta: 'Ultra-low latency (<8ms)', icon: <Bluetooth size={16} /> },
    { label: 'Haptic Feedback', value: 'Tactile Impact Engine', meta: 'Ball-strike physical vibration', icon: <Zap size={16} /> },
    { label: 'Battery Endurance', value: '18+ Hours Playtime', meta: 'Fast USB-C recharge cycle', icon: <Battery size={16} /> },
    { label: 'TV Kit Casting', value: 'Zero-Lag HDMI Dongle', meta: 'Direct 1080p 60fps display', icon: <Tv size={16} /> },
  ]

  const howItWorks = [
    { step: '01', title: 'Get MetaShot Smart Bat & TV Kit', desc: 'Ergonomic sensor-infused bat + plug-and-play TV HDMI receiver dongle.' },
    { step: '02', title: 'Download the MetaShot App', desc: 'Free companion app on Google Play Store & iOS App Store.' },
    { step: '03', title: 'Instant Bluetooth Connect', desc: 'Auto-syncs telemetry handshake in under 5 seconds.' },
    { step: '04', title: 'Ready to Play 360° Shots', desc: 'Swing in your living room—shots calculate instantaneously in virtual stadiums.' },
  ]

  const gameModes = [
    { name: 'Super Over', desc: '6 balls to chase glory against global community leaderboards.', badge: 'Most Popular' },
    { name: 'Multiplayer Online', desc: 'Compete 1v1 with friends or players worldwide in real-time.', badge: 'Live Matches' },
    { name: 'Tournament Arena', desc: 'Multi-stage cricket cups with knockout brackets and custom overs.', badge: 'Competitive' },
    { name: 'Practice Nets', desc: 'Detailed shot heatmaps, bat swing trajectory, and sweet-spot analytics.', badge: 'Skill Training' },
  ]

  return (
    <>
      <div className="page-header">
        <div className="page-header-info">
          <span className="page-eyebrow">MetaShot Hardware & Telemetry Ecosystem</span>
          <h1 className="page-title">
            SmartBat Cricket Arena <span className="badge badge-solid">Shark Tank Featured</span>
          </h1>
          <p className="page-subtitle">
            Reimagining physical cricket through motion-powered smart bat sensors, zero-latency TV casting, and real-time app telemetry.
          </p>
        </div>

        <div className="page-header-actions">
          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl text-sm font-bold tracking-[-0.011em] bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-[0_2px_8px_rgba(0,0,0,0.15)] h-10 px-5 py-2 transition-all cursor-pointer chroma-text-animate-parent"
            onClick={onOpenBooking}
          >
            <span className="chroma-text-out chroma-text-out-animate">
              Order Smart Bat Demo
            </span>
            <span className="text-sm tabler-icon-arrow-right transition-transform">→</span>
          </button>
        </div>
      </div>

      {/* HARDWARE TELEMETRY HERO BANNER WITH LAZY LOADED IMAGERY */}
      <section className="shadcn-card" style={{ marginBottom: '1.5rem', background: 'var(--bg-secondary)', padding: '1.75rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="badge badge-solid">Flagship Hardware</span>
              <span className="badge badge-outline">As Heard on Shark Tank</span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.25, marginBottom: '0.5rem' }}>
              Reimagined Cricket with Motion-Powered SmartBat
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Every cut, drive, and pull shot is tracked with sub-degree orientation accuracy. MetaShot’s patented motion sensors detect bat speed, impact timing, and sweet-spot contact to render exact ball trajectory on your TV screen.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.875rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'var(--bg-primary)' }}>
                <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Bat Speed</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>134.2 <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>km/h</span></div>
              </div>
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'var(--bg-primary)' }}>
                <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Sweet Spot</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>96.4%</div>
              </div>
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'var(--bg-primary)' }}>
                <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Impact Angle</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>+14.8°</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                className="btn btn-outline"
                onClick={() => setTelemetryActive(!telemetryActive)}
              >
                <Radio size={14} className={telemetryActive ? 'text-primary' : 'text-muted'} />
                <span>{telemetryActive ? 'Live Telemetry Active' : 'Resume Telemetry'}</span>
              </button>
            </div>
          </div>

          <div>
            {/* Lazy Loaded Hero Asset */}
            <LazyImage
              src="/metashot-hero.webp"
              fallbackSrc="https://cdn.shopify.com/s/files/1/0610/6490/4794/files/Hero_banner_d3.jpg_1_1_1.webp?v=1784304752"
              alt="MetaShot Smart Bat Hardware"
              aspectRatio="16/10"
            />
          </div>
        </div>
      </section>

      {/* HARDWARE SPECS GRID */}
      <h2 className="card-title" style={{ fontSize: '1.125rem', marginBottom: '0.875rem' }}>SmartBat Engineering & Sensors</h2>
      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '1.5rem' }}>
        {specs.map(s => (
          <div className="metric-card" key={s.label}>
            <div className="metric-header">
              <span className="metric-label">{s.label}</span>
              <div className="metric-icon-wrap">{s.icon}</div>
            </div>
            <div className="metric-value" style={{ fontSize: '1.35rem' }}>{s.value}</div>
            <div className="metric-meta">{s.meta}</div>
          </div>
        ))}
      </div>

      {/* GAME MODES & SCREENSHOTS SHOWCASE (LAZY LOADED) */}
      <div className="dashboard-grid">
        <section className="shadcn-card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Virtual Stadium Gameplay</h2>
              <p className="card-desc">Play 360° Shots Anywhere, Anytime on your big screen TV</p>
            </div>
            <span className="badge badge-outline">{activeMode}</span>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <LazyImage
              src="/metashot-gameplay.webp"
              fallbackSrc="https://metashot.in/cdn/shop/files/screen_4.webp?v=1722600804&width=1070"
              alt="MetaShot Cricket Gameplay In-Game Action"
              aspectRatio="16/9"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {gameModes.map(mode => (
              <div
                key={mode.name}
                onClick={() => setActiveMode(mode.name)}
                style={{
                  padding: '0.875rem',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${activeMode === mode.name ? 'var(--border-focus)' : 'var(--border-default)'}`,
                  background: activeMode === mode.name ? 'var(--bg-secondary)' : 'var(--bg-elevated)',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{mode.name}</span>
                  <span className="badge badge-outline" style={{ fontSize: '0.625rem' }}>{mode.badge}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{mode.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="shadcn-card">
          <div className="card-header">
            <div>
              <h2 className="card-title">How It Works</h2>
              <p className="card-desc">Zero friction 4-step setup sequence from unboxing to first six</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {howItWorks.map((item) => (
              <div key={item.step} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', paddingBottom: '0.875rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-default)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-primary)',
                  flexShrink: 0
                }}>
                  {item.step}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{item.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: 1.45 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <LazyImage
              src="/metashot-stadium.webp"
              fallbackSrc="https://metashot.in/cdn/shop/files/screen_5.webp?v=1722600831&width=1070"
              alt="MetaShot Stadium Arena"
              aspectRatio="16/8"
            />
          </div>
        </section>
      </div>
    </>
  )
}
