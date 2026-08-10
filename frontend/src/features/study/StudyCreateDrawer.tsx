import { useState, type FormEvent } from 'react'
import type { StudyInput } from '../../shared/api/client'
import { FormField, ResearchDrawer } from '../../shared/ui'

type Props = {
  open: boolean
  title: string
  initial?: StudyInput
  submitLabel: string
  onClose: () => void
  onSubmit: (input: StudyInput) => Promise<void>
}

export function StudyCreateDrawer({
  open,
  title,
  initial,
  submitLabel,
  onClose,
  onSubmit,
}: Props) {
  const [name, setName] = useState(initial?.name ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setPending(true)
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
      })
      setName('')
      setDescription('')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No pudimos incorporar esto al laboratorio. Inténtalo de nuevo.',
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <ResearchDrawer
      open={open}
      title={title}
      onClose={onClose}
      hint="El nombre puede ser la pregunta misma. La descripción es contexto opcional para recordar el marco de la investigación."
      footer={
        <button
          type="submit"
          form="study-create-form"
          className="btn-discovery btn-discovery--compact"
          disabled={pending || !name.trim()}
        >
          {pending ? 'Preparando el Workspace…' : submitLabel}
        </button>
      }
    >
      <form id="study-create-form" onSubmit={handleSubmit}>
        <FormField label="Pregunta / nombre" htmlFor="study-name">
          <input
            id="study-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="¿Qué señales están transformando…?"
            required
            autoFocus
          />
        </FormField>
        <FormField label="Contexto" htmlFor="study-desc" optional>
          <textarea
            id="study-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Horizonte, actores o incertidumbre que quieres tener a la vista"
          />
        </FormField>
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}
      </form>
    </ResearchDrawer>
  )
}
