import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NisseBrandLockup } from '../../shared/brand'
import { ResearchNetworkAtmosphere } from '../atmosphere/ResearchNetworkAtmosphere'
import { useAuth } from '../identity/AuthContext'
import {
  archiveStudy,
  createStudy,
  listStudies,
  updateStudy,
  type Study,
  type StudyInput,
} from '../../shared/api/client'
import { StudyCreateDrawer } from './StudyCreateDrawer'
import { StudyEmptyState } from './StudyEmptyState'
import { StudyLibrary } from './StudyLibrary'
import './study.css'

export function StudyHome() {
  const { profile, logout } = useAuth()
  const navigate = useNavigate()
  const [studies, setStudies] = useState<Study[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit' | null>(null)
  const [editing, setEditing] = useState<Study | null>(null)

  useEffect(() => {
    let cancelled = false
    listStudies()
      .then((data) => {
        if (!cancelled) {
          setStudies(data)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'No pudimos abrir la biblioteca. Revisa la conexión e inténtalo de nuevo.',
          )
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  async function handleCreate(input: StudyInput) {
    const study = await createStudy(input)
    setDrawerMode(null)
    navigate(`/studies/${study.id}`)
  }

  async function handleEdit(input: StudyInput) {
    if (!editing) {
      return
    }
    const updated = await updateStudy(editing.id, input)
    setStudies((prev) =>
      prev ? prev.map((s) => (s.id === updated.id ? updated : s)) : prev,
    )
    setDrawerMode(null)
    setEditing(null)
  }

  async function handleArchive(study: Study) {
    await archiveStudy(study.id)
    setStudies((prev) => (prev ? prev.filter((s) => s.id !== study.id) : prev))
  }

  return (
    <main className="study-home">
      <div className="study-home__atmosphere" aria-hidden="true">
        <ResearchNetworkAtmosphere density="sparse" />
        <div className="study-home__vignette" />
      </div>

      <div className="study-home__content">
        <header className="study-home__top">
          <NisseBrandLockup size="entry" className="study-home__brand" />
          <div className="study-home__identity">
            <span className="study-home__designer">
              {profile?.display_name || profile?.username}
            </span>
            <button
              type="button"
              className="ghost"
              onClick={() => void logout()}
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        {studies === null && !error && (
          <p className="loading-narrative">Reuniendo tus investigaciones…</p>
        )}

        {studies && studies.length === 0 && (
          <StudyEmptyState onCreate={() => setDrawerMode('create')} />
        )}

        {studies && studies.length > 0 && (
          <StudyLibrary
            studies={studies}
            onCreate={() => {
              setEditing(null)
              setDrawerMode('create')
            }}
            onRefine={(study) => {
              setEditing(study)
              setDrawerMode('edit')
            }}
            onArchive={(study) => void handleArchive(study)}
          />
        )}
      </div>

      <StudyCreateDrawer
        key={`${drawerMode}-${editing?.id ?? 'new'}`}
        open={drawerMode !== null}
        title={
          drawerMode === 'edit'
            ? 'Refinar el Objeto de Estudio'
            : '¿Qué quieres comprender?'
        }
        initial={
          editing
            ? { name: editing.name, description: editing.description }
            : undefined
        }
        submitLabel={
          drawerMode === 'edit' ? 'Actualizar contexto' : 'Abrir Workspace'
        }
        onClose={() => {
          setDrawerMode(null)
          setEditing(null)
        }}
        onSubmit={drawerMode === 'edit' ? handleEdit : handleCreate}
      />
    </main>
  )
}
