import { useEffect, useState, type FormEvent } from 'react'
import {
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
import { RecallClassificationBadge } from './badges'
import {
  RECALL_CLASSIFICATION_LABELS,
  type RecallClassification,
} from './classifications'
import {
  formatTemporalDate,
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
  timelineId: _timelineId,
  recall,
  timelineNamesById,
  onClose,
  onSaved,
  onRequestCollapse,
}: Props) {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [classification, setClassification] =
    useState<RecallClassification>('verified')
  const [yearText, setYearText] = useState('')
  const [isBce, setIsBce] = useState(false)
  const [moments, setMoments] = useState<Moment[]>([])
  const [momentTitle, setMomentTitle] = useState('')
  const [momentContent, setMomentContent] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

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
    if (year == null || !title.trim() || !description.trim()) {
      setError('Nombre, fecha y descripción son obligatorios.')
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
        temporal_month: activeRecall.temporal_month,
        temporal_day: activeRecall.temporal_day,
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

  const connectedNames = activeRecall.timeline_ids.map(
    (id) => timelineNamesById[id] ?? id,
  )

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
          {activeRecall.is_collapse ? (
            <>
              <br />
              Este recuerdo conecta: {connectedNames.join(' · ')}
            </>
          ) : null}
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
            Conectar con otras líneas de tiempo
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
