import { useCallback, useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {
  createCollapse,
  createRecall,
  getTimeline,
  listRecalls,
  listTimelines,
  updateTimeline,
  type Recall,
  type Timeline,
  type TimelineInput,
} from '../../shared/api/client'
import { PlusIcon } from '../../shared/icons'
import {
  FormField,
  ResearchDrawer,
  ResearchSelect,
  SessionCanvasHeader,
} from '../../shared/ui'
import { timelinesPath } from '../workspace/researchSessions'
import { GUIDING_QUESTIONS, RECALL_CLASSIFICATION_LABELS } from './classifications'
import { formatYear } from './temporalFormat'
import { RecallDrawer } from './RecallDrawer'
import { TimelineCollapseDialog } from './TimelineCollapseDialog'
import { TimelineDrawer } from './TimelineDrawer'
import { buildTrackItems, TimelineTrack } from './TimelineTrack'
import './timelines.css'

type Props = {
  studyId: string
  timelineId: string
}

type CreateRecallState = {
  title: string
  description: string
  yearText: string
  isBce: boolean
  classification: Recall['classification']
}

const emptyCreate: CreateRecallState = {
  title: '',
  description: '',
  yearText: String(new Date().getFullYear()),
  isBce: false,
  classification: 'verified',
}

export function TimelineCanvas({ studyId, timelineId }: Props) {
  const navigate = useNavigate()
  const [timeline, setTimeline] = useState<Timeline | null>(null)
  const [recalls, setRecalls] = useState<Recall[]>([])
  const [allTimelines, setAllTimelines] = useState<Timeline[]>([])
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [selected, setSelected] = useState<Recall | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [collapseOpen, setCollapseOpen] = useState(false)
  const [createForm, setCreateForm] = useState<CreateRecallState>(emptyCreate)
  const [pending, setPending] = useState(false)

  const reload = useCallback(async () => {
    const [tl, recallList, timelines] = await Promise.all([
      getTimeline(studyId, timelineId),
      listRecalls(studyId, timelineId),
      listTimelines(studyId, 'all'),
    ])
    setTimeline(tl)
    setRecalls(recallList)
    setAllTimelines(timelines)
  }, [studyId, timelineId])

  useEffect(() => {
    let cancelled = false
    reload().catch((err) => {
      if (cancelled) {
        return
      }
      const message =
        err instanceof Error ? err.message : 'No pudimos cargar la línea.'
      if (message.includes('404') || message.includes('Not Found')) {
        setNotFound(true)
      } else {
        setError(message)
      }
    })
    return () => {
      cancelled = true
    }
  }, [reload])

  const namesById = useMemo(() => {
    const map: Record<string, string> = {}
    for (const t of allTimelines) {
      map[t.id] = t.name
    }
    return map
  }, [allTimelines])

  const trackItems = useMemo(() => {
    if (!timeline) {
      return []
    }
    return buildTrackItems(timeline.retrospective_year, recalls)
  }, [timeline, recalls])

  async function handleEditTimeline(input: TimelineInput) {
    const updated = await updateTimeline(studyId, timelineId, input)
    setTimeline(updated)
    setEditOpen(false)
  }

  async function handleCreateRecall() {
    if (!timeline || timeline.status === 'archived') {
      return
    }
    const yearRaw = Number.parseInt(createForm.yearText, 10)
    if (!Number.isFinite(yearRaw) || yearRaw === 0 || !createForm.title.trim()) {
      setError('Nombre y año válidos son obligatorios.')
      return
    }
    const year = createForm.isBce ? -Math.abs(yearRaw) : Math.abs(yearRaw)
    setPending(true)
    try {
      const created = await createRecall(studyId, timelineId, {
        title: createForm.title.trim(),
        description_markdown: createForm.description.trim() || '—',
        classification: createForm.classification,
        temporal_year: year,
      })
      setRecalls((prev) =>
        [...prev, created].sort((a, b) => a.sort_key - b.sort_key),
      )
      setCreateOpen(false)
      setCreateForm(emptyCreate)
      setSelected(created)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'No pudimos crear el recuerdo.',
      )
    } finally {
      setPending(false)
    }
  }

  if (notFound) {
    return <Navigate to={timelinesPath(studyId)} replace />
  }

  if (!timeline) {
    return (
      <div className="timeline-canvas">
        <p className="hint">{error ?? 'Cargando trayectoria…'}</p>
      </div>
    )
  }

  const archived = timeline.status === 'archived'

  return (
    <div
      className={[
        'timeline-canvas',
        selected || editOpen || createOpen || collapseOpen
          ? 'timelines--drawer-open'
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <SessionCanvasHeader
        eyebrow="Línea de tiempo"
        title={timeline.name}
        purpose={
          timeline.description.trim() ||
          `Desde ${formatYear(timeline.retrospective_year)}. ${GUIDING_QUESTIONS[5].question}`
        }
        aside={
          <div className="timeline-canvas__actions">
            <button
              type="button"
              className="ghost"
              onClick={() => setEditOpen(true)}
            >
              Editar línea
            </button>
            {!archived ? (
              <button
                type="button"
                className="btn-discovery"
                onClick={() => setCreateOpen(true)}
              >
                <PlusIcon size="sm" title="" aria-hidden />
                Crear recuerdo
              </button>
            ) : (
              <span className="hint">
                Línea archivada — solo lectura de recuerdos
              </span>
            )}
            <button
              type="button"
              className="ghost"
              onClick={() => navigate(timelinesPath(studyId))}
            >
              Todas las líneas
            </button>
          </div>
        }
      />

      {error ? <p className="timelines__error">{error}</p> : null}

      <TimelineTrack
        items={trackItems}
        onSelectRecall={setSelected}
        timelineNamesById={namesById}
      />

      <TimelineDrawer
        open={editOpen}
        mode="edit"
        initial={timeline}
        onClose={() => setEditOpen(false)}
        onSubmit={handleEditTimeline}
      />

      <RecallDrawer
        open={selected !== null}
        studyId={studyId}
        timelineId={timelineId}
        recall={selected}
        timelineNamesById={namesById}
        onClose={() => setSelected(null)}
        onSaved={(updated) => {
          setSelected(updated)
          setRecalls((prev) =>
            prev
              .map((r) => (r.id === updated.id ? updated : r))
              .sort((a, b) => a.sort_key - b.sort_key),
          )
        }}
        onRequestCollapse={() => setCollapseOpen(true)}
      />

      <TimelineCollapseDialog
        open={collapseOpen && selected !== null}
        studyId={studyId}
        currentTimelineId={timelineId}
        connectedIds={selected?.timeline_ids ?? []}
        onClose={() => setCollapseOpen(false)}
        onConfirm={async (ids) => {
          if (!selected) {
            return
          }
          const updated = await createCollapse(studyId, selected.id, ids)
          setSelected(updated)
          setRecalls((prev) =>
            prev.map((r) => (r.id === updated.id ? updated : r)),
          )
        }}
      />

      <ResearchDrawer
        open={createOpen}
        title="Nuevo recuerdo"
        onClose={() => setCreateOpen(false)}
        footer={
          <button
            type="button"
            className="btn-discovery btn-discovery--compact"
            disabled={pending}
            onClick={handleCreateRecall}
          >
            {pending ? 'Creando…' : 'Crear recuerdo'}
          </button>
        }
      >
        <FormField label="Nombre" htmlFor="new-recall-title">
          <input
            id="new-recall-title"
            value={createForm.title}
            onChange={(e) =>
              setCreateForm((f) => ({ ...f, title: e.target.value }))
            }
            autoFocus
          />
        </FormField>
        <FormField label="Descripción" htmlFor="new-recall-desc">
          <textarea
            id="new-recall-desc"
            value={createForm.description}
            onChange={(e) =>
              setCreateForm((f) => ({ ...f, description: e.target.value }))
            }
            rows={4}
          />
        </FormField>
        <FormField label="Clasificación" htmlFor="new-recall-class">
          <ResearchSelect
            id="new-recall-class"
            value={createForm.classification}
            onValueChange={(v) =>
              setCreateForm((f) => ({
                ...f,
                classification: v as Recall['classification'],
              }))
            }
            options={(
              Object.keys(RECALL_CLASSIFICATION_LABELS) as Array<
                Recall['classification']
              >
            ).map((value) => ({
              value,
              label: RECALL_CLASSIFICATION_LABELS[value],
            }))}
            aria-label="Clasificación del recuerdo"
          />
        </FormField>
        <FormField label="Año" htmlFor="new-recall-year">
          <input
            id="new-recall-year"
            value={createForm.yearText}
            onChange={(e) =>
              setCreateForm((f) => ({ ...f, yearText: e.target.value }))
            }
            inputMode="numeric"
          />
        </FormField>
        <label className="research-field research-field--checkbox">
          <input
            type="checkbox"
            checked={createForm.isBce}
            onChange={(e) =>
              setCreateForm((f) => ({ ...f, isBce: e.target.checked }))
            }
          />
          Antes de Cristo (a.C.)
        </label>
      </ResearchDrawer>
    </div>
  )
}
