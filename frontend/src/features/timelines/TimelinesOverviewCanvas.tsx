import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  archiveTimeline,
  createTimeline,
  deleteTimeline,
  listTimelines,
  restoreTimeline,
  type Timeline,
  type TimelineInput,
} from '../../shared/api/client'
import { PlusIcon } from '../../shared/icons'
import { SessionCanvasHeader } from '../../shared/ui'
import { timelinePath } from '../workspace/researchSessions'
import {
  TimelineClassificationBadge,
  TimelineStatusBadge,
} from './badges'
import { GUIDING_QUESTIONS } from './classifications'
import { formatYear } from './temporalFormat'
import { TimelineDrawer } from './TimelineDrawer'
import './timelines.css'

type Props = {
  studyId: string
}

type Tab = 'active' | 'archived'

export function TimelinesOverviewCanvas({ studyId }: Props) {
  const navigate = useNavigate()
  const [timelines, setTimelines] = useState<Timeline[]>([])
  const [tab, setTab] = useState<Tab>('active')
  const [query, setQuery] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)

  async function reload() {
    const data = await listTimelines(studyId, 'all')
    setTimelines(data)
  }

  useEffect(() => {
    let cancelled = false
    listTimelines(studyId, 'all')
      .then((data) => {
        if (!cancelled) {
          setTimelines(data)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'No pudimos cargar las líneas de tiempo.',
          )
        }
      })
    return () => {
      cancelled = true
    }
  }, [studyId])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return timelines
      .filter((t) => (tab === 'active' ? t.status === 'active' : t.status === 'archived'))
      .filter((t) =>
        !q
          ? true
          : t.name.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q),
      )
  }, [timelines, tab, query])

  const metrics = useMemo(() => {
    const active = timelines.filter((t) => t.status === 'active').length
    const archived = timelines.filter((t) => t.status === 'archived').length
    const recalls = timelines.reduce((sum, t) => sum + t.recall_count, 0)
    const fictional = timelines.filter((t) => t.classification === 'fictional').length
    return { active, archived, recalls, fictional, total: timelines.length }
  }, [timelines])

  async function handleCreate(input: TimelineInput) {
    await createTimeline(studyId, input)
    setDrawerOpen(false)
    await reload()
  }

  async function handleArchive(timeline: Timeline) {
    setBusyId(timeline.id)
    try {
      await archiveTimeline(studyId, timeline.id)
      await reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo archivar.')
    } finally {
      setBusyId(null)
    }
  }

  async function handleRestore(timeline: Timeline) {
    setBusyId(timeline.id)
    try {
      await restoreTimeline(studyId, timeline.id)
      await reload()
      setTab('active')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo restaurar.')
    } finally {
      setBusyId(null)
    }
  }

  async function handleHardDelete(timeline: Timeline) {
    if (timeline.is_default) {
      setError('La línea principal no puede eliminarse definitivamente.')
      return
    }
    const ok = window.confirm(
      `¿Eliminar definitivamente «${timeline.name}»? Se borrarán sus recuerdos, momentos y relaciones que dependan solo de ella.`,
    )
    if (!ok) {
      return
    }
    setBusyId(timeline.id)
    try {
      await deleteTimeline(studyId, timeline.id)
      await reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo eliminar.')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div
      className={[
        'timelines',
        drawerOpen ? 'timelines--drawer-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <SessionCanvasHeader
        eyebrow="Diseño del tiempo"
        title="Líneas de tiempo"
        purpose="Mapea contextos de emergencia. Explora temporalidades reales o ficticias para preguntar por qué este problema aparece aquí y ahora."
        aside={
          <div className="timelines__metrics" aria-label="Resumen">
            <span>{metrics.total} líneas</span>
            <span>{metrics.recalls} recuerdos</span>
            <span>{metrics.active} activas</span>
            <span>{metrics.fictional} ficticias</span>
          </div>
        }
      />

      <div className="timelines__toolbar">
        <div className="timelines__tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-pressed={tab === 'active'}
            onClick={() => setTab('active')}
          >
            Activas
          </button>
          <button
            type="button"
            role="tab"
            aria-pressed={tab === 'archived'}
            onClick={() => setTab('archived')}
          >
            Archivadas
          </button>
        </div>
        <input
          type="search"
          placeholder="Buscar líneas…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar líneas de tiempo"
        />
        {tab === 'active' ? (
          <button
            type="button"
            className="btn-discovery"
            onClick={() => setDrawerOpen(true)}
          >
            <PlusIcon size="sm" title="" aria-hidden />
            Nueva línea
          </button>
        ) : null}
      </div>

      {error ? <p className="timelines__error">{error}</p> : null}

      <div className="timelines__grid">
        {filtered.map((timeline) => (
          <article key={timeline.id} className="timelines__block-wrap">
            <button
              type="button"
              className="timelines__block"
              onClick={() => navigate(timelinePath(studyId, timeline.id))}
            >
              <div className="timelines__meta">
                <TimelineClassificationBadge
                  classification={timeline.classification}
                />
                <TimelineStatusBadge status={timeline.status} />
                {timeline.is_default ? (
                  <span className="timelines__badge timelines__badge--principal">
                    Principal
                  </span>
                ) : null}
              </div>
              <h2>{timeline.name}</h2>
              <p>
                {timeline.description.trim() ||
                  'Sin descripción — abre la línea para recorrer su trayectoria.'}
              </p>
              <div className="timelines__meta">
                <span>Desde {formatYear(timeline.retrospective_year)}</span>
                <span>{timeline.recall_count} recuerdos</span>
                <span>
                  Actualizada{' '}
                  {new Date(timeline.updated_at).toLocaleDateString('es')}
                </span>
              </div>
            </button>
            <div className="timelines__toolbar">
              {timeline.status === 'active' ? (
                <button
                  type="button"
                  className="ghost"
                  disabled={busyId === timeline.id}
                  onClick={() => handleArchive(timeline)}
                >
                  Archivar
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="ghost"
                    disabled={busyId === timeline.id}
                    onClick={() => handleRestore(timeline)}
                  >
                    Restaurar
                  </button>
                  {!timeline.is_default ? (
                    <button
                      type="button"
                      className="ghost"
                      disabled={busyId === timeline.id}
                      onClick={() => handleHardDelete(timeline)}
                    >
                      Eliminar definitivamente
                    </button>
                  ) : null}
                </>
              )}
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="hint">
          {tab === 'active'
            ? 'Aún no hay líneas activas en esta vista. Crea una para comenzar a diseñar el tiempo.'
            : 'No hay líneas archivadas.'}
        </p>
      ) : null}

      <aside className="timelines__guiding" aria-label="Preguntas orientadoras">
        <h3>Orientación</h3>
        <ul>
          {GUIDING_QUESTIONS.slice(0, 3).map((item) => (
            <li key={item.id}>
              <strong>{item.title}.</strong> {item.question}
            </li>
          ))}
        </ul>
      </aside>

      <TimelineDrawer
        open={drawerOpen}
        mode="create"
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  )
}
