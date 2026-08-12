import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  createCollapse,
  createMoment,
  deleteMoment,
  updateRecall,
  type Moment,
  type Recall,
  type RecallInput,
} from '../../shared/api/client'
import { PlusIcon } from '../../shared/icons'
import {
  FormField,
  ResearchDrawer,
  ResearchSelect,
} from '../../shared/ui'
import { MarkdownResearchEditor } from '../case-framework/MarkdownResearchEditor'
import { timelinePath } from '../workspace/researchSessions'
import { RecallClassificationBadge } from './badges'
import {
  RECALL_CLASSIFICATION_LABELS,
  type RecallClassification,
} from './classifications'
import { RecallRelationCarousel } from './RecallRelationCarousel'
import {
  formatTemporalDate,
  parseOptionalDay,
  parseOptionalMonth,
  parseYearInput,
  yearToInput,
} from './temporalFormat'

type Props = {
  open: boolean
  studyId: string
  timelineId: string
  recall: Recall | null
  timelineNamesById: Record<string, string>
  onClose: () => void
  onSaved: (recall: Recall) => void
  onRequestCollapse: () => void
}

const CLASSIFICATION_OPTIONS = (
  Object.keys(RECALL_CLASSIFICATION_LABELS) as RecallClassification[]
).map((value) => ({
  value,
  label: RECALL_CLASSIFICATION_LABELS[value],
}))

export function RecallDrawer({
  open,
  studyId,
  timelineId,
  recall,
  timelineNamesById,
  onClose,
  onSaved,
  onRequestCollapse,
}: Props) {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [classification, setClassification] =
    useState<RecallClassification>('verified')
  const [yearText, setYearText] = useState('')
  const [monthText, setMonthText] = useState('')
  const [dayText, setDayText] = useState('')
  const [isBce, setIsBce] = useState(false)
  const [moments, setMoments] = useState<Moment[]>([])
  const [momentTitle, setMomentTitle] = useState('')
  const [momentContent, setMomentContent] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [relationPending, setRelationPending] = useState(false)

  useEffect(() => {
    if (!open || !recall) {
      return
    }
    setTitle(recall.title)
    setLocation(recall.location)
    setDescription(recall.description_markdown)
    setClassification(recall.classification)
    const y = yearToInput(recall.temporal_year)
    setYearText(String(y.year))
    setIsBce(y.isBce)
    setMonthText(
      recall.temporal_month != null ? String(recall.temporal_month) : '',
    )
    setDayText(recall.temporal_day != null ? String(recall.temporal_day) : '')
    setMoments(recall.moments)
    setError(null)
  }, [open, recall])

  if (!open) {
    return null
  }

  if (!recall) {
    return (
      <ResearchDrawer open={open} title="Recuerdo" onClose={onClose}>
        <p className="hint">Selecciona un recuerdo en la línea.</p>
      </ResearchDrawer>
    )
  }

  const activeRecall = recall

  async function handleSave(event: FormEvent) {
    event.preventDefault()
    const year = parseYearInput(yearText, isBce)
    const month = parseOptionalMonth(monthText)
    const day = parseOptionalDay(dayText)
    if (year == null || !title.trim() || !description.trim()) {
      setError('Nombre, fecha y descripción son obligatorios.')
      return
    }
    if (month.error || day.error) {
      setError(month.error ?? day.error)
      return
    }
    if (day.value != null && month.value == null) {
      setError('Indica el mes si especificas el día.')
      return
    }
    setPending(true)
    setError(null)
    try {
      const input: RecallInput = {
        title: title.trim(),
        location: location.trim(),
        description_markdown: description,
        classification,
        temporal_year: year,
        temporal_month: month.value,
        temporal_day: day.value,
      }
      const updated = await updateRecall(studyId, activeRecall.id, input)
      onSaved(updated)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'No pudimos guardar el recuerdo.',
      )
    } finally {
      setPending(false)
    }
  }

  async function handleAddMoment(event: FormEvent) {
    event.preventDefault()
    if (!momentTitle.trim()) {
      return
    }
    const created = await createMoment(studyId, activeRecall.id, {
      title: momentTitle.trim(),
      content_markdown: momentContent,
      type: 'note',
    })
    const nextMoments = [...moments, created]
    setMoments(nextMoments)
    setMomentTitle('')
    setMomentContent('')
    onSaved({ ...activeRecall, moments: nextMoments })
  }

  async function handleDeleteMoment(momentId: string) {
    await deleteMoment(studyId, activeRecall.id, momentId)
    const next = moments.filter((m) => m.id !== momentId)
    setMoments(next)
    onSaved({ ...activeRecall, moments: next })
  }

  async function handleRemoveTimeline(timelineIdToRemove: string) {
    if (timelineIdToRemove === activeRecall.home_timeline_id) {
      return
    }
    setRelationPending(true)
    setError(null)
    try {
      const nextIds = activeRecall.timeline_ids.filter(
        (id) => id !== timelineIdToRemove,
      )
      const updated = await createCollapse(studyId, activeRecall.id, nextIds)
      onSaved(updated)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No pudimos quitar la conexión.',
      )
    } finally {
      setRelationPending(false)
    }
  }

  const relationCards = activeRecall.timeline_ids.map((id) => {
    const isHome = id === activeRecall.home_timeline_id
    return {
      id,
      title: timelineNamesById[id] ?? id,
      timelineName: isHome ? 'Línea hogar' : 'Línea conectada',
      badge: isHome ? 'Hogar' : undefined,
      onOpen: () => {
        if (id === timelineId) {
          return
        }
        navigate(timelinePath(studyId, id), {
          state: { recallId: activeRecall.id },
        })
      },
      onRemove:
        !isHome && !relationPending
          ? () => {
              void handleRemoveTimeline(id)
            }
          : undefined,
    }
  })

  return (
    <ResearchDrawer
      open={open}
      title="Recuerdo"
      onClose={onClose}
      hint={
        <>
          {formatTemporalDate(
            activeRecall.temporal_year,
            activeRecall.temporal_month,
            activeRecall.temporal_day,
          )}{' '}
          ·{' '}
          <RecallClassificationBadge
            classification={activeRecall.classification}
          />
        </>
      }
      footer={
        <>
          <button
            type="submit"
            form="recall-drawer-form"
            className="btn-discovery btn-discovery--compact"
            disabled={pending}
          >
            {pending ? 'Guardando…' : 'Guardar cambios'}
          </button>
          <button type="button" className="ghost" onClick={onRequestCollapse}>
            Conectar líneas
          </button>
        </>
      }
    >
      <form id="recall-drawer-form" onSubmit={handleSave}>
        <FormField label="Nombre" htmlFor="recall-title">
          <input
            id="recall-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormField>
        <FormField label="Ubicación" htmlFor="recall-loc" optional>
          <input
            id="recall-loc"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ciudad, institución, espacio conceptual…"
          />
        </FormField>
        <FormField label="Clasificación" htmlFor="recall-class">
          <ResearchSelect
            id="recall-class"
            value={classification}
            onValueChange={(v) =>
              setClassification(v as RecallClassification)
            }
            options={CLASSIFICATION_OPTIONS}
            aria-label="Clasificación del recuerdo"
          />
        </FormField>
        <FormField label="Año" htmlFor="recall-year">
          <input
            id="recall-year"
            value={yearText}
            onChange={(e) => setYearText(e.target.value)}
            inputMode="numeric"
            required
          />
        </FormField>
        <label className="research-field research-field--checkbox" htmlFor="recall-bce">
          <input
            id="recall-bce"
            type="checkbox"
            checked={isBce}
            onChange={(e) => setIsBce(e.target.checked)}
          />
          Antes de Cristo (a.C.)
        </label>
        <FormField label="Mes" htmlFor="recall-month" optional>
          <input
            id="recall-month"
            value={monthText}
            onChange={(e) => setMonthText(e.target.value)}
            inputMode="numeric"
            placeholder="1–12"
          />
        </FormField>
        <FormField label="Día" htmlFor="recall-day" optional>
          <input
            id="recall-day"
            value={dayText}
            onChange={(e) => setDayText(e.target.value)}
            inputMode="numeric"
            placeholder="1–31"
          />
        </FormField>
        <div className="research-drawer__section">
          <p className="research-drawer__section-title">Narrativa</p>
          <MarkdownResearchEditor
            id={`recall-desc-${activeRecall.id}`}
            title="Descripción"
            subtitle="Qué ocurrió"
            guidingQuestion="¿Qué rastro deja este acontecimiento en la emergencia del problema?"
            value={description}
            onChange={setDescription}
          />
        </div>
        {error ? <p className="form-error">{error}</p> : null}
      </form>

      <RecallRelationCarousel
        label="Líneas conectadas"
        cards={relationCards}
        emptyHint="Solo está en su línea hogar. Conecta otras líneas para un colapso."
        actions={
          <button
            type="button"
            className="ghost"
            disabled={relationPending}
            onClick={onRequestCollapse}
          >
            Agregar línea
          </button>
        }
      />

      <section>
        <h3>Momentos</h3>
        <ul className="timelines__moments">
          {moments.map((moment) => (
            <li key={moment.id}>
              <strong>{moment.title}</strong>
              <p>{moment.content_markdown}</p>
              <button
                type="button"
                className="ghost"
                onClick={() => handleDeleteMoment(moment.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleAddMoment}>
          <FormField label="Nuevo momento" htmlFor="moment-title">
            <input
              id="moment-title"
              value={momentTitle}
              onChange={(e) => setMomentTitle(e.target.value)}
              placeholder="Título"
            />
          </FormField>
          <textarea
            value={momentContent}
            onChange={(e) => setMomentContent(e.target.value)}
            rows={3}
            placeholder="Contenido Markdown"
          />
          <button type="submit" className="ghost">
            <PlusIcon size="sm" title="" aria-hidden />
            Añadir momento
          </button>
        </form>
      </section>
    </ResearchDrawer>
  )
}
