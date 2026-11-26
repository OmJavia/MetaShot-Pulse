import { useState, ImgHTMLAttributes } from 'react'

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string
  src: string
  aspectRatio?: string
  fallbackSrc?: string
}

export function LazyImage({
  src,
  alt,
  className = '',
  aspectRatio = '16/9',
  style,
  fallbackSrc,
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const activeSrc = error && fallbackSrc ? fallbackSrc : src

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio,
        backgroundColor: 'var(--bg-tertiary, #1f1f23)',
        borderRadius: 'var(--radius-lg, 12px)',
        border: '1px solid var(--border-default, #27272a)',
        ...style
      }}
    >
      {/* Shimmer Placeholder while loading */}
      {!loaded && (
        <div
          className="skeleton-shimmer"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            backgroundColor: 'var(--bg-tertiary, #27272a)'
          }}
        />
      )}

      {/* Lazy Loaded Image */}
      <img
        src={activeSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!error && fallbackSrc) setError(true)
          else setLoaded(true)
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'scale(1)' : 'scale(1.03)',
          transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 2,
          position: 'relative'
        }}
        {...props}
      />
    </div>
  )
}
