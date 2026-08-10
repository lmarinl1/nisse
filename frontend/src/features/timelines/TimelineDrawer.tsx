import { useEffect, useState, type FormEvent } from 'react'
import type { Timeline, TimelineInput } from '../../shared/api/client'
import {
  FormField,
  ResearchDrawer,
  ResearchSelect,
} from '../../shared/ui'
import {
  TIMELINE_CLASSIFICATION_LABELS,
  type TimelineClassification,
} from './classifications'
import {
  formatYear,
  parseYearInput,
  yearToInput,
} from './temporalFormat'

type Props = {
  open: boolean
  mode: 'create' | 'edit'
  initial?: Timeline | null
  onClose: () => void
  onSubmit: (input: TimelineInput) => Promise<void>
}

const CLASSIFICATION_OPTIONS = (
  Object.keys(TIMELINE_CLASSIFICATION_LABELS) as TimelineClassification[]
).map((value) => ({
  value,
  label: TIMELINE_CLASSIFICATION_LABELS[value],
}))

export function TimelineDrawer({
  open,
  mode,
  initial,
  onClose,
  onSubmit,
}: Props) {
  const seed = initial ? yearToInput(initial.retrospective_year) : null
  const [name, setName] = useState(initial?.name ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [classification, setClassification] = useState<TimelineClassification>(
    initial?.classification ?? 'real',
  )
  const [yearText, setYearText] = useState(
    seed ? String(seed.year) : String(new Date().getFullYear()),
  )
  const [isBce, setIsBce] = useState(seed?.isBce ?? false)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (!open) {
      return
    }
    setName(initial?.name ?? '')
    setDescription(initial?.description ?? '')
    setClassification(initial?.classification ?? 'real')
    const next = initial
      ? yearToInput(initial.retrospective_year)
      : { year: new Date().getFullYear(), isBce: false }
    setYearText(String(next.year))
    setIsBce(next.isBce)
    setError(null)
  }, [open, initial])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    const year = parseYearInput(yearText, isBce)
    if (year == null) {
      setError('Indica un año válido (sin año 0).')
      return
    }
    if (!name.trim()) {
      setError('El nombre es obligatorio.')
      return
    }
    setPending(true)
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
        classification,
        retrospective_year: year,
      })
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No pudimos guardar la línea de tiempo.',
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <ResearchDrawer
      open={open}
      title={mode === 'create' ? 'Nueva línea de tiempo' : 'Editar línea'}
      onClose={onClose}
      hint={
        <>
          Define desde qué punto temporal comienza la línea. Puede ser
          histórico, presente o futuro; real o ficticio.
          {initial
            ? ` Retrospectiva actual: ${formatYear(initial.retrospective_year)}.`
            : null}
        </>
      }
      footer={
        <button
          type="submit"
          form="timeline-drawer-form"
          className="btn-discovery btn-discovery--compact"
          disabled={pending}
        >
          {pending ? 'Guardando…' : mode === 'create' ? 'Crear' : 'Guardar'}
        </button>
      }
    >
      <form id="timeline-drawer-form" onSubmit={handleSubmit}>
        <FormField label="Nombre" htmlFor="tl-name">
          <input
            id="tl-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
        </FormField>
        <FormField label="Descripción" htmlFor="tl-desc" optional>
          <textarea
            id="tl-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </FormField>
        <FormField label="Clasificación" htmlFor="tl-class">
          <ResearchSelect
            id="tl-class"
            value={classification}
            onValueChange={(v) =>
              setClassification(v as TimelineClassification)
            }
            options={CLASSIFICATION_OPTIONS}
            aria-label="Clasificación de la línea"
          />
        </FormField>
        <FormField label="Año de retrospectiva" htmlFor="tl-year">
          <input
            id="tl-year"
            value={yearText}
            onChange={(e) => setYearText(e.target.value)}
            inputMode="numeric"
            required
          />
        </FormField>
        <label className="research-field research-field--checkbox">
          <input
            type="checkbox"
            checked={isBce}
            onChange={(e) => setIsBce(e.target.checked)}
          />
          Antes de Cristo (a.C.)
        </label>
        {error ? <p className="form-error">{error}</p> : null}
      </form>
    </ResearchDrawer>
  )
}
