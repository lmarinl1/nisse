import type { CSSProperties, ReactNode } from 'react'
import { brandAssetPaths } from '../brand'
import './session-canvas-header.css'

export type SessionCanvasHeaderProps = {
  eyebrow: string
  title: string
  purpose?: ReactNode
  aside?: ReactNode
  banner?: ReactNode
  variant?: 'overview' | 'section'
  className?: string
}

const markStyle = {
  ['--nisse-mark-mask' as string]: `url(${brandAssetPaths['official-clean']})`,
} as CSSProperties

export function SessionCanvasHeader({
  eyebrow,
  title,
  purpose,
  aside,
  banner,
  variant = 'overview',
  className,
}: SessionCanvasHeaderProps) {
  return (
    <header
      className={[
        'session-canvas-header',
        `session-canvas-header--${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {banner}
      <div className="session-canvas-header__main">
        <div className="session-canvas-header__brand">
          <span
            className="nisse-mark nisse-mark--discovery nisse-mark--sm session-canvas-header__mark"
            style={markStyle}
            aria-hidden
          />
          <div className="session-canvas-header__copy">
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
            {purpose ? (
              <div className="session-canvas-header__purpose">{purpose}</div>
            ) : null}
          </div>
        </div>
        {aside ? (
          <div className="session-canvas-header__aside">{aside}</div>
        ) : null}
      </div>
    </header>
  )
}
