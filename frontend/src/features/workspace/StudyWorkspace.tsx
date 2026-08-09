import { useEffect, useState, type CSSProperties } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import { getStudy, type Study } from '../../shared/api/client'
import { brandAssetPaths } from '../../shared/brand'
import { ArrowLeftIcon } from '../../shared/icons'
import { ResearchSessionNav } from './ResearchSessionNav'
import './workspace.css'

const identityMarkStyle = {
  ['--nisse-mark-mask' as string]: `url(${brandAssetPaths['official-clean']})`,
} as CSSProperties

export function StudyWorkspace() {
  const { studyId } = useParams<{ studyId: string }>()
  const [study, setStudy] = useState<Study | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!studyId) {
      return
    }
    let cancelled = false
    getStudy(studyId)
      .then((data) => {
        if (!cancelled) {
          setStudy(data)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'No pudimos abrir este Workspace. Vuelve al campo e inténtalo de nuevo.',
          )
        }
      })
    return () => {
      cancelled = true
    }
  }, [studyId])

  if (error) {
    return (
      <main className="workspace workspace--message">
        <p className="form-error" role="alert">
          {error}
        </p>
        <Link to="/" className="workspace__back">
          <ArrowLeftIcon size="sm" />
          Volver al campo
        </Link>
      </main>
    )
  }

  if (!study || !studyId) {
    return (
      <main className="workspace workspace--message">
        <p className="loading-narrative">Abriendo el espacio de investigación…</p>
      </main>
    )
  }

  return (
    <div className="workspace">
      <aside className="workspace__rail" aria-label="Contexto de investigación">
        <div className="workspace__rail-panel workspace__rail-panel--identity">
          <div className="workspace__identity">
            <span
              className="nisse-mark nisse-mark--discovery workspace__identity-mark"
              style={identityMarkStyle}
              aria-hidden
            />
            <span className="workspace__identity-wordmark">NISSE</span>
            <p className="workspace__motto">
              El futuro no se predice: se anticipa y se diseña.
            </p>
          </div>
        </div>

        <div className="workspace__rail-panel workspace__rail-panel--sessions">
          <ResearchSessionNav studyId={studyId} />
        </div>

        <div className="workspace__rail-panel workspace__rail-panel--study workspace__rail-foot">
          <p className="eyebrow">Objeto de Estudio</p>
          <h1>{study.name}</h1>
          {study.description ? (
            <p className="workspace__desc">{study.description}</p>
          ) : (
            <p className="muted">
              Sin contexto escrito todavía. Puedes refinarlo desde el campo.
            </p>
          )}
          <Link to="/" className="workspace__back">
            <ArrowLeftIcon size="sm" />
            Campo
          </Link>
        </div>
      </aside>

      <main className="workspace__stage">
        <Outlet />
      </main>

      <aside className="workspace__companion" aria-label="Companion">
        <div className="workspace__companion-panel">
          <p className="eyebrow">Companion</p>
          <p className="workspace__companion-copy">
            Acompañará la exploración cuando actives agentes. No es un chat: es
            un investigador que propone relaciones sobre este Workspace.
          </p>
        </div>
      </aside>
    </div>
  )
}
