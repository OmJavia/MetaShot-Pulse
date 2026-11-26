import { HTMLAttributes } from 'react'

export function Skeleton({ className = '', style, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`skeleton-shimmer ${className}`}
      style={{
        borderRadius: 'var(--radius-md, 8px)',
        backgroundColor: 'var(--bg-tertiary, #27272a)',
        ...style
      }}
      {...props}
    />
  )
}

export function ViewLoadingSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '300px' }}>
          <Skeleton style={{ height: '14px', width: '120px' }} />
          <Skeleton style={{ height: '32px', width: '260px' }} />
          <Skeleton style={{ height: '16px', width: '220px' }} />
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Skeleton style={{ height: '38px', width: '120px', borderRadius: '10px' }} />
          <Skeleton style={{ height: '38px', width: '130px', borderRadius: '10px' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="shadcn-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Skeleton style={{ height: '12px', width: '90px' }} />
              <Skeleton style={{ height: '28px', width: '28px', borderRadius: '8px' }} />
            </div>
            <Skeleton style={{ height: '36px', width: '110px' }} />
            <Skeleton style={{ height: '12px', width: '140px' }} />
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.25rem' }}>
        <div className="shadcn-card" style={{ height: '260px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Skeleton style={{ height: '20px', width: '180px' }} />
          <Skeleton style={{ height: '12px', width: '240px' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
            <Skeleton style={{ height: '14px', width: '100%' }} />
            <Skeleton style={{ height: '14px', width: '85%' }} />
            <Skeleton style={{ height: '14px', width: '92%' }} />
          </div>
        </div>
        <div className="shadcn-card" style={{ height: '260px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Skeleton style={{ height: '20px', width: '140px' }} />
          <Skeleton style={{ height: '12px', width: '200px' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Skeleton style={{ height: '40px', width: '100%', borderRadius: '8px' }} />
            <Skeleton style={{ height: '40px', width: '100%', borderRadius: '8px' }} />
            <Skeleton style={{ height: '40px', width: '100%', borderRadius: '8px' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
