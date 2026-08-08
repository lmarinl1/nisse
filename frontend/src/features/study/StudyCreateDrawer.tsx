import { useState, type FormEvent } from 'react'
import type { StudyInput } from '../../shared/api/client'
import './study-drawer.css'

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

  if (!open) {
    return null
  }

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
    <aside className="study-drawer" aria-label={title}>
      <button
        type="button"
        className="study-drawer__backdrop"
        aria-label="Cerrar"
        onClick={onClose}
      />
      <div className="study-drawer__panel">
        <header>
          <h2>{title}</h2>
          <button type="button" className="ghost" onClick={onClose}>
            Cerrar
          </button>
        </header>
        <p className="hint">
          El nombre puede ser la pregunta misma. La descripción es contexto
          opcional para recordar el marco de la investigación.
        </p>
        <form onSubmit={handleSubmit}>
          <label>
            Pregunta / nombre
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="¿Qué señales están transformando…?"
              required
              autoFocus
            />
          </label>
          <label>
            Contexto <span className="optional">(opcional)</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Horizonte, actores o incertidumbre que quieres tener a la vista"
            />
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="btn-discovery"
            disabled={pending || !name.trim()}
          >
            {pending ? 'Preparando el Workspace…' : submitLabel}
          </button>
        </form>
      </div>
    </aside>
  )
}
