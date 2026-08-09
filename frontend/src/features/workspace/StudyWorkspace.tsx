import { useEffect, useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import { getStudy, type Study } from '../../shared/api/client'
import { NisseBrandLockup } from '../../shared/brand'
import { ArrowLeftIcon } from '../../shared/icons'
import { ResearchSessionNav } from './ResearchSessionNav'
import './workspace.css'

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
              : 'No pudimos abrir este Workspace. Vuelve a la biblioteca e inténtalo de nuevo.',
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
          Volver a la biblioteca
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
        <NisseBrandLockup size="compact" className="workspace__brand" />
        <Link to="/" className="workspace__back">
          <ArrowLeftIcon size="sm" />
          Biblioteca
        </Link>
        <p className="eyebrow">Objeto de Estudio</p>
        <h1>{study.name}</h1>
        {study.description ? (
          <p className="workspace__desc">{study.description}</p>
        ) : (
          <p className="muted">
            Sin contexto escrito todavía. Puedes refinarlo desde la biblioteca.
          </p>
        )}
        <ResearchSessionNav studyId={studyId} />
      </aside>

      <main className="workspace__stage">
        <Outlet />
      </main>

      <aside className="workspace__companion" aria-label="Companion">
        <p className="eyebrow">Companion</p>
        <p className="workspace__companion-copy">
          Acompañará la exploración cuando actives agentes. No es un chat: es un
          investigador que propone relaciones sobre este Workspace.
        </p>
      </aside>
    </div>
  )
}
