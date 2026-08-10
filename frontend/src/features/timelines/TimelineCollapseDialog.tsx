import { useEffect, useState, type FormEvent } from 'react'
import {
  listTimelines,
  type Timeline,
} from '../../shared/api/client'
import { FormField, ResearchDrawer } from '../../shared/ui'

type Props = {
  open: boolean
  studyId: string
  currentTimelineId: string
  connectedIds: string[]
  onClose: () => void
  onConfirm: (timelineIds: string[]) => Promise<void>
}

export function TimelineCollapseDialog({
  open,
  studyId,
  currentTimelineId,
  connectedIds,
  onClose,
  onConfirm,
}: Props) {
  const [timelines, setTimelines] = useState<Timeline[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (!open) {
      return
    }
    listTimelines(studyId, 'active')
      .then((data) => {
        setTimelines(data)
        setSelected(
          new Set([currentTimelineId, ...connectedIds.filter(Boolean)]),
        )
        setError(null)
      })
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : 'No pudimos cargar las líneas.',
        )
      })
  }, [open, studyId, currentTimelineId, connectedIds])

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (id === currentTimelineId) {
        next.add(id)
        return next
      }
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (selected.size < 2) {
      setError('Selecciona al menos dos líneas de tiempo.')
      return
    }
    setPending(true)
    setError(null)
    try {
      await onConfirm([...selected])
      onClose()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'No pudimos crear el colapso.',
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <ResearchDrawer
      open={open}
      title="Conectar con otras líneas"
      onClose={onClose}
      hint="Un colapso registra el mismo recuerdo en varias líneas sin duplicar su identidad."
      footer={
        <button
          type="submit"
          form="collapse-form"
          className="btn-discovery btn-discovery--compact"
          disabled={pending}
        >
          {pending ? 'Conectando…' : 'Crear colapso'}
        </button>
      }
    >
      <form id="collapse-form" onSubmit={handleSubmit}>
        <FormField label="Líneas participantes">
          <ul className="timelines__collapse-list">
            {timelines.map((timeline) => (
              <li key={timeline.id}>
                <label className="research-field research-field--checkbox">
                  <input
                    type="checkbox"
                    checked={selected.has(timeline.id)}
                    disabled={timeline.id === currentTimelineId}
                    onChange={() => toggle(timeline.id)}
                  />
                  {timeline.name}
                  {timeline.id === currentTimelineId ? ' (actual)' : ''}
                </label>
              </li>
            ))}
          </ul>
        </FormField>
        {error ? <p className="form-error">{error}</p> : null}
      </form>
    </ResearchDrawer>
  )
}
