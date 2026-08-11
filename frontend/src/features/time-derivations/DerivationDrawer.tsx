import { useEffect, useMemo, useState, type FormEvent } from 'react'
import type {
  DerivationNode,
  DerivationNodePatch,
  DerivationRecallRef,
} from '../../shared/api/client'
import {
  FormField,
  ResearchDrawer,
  ResearchSelect,
} from '../../shared/ui'
import { MarkdownResearchEditor } from '../case-framework/MarkdownResearchEditor'
import {
  DERIVATION_TYPE_OPTIONS,
  IMPACT_OPTIONS,
  type DerivationType,
  type ImpactValue,
} from './taxonomy'

type Props = {
  open: boolean
  node: DerivationNode | null
  recalls: DerivationRecallRef[]
  onClose: () => void
  onSave: (patch: DerivationNodePatch) => Promise<void>
  onDelete: () => Promise<void>
}

export function DerivationDrawer({
  open,
  node,
  recalls,
  onClose,
  onSave,
  onDelete,
}: Props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [derivationType, setDerivationType] =
    useState<DerivationType>('other')
  const [impact, setImpact] = useState<ImpactValue>('medium')
  const [isSpeculative, setIsSpeculative] = useState(false)
  const [recallId, setRecallId] = useState('')
  const [recallQuery, setRecallQuery] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (!open || !node) {
      return
    }
    setName(node.name)
    setDescription(node.description_markdown ?? '')
    setDerivationType((node.derivation_type as DerivationType) || 'other')
    setImpact((node.impact as ImpactValue) || 'medium')
    setIsSpeculative(Boolean(node.is_speculative))
    setRecallId(node.recall_id ?? '')
    setRecallQuery('')
    setError(null)
  }, [open, node])

  const filteredRecalls = useMemo(() => {
    const q = recallQuery.trim().toLowerCase()
    if (!q) {
      return recalls
    }
    return recalls.filter((r) => {
      const hay = `${r.title} ${r.temporal_year} ${r.timeline_name}`.toLowerCase()
      return hay.includes(q)
    })
  }, [recalls, recallQuery])

  if (!open || !node) {
    return null
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!name.trim()) {
      setError('El nombre es obligatorio.')
      return
    }
    setPending(true)
    setError(null)
    try {
      await onSave({
        name: name.trim(),
        description_markdown: description,
        derivation_type: derivationType,
        impact,
        is_speculative: isSpeculative,
        recall_id: recallId || null,
      })
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No pudimos guardar la derivación.',
      )
    } finally {
      setPending(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm('¿Eliminar esta derivación y sus conexiones?')) {
      return
    }
    setPending(true)
    setError(null)
    try {
      await onDelete()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No pudimos eliminar la derivación.',
      )
      setPending(false)
    }
  }

  return (
    <ResearchDrawer
      open={open}
      title="Derivación"
      onClose={onClose}
      hint={
        <>
          Explora hacia dónde puede derivar esta pista. El impacto es
          subjetivo; la especulación es un estado legítimo de la
          investigación.
          {node.recall_missing ? (
            <>
              {' '}
              El recuerdo relacionado ya no está disponible.
            </>
          ) : null}
        </>
      }
      footer={
        <>
          <button
            type="button"
            className="ghost"
            disabled={pending}
            onClick={handleDelete}
          >
            Eliminar derivación
          </button>
          <button
            type="submit"
            form="derivation-drawer-form"
            className="btn-discovery btn-discovery--compact"
            disabled={pending}
          >
            {pending ? 'Guardando…' : 'Guardar'}
          </button>
        </>
      }
    >
      <form id="derivation-drawer-form" onSubmit={handleSubmit}>
        <div className="research-drawer__section">
          <p className="research-drawer__section-title">Identidad</p>
          <FormField label="Nombre" htmlFor="derivation-name">
            <input
              id="derivation-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
              required
            />
          </FormField>
          <FormField
            label="Descripción"
            htmlFor="derivation-description"
            optional
          >
            <MarkdownResearchEditor
              id="derivation-description"
              value={description}
              onChange={setDescription}
              title="Descripción"
              subtitle="Markdown"
              guidingQuestion="¿Por qué resulta relevante esta deriva?"
              placeholder="Escribe la descripción…"
            />
          </FormField>
        </div>
        <div className="research-drawer__section">
          <p className="research-drawer__section-title">Clasificación</p>
          <FormField label="Tipo de deriva" htmlFor="derivation-type">
            <ResearchSelect
              id="derivation-type"
              value={derivationType}
              onValueChange={(v) => setDerivationType(v as DerivationType)}
              options={DERIVATION_TYPE_OPTIONS}
            />
          </FormField>
          <FormField label="Impacto" htmlFor="derivation-impact">
            <ResearchSelect
              id="derivation-impact"
              value={impact}
              onValueChange={(v) => setImpact(v as ImpactValue)}
              options={IMPACT_OPTIONS}
            />
          </FormField>
          <FormField
            label="¿Parte de una especulación?"
            htmlFor="derivation-spec"
          >
            <ResearchSelect
              id="derivation-spec"
              value={isSpeculative ? 'yes' : 'no'}
              onValueChange={(v) => setIsSpeculative(v === 'yes')}
              options={[
                { value: 'no', label: 'No' },
                { value: 'yes', label: 'Sí' },
              ]}
            />
          </FormField>
        </div>
        <div className="research-drawer__section">
          <p className="research-drawer__section-title">Vínculo temporal</p>
          <FormField
            label="Relacionar con un recuerdo"
            htmlFor="derivation-recall-q"
            optional
          >
            <input
              id="derivation-recall-q"
              value={recallQuery}
              onChange={(e) => setRecallQuery(e.target.value)}
              placeholder="Buscar por nombre, fecha o línea…"
              autoComplete="off"
            />
            <ResearchSelect
              id="derivation-recall"
              value={recallId || '__none__'}
              onValueChange={(v) => setRecallId(v === '__none__' ? '' : v)}
              options={[
                { value: '__none__', label: 'Sin recuerdo relacionado' },
                ...filteredRecalls.map((r) => ({
                  value: r.id,
                  label: `${r.title} · ${r.temporal_year} · Línea: ${r.timeline_name}`,
                })),
              ]}
            />
          </FormField>
        </div>
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}
      </form>
    </ResearchDrawer>
  )
}
