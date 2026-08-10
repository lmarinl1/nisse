import {
  useEffect,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { brandAssetPaths } from '../brand'
import { CloseIcon } from '../icons'
import './research-drawer.css'

export type ResearchDrawerProps = {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
  hint?: ReactNode
  'aria-label'?: string
}

const markStyle = {
  ['--nisse-mark-mask' as string]: `url(${brandAssetPaths['official-clean']})`,
} as CSSProperties

export function ResearchDrawer({
  open,
  title,
  onClose,
  children,
  footer,
  hint,
  'aria-label': ariaLabel,
}: ResearchDrawerProps) {
  useEffect(() => {
    if (!open) {
      return
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <aside
      className="research-drawer"
      aria-label={ariaLabel ?? title}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="research-drawer__backdrop"
        aria-label="Cerrar"
        onClick={onClose}
      />
      <div className="research-drawer__panel">
        <header className="research-drawer__header">
          <div className="research-drawer__brand">
            <span
              className="nisse-mark nisse-mark--discovery nisse-mark--sm research-drawer__mark"
              style={markStyle}
              aria-hidden
            />
            <h2 className="research-drawer__title">{title}</h2>
          </div>
          <button
            type="button"
            className="ghost icon-action"
            aria-label="Cerrar"
            onClick={onClose}
          >
            <CloseIcon size="nav" />
          </button>
        </header>
        {hint ? <div className="research-drawer__hint">{hint}</div> : null}
        <div className="research-drawer__body">{children}</div>
        {footer ? <div className="research-drawer__footer">{footer}</div> : null}
      </div>
    </aside>
  )
}
