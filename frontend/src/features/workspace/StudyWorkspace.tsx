import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getStudy, type Study } from '../../shared/api/client'
import { WorkspaceCanvas } from '../canvas/WorkspaceCanvas'
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
        <Link to="/">Volver a la biblioteca</Link>
      </main>
    )
  }

  if (!study) {
    return (
      <main className="workspace workspace--message">
        <p className="loading-narrative">Abriendo el espacio de investigación…</p>
      </main>
    )
  }

  return (
    <div className="workspace">
      <aside className="workspace__rail" aria-label="Contexto de investigación">
        <Link to="/" className="workspace__back">
          ← Biblioteca
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
      </aside>

      <main className="workspace__stage">
        <WorkspaceCanvas />
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
