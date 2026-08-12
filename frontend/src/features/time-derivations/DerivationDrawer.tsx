import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react'
import type {
  DerivationNode,
  DerivationNodeInput,
  DerivationNodePatch,
  DerivationRecallRef,
} from '../../shared/api/client'
import {
  FormField,
  ResearchChipSelector,
  ResearchDrawer,
  ResearchSelect,
} from '../../shared/ui'
import { MarkdownResearchEditor } from '../case-framework/MarkdownResearchEditor'
import { RecallRelationCarousel } from '../timelines/RecallRelationCarousel'
import { formatTemporalDate } from '../timelines/temporalFormat'
import { TypeMosaicPrompt } from './TypeMosaicPrompt'
import {
  derivationTypeChipOptions,
  resolveTypes,
  type MethodologicalDerivationType,
} from './taxonomy'

export type NeighborCard = {
  id: string
  name: string
  kind: 'root' | 'derivation'
  nature: 'parent' | 'child'
}

type Props = {
  open: boolean
  mode: 'create' | 'edit'
  node: DerivationNode | null
  recalls: DerivationRecallRef[]
  parents: NeighborCard[]
  children: NeighborCard[]
  onClose: () => void
  onCreate: (input: DerivationNodeInput) => Promise<void>
  onSave: (patch: DerivationNodePatch) => Promise<void>
  onDelete: () => Promise<void>
  onSelectNeighbor: (nodeId: string) => void
  onOpenRecall?: (recall: DerivationRecallRef) => void
}

const CHIP_OPTIONS = derivationTypeChipOptions()

export function DerivationDrawer({
  open,
  mode,
  node,
  recalls,
  parents,
  children,
  onClose,
  onCreate,
  onSave,
  onDelete,
  onSelectNeighbor,
  onOpenRecall,
}: Props) {
  const [step, setStep] = useState<1 | 2>(1)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [typeIds, setTypeIds] = useState<string[]>([])
  const [recallId, setRecallId] = useState('')
  const [recallQuery, setRecallQuery] = useState('')
  const [pickingRecall, setPickingRecall] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [tagDraft, setTagDraft] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (!open) {
      return
    }
    if (mode === 'create') {
      setStep(1)
      setName('')
      setDescription('')
      setTypeIds([])
      setRecallId('')
      setRecallQuery('')
      setPickingRecall(false)
      setTags([])
      setTagDraft('')
      setError(null)
      return
    }
    if (!node) {
      return
    }
    setStep(2)
    setName(node.name)
    setDescription(node.description_markdown ?? '')
    setTypeIds([
      ...(node.type_ids ?? node.derivation_types?.map((t) => t.id) ?? []),
    ])
    setRecallId(node.recall_id ?? '')
    setRecallQuery('')
    setPickingRecall(false)
    setTags([...(node.tags ?? [])])
    setTagDraft('')
    setError(null)
  }, [open, mode, node])

  const selectedTypes = useMemo((): MethodologicalDerivationType[] => {
    return resolveTypes(typeIds)
  }, [typeIds])

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

  const neighbors = useMemo(() => {
    return [
      ...parents.map((p) => ({ ...p, nature: 'parent' as const })),
      ...children.map((c) => ({ ...c, nature: 'child' as const })),
    ]
  }, [parents, children])

  const linkedRecall = useMemo(() => {
    if (!recallId) {
      return null
    }
    return recalls.find((r) => r.id === recallId) ?? null
  }, [recallId, recalls])

  if (!open || (mode === 'edit' && !node)) {
    return null
  }

  function requestClose() {
    const dirty =
      mode === 'create'
        ? Boolean(name.trim() || typeIds.length || description.trim() || tags.length)
        : true
    if (
      dirty &&
      mode === 'create' &&
      !window.confirm('¿Cerrar sin guardar esta derivación?')
    ) {
      return
    }
    onClose()
  }

  function addTagFromDraft() {
    let next = tagDraft.trim()
    if (next.endsWith(',')) {
      next = next.slice(0, -1).trim()
    }
    if (!next) {
      return
    }
    if (next.length > 32) {
      setError('Cada etiqueta admite máximo 32 caracteres.')
      return
    }
    const exists = tags.some((t) => t.toLowerCase() === next.toLowerCase())
    if (exists) {
      setTagDraft('')
      return
    }
    if (tags.length >= 20) {
      setError('Máximo 20 etiquetas por derivación.')
      return
    }
    setTags((prev) => [...prev, next])
    setTagDraft('')
    setError(null)
  }

  function onTagKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addTagFromDraft()
      return
    }
    if (event.key === 'Backspace' && !tagDraft && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1))
    }
  }

  function goNext() {
    if (!name.trim()) {
      setError('El nombre es obligatorio.')
      return
    }
    if (typeIds.length < 1) {
      setError('Selecciona al menos un tipo de deriva.')
      return
    }
    setError(null)
    setStep(2)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (step === 1) {
      goNext()
      return
    }
    if (!name.trim()) {
      setError('El nombre es obligatorio.')
      return
    }
    if (typeIds.length < 1) {
      setError('Selecciona al menos un tipo de deriva.')
      return
    }
    setPending(true)
    setError(null)
    try {
      if (mode === 'create') {
        await onCreate({
          name: name.trim(),
          description_markdown: description,
          type_ids: typeIds,
          recall_id: recallId || null,
          tags,
        })
      } else {
        await onSave({
          name: name.trim(),
          description_markdown: description,
          type_ids: typeIds,
          recall_id: recallId || null,
          tags,
        })
      }
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

  const drawerTitle =
    mode === 'create'
      ? step === 1
        ? 'Nueva derivación'
        : 'Completar derivación'
      : 'Derivación'

  return (
    <ResearchDrawer
      open={open}
      title={drawerTitle}
      onClose={requestClose}
      hint={
        step === 1 ? (
          <>Elige una forma de mirar y nombra la deriva antes de profundizar.</>
        ) : (
          <>
            Completa el contexto de la exploración.
            {mode === 'edit' && node?.recall_missing ? (
              <> El recuerdo relacionado ya no está disponible.</>
            ) : null}
          </>
        )
      }
      footer={
        step === 1 ? (
          <>
            <button
              type="button"
              className="ghost"
              disabled={pending}
              onClick={requestClose}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn-discovery btn-discovery--compact"
              disabled={pending}
              onClick={goNext}
            >
              Siguiente
            </button>
          </>
        ) : (
          <>
            {mode === 'edit' ? (
              <button
                type="button"
                className="ghost"
                disabled={pending}
                onClick={handleDelete}
              >
                Eliminar derivación
              </button>
            ) : (
              <button
                type="button"
                className="ghost"
                disabled={pending}
                onClick={() => setStep(1)}
              >
                Atrás
              </button>
            )}
            <button
              type="submit"
              form="derivation-drawer-form"
              className="btn-discovery btn-discovery--compact"
              disabled={pending}
            >
              {pending
                ? 'Guardando…'
                : mode === 'create'
                  ? 'Crear'
                  : 'Guardar'}
            </button>
          </>
        )
      }
    >
      <form id="derivation-drawer-form" onSubmit={handleSubmit}>
        {step === 1 ? (
          <>
            <div className="research-drawer__section">
              <p className="research-drawer__section-title">Identidad</p>
              <FormField label="Nombre de la deriva" htmlFor="derivation-name">
                <input
                  id="derivation-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                  required
                />
              </FormField>
            </div>

            <div className="research-drawer__section">
              <p className="research-drawer__section-title">Tipos de deriva</p>
              <ResearchChipSelector
                aria-label="Tipos de deriva"
                options={CHIP_OPTIONS}
                value={typeIds}
                onChange={setTypeIds}
              />
            </div>

            {selectedTypes.length > 0 ? (
              <div className="research-drawer__section">
                <p className="research-drawer__section-title">Lentes activas</p>
                <div className="td-type-mosaic">
                  {selectedTypes.map((t) => (
                    <article key={t.id} className="td-type-mosaic__card">
                      <p className="td-type-mosaic__reference">{t.reference}</p>
                      <p className="td-type-mosaic__name">{t.name}</p>
                      <TypeMosaicPrompt type={t} />
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <div className="research-drawer__section td-step-summary">
              <div className="td-step-summary__head">
                <div>
                  <p className="td-step-summary__eyebrow">Nombre</p>
                  <p className="td-step-summary__title">{name.trim() || '—'}</p>
                </div>
                <button
                  type="button"
                  className="ghost"
                  onClick={() => setStep(1)}
                >
                  Editar
                </button>
              </div>
              <div className="td-step-summary__types" aria-label="Tipos">
                {selectedTypes.map((t) => (
                  <span key={t.id} className="td-type-chip td-type-chip--static">
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="research-drawer__section">
              <p className="research-drawer__section-title">Descripción</p>
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
              <p className="research-drawer__section-title">Etiquetas</p>
              <div
                className="td-tags td-tags--chip-input"
                onClick={(e) => {
                  const input = (e.currentTarget as HTMLElement).querySelector(
                    'input',
                  )
                  input?.focus()
                }}
              >
                {tags.map((tag) => (
                  <span key={tag} className="td-tag">
                    {tag}
                    <button
                      type="button"
                      className="td-tag__remove"
                      aria-label={`Quitar etiqueta ${tag}`}
                      onClick={() =>
                        setTags((prev) => prev.filter((t) => t !== tag))
                      }
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  className="td-tags__input"
                  value={tagDraft}
                  onChange={(e) => setTagDraft(e.target.value)}
                  onKeyDown={onTagKeyDown}
                  onBlur={addTagFromDraft}
                  placeholder={tags.length ? '' : 'Escribe y pulsa Enter…'}
                  aria-label="Nueva etiqueta"
                  autoComplete="off"
                />
              </div>
            </div>

            <RecallRelationCarousel
              label="Vínculo temporal"
              cards={
                linkedRecall
                  ? [
                      {
                        id: linkedRecall.id,
                        title: linkedRecall.title,
                        timelineName: linkedRecall.timeline_name,
                        temporalLabel: formatTemporalDate(
                          linkedRecall.temporal_year,
                          linkedRecall.temporal_month,
                          linkedRecall.temporal_day,
                        ),
                        onOpen: onOpenRecall
                          ? () => onOpenRecall(linkedRecall)
                          : undefined,
                        onRemove: () => {
                          setRecallId('')
                          setPickingRecall(false)
                        },
                      },
                    ]
                  : mode === 'edit' && node?.recall_missing && recallId
                    ? [
                        {
                          id: recallId,
                          title: 'Recuerdo no disponible',
                          timelineName: 'El vínculo apunta a un recuerdo eliminado',
                          badge: 'Ausente',
                          onRemove: () => {
                            setRecallId('')
                            setPickingRecall(false)
                          },
                        },
                      ]
                    : []
              }
              emptyHint="Sin recuerdo relacionado. Agrega uno para anclar la deriva en el tiempo."
              actions={
                !linkedRecall ? (
                  <button
                    type="button"
                    className="ghost"
                    onClick={() => setPickingRecall((v) => !v)}
                  >
                    {pickingRecall ? 'Cancelar' : 'Agregar recuerdo'}
                  </button>
                ) : null
              }
            />

            {pickingRecall && !linkedRecall ? (
              <div className="research-drawer__section">
                <FormField
                  label="Buscar recuerdo"
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
                    value="__none__"
                    onValueChange={(v) => {
                      if (v === '__none__') {
                        return
                      }
                      setRecallId(v)
                      setPickingRecall(false)
                      setRecallQuery('')
                    }}
                    options={[
                      { value: '__none__', label: 'Elegir recuerdo…' },
                      ...filteredRecalls.map((r) => ({
                        value: r.id,
                        label: `${r.title} · ${r.temporal_year} · Línea: ${r.timeline_name}`,
                      })),
                    ]}
                  />
                </FormField>
              </div>
            ) : null}

            {mode === 'edit' ? (
              <div className="research-drawer__section">
                <p className="research-drawer__section-title">Vecinos del grafo</p>
                {neighbors.length === 0 ? (
                  <p className="td-carousel__empty">
                    Sin padres ni hijos conectados todavía.
                  </p>
                ) : (
                  <div className="td-carousel" role="list">
                    {neighbors.map((item) => (
                      <button
                        key={`${item.nature}-${item.id}`}
                        type="button"
                        className={[
                          'td-carousel-card',
                          item.nature === 'parent'
                            ? 'td-carousel-card--parent'
                            : 'td-carousel-card--child',
                        ].join(' ')}
                        role="listitem"
                        data-nature={item.nature}
                        onClick={() => onSelectNeighbor(item.id)}
                      >
                        <p className="td-carousel-card__eyebrow">
                          {item.nature === 'parent' ? 'Padre' : 'Hijo'}
                        </p>
                        <p className="td-carousel-card__name">{item.name}</p>
                        <p className="td-carousel-card__meta">
                          {item.kind === 'root'
                            ? 'Objeto de estudio'
                            : 'Derivación'}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </>
        )}

        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}
      </form>
    </ResearchDrawer>
  )
}
