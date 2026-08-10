import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getCaseFramework,
  patchCaseFrameworkSection,
} from '../../shared/api/client'
import { SessionCanvasHeader } from '../../shared/ui'
import {
  getCaseFrameworkSection,
  type CaseFrameworkFieldConfig,
  type CaseFrameworkSectionId,
} from './caseFrameworkSections'
import { MarkdownResearchEditor } from './MarkdownResearchEditor'
import './case-framework.css'

type SaveState = 'idle' | 'dirty' | 'saving' | 'saved' | 'error'

type TriadKey = 'not_started' | 'in_progress' | 'reviewed'

type CaseFrameworkSectionCanvasProps = {
  sectionId: CaseFrameworkSectionId
}

export function CaseFrameworkSectionCanvas({
  sectionId,
}: CaseFrameworkSectionCanvasProps) {
  const { studyId } = useParams<{ studyId: string }>()
  const config = getCaseFrameworkSection(sectionId)
  const [fields, setFields] = useState<Record<string, string>>({})
  const [ready, setReady] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [saveError, setSaveError] = useState<string | null>(null)
  const pendingRef = useRef<{
    studyId: string
    sectionId: CaseFrameworkSectionId
    fields: Record<string, string>
    reviewed: boolean
  } | null>(null)
  const timerRef = useRef<number | null>(null)
  const fieldsRef = useRef(fields)

  fieldsRef.current = fields

  useEffect(() => {
    if (!studyId || !config) {
      return
    }
    let cancelled = false
    setReady(false)
    setLoadError(null)
    setSaveState('idle')
    pendingRef.current = null
    getCaseFramework(studyId)
      .then((framework) => {
        if (cancelled) {
          return
        }
        const section = framework.sections.find(
          (item) => item.section_type === sectionId,
        )
        const next: Record<string, string> = {}
        for (const field of config.fields) {
          next[field.key] = section?.fields?.[field.key] ?? ''
        }
        setFields(next)
        fieldsRef.current = next
        setReady(true)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setLoadError(
            err instanceof Error
              ? err.message
              : 'No pudimos cargar esta sección del Marco.',
          )
        }
      })
    return () => {
      cancelled = true
    }
  }, [studyId, sectionId, config])

  const flush = useEffectEvent(async () => {
    const payload = pendingRef.current
    if (!payload) {
      return
    }
    pendingRef.current = null
    setSaveState('saving')
    setSaveError(null)
    try {
      await patchCaseFrameworkSection(payload.studyId, payload.sectionId, {
        fields: payload.fields,
        reviewed: payload.reviewed,
      })
      if (payload.sectionId === sectionId) {
        setSaveState('saved')
      }
    } catch (err: unknown) {
      pendingRef.current = payload
      setSaveState('error')
      setSaveError(
        err instanceof Error ? err.message : 'No se pudo guardar. Reintenta.',
      )
    }
  })

  const scheduleSave = useEffectEvent(() => {
    if (!studyId || !config) {
      return
    }
    const nextFields = { ...fieldsRef.current }
    const complete = isSectionComplete(nextFields, config.fields)
    pendingRef.current = {
      studyId,
      sectionId,
      fields: nextFields,
      reviewed: complete,
    }
    setSaveState('dirty')
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
    }
    timerRef.current = window.setTimeout(() => {
      void flush()
    }, 800)
  })

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
      if (pendingRef.current) {
        void flush()
      }
    }
  }, [flush, sectionId, studyId])

  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (pendingRef.current || saveState === 'dirty' || saveState === 'saving') {
        event.preventDefault()
      }
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [saveState])

  if (!config) {
    return null
  }

  if (loadError) {
    return (
      <div className="case-framework case-framework--message" role="alert">
        <p>{loadError}</p>
      </div>
    )
  }

  if (!studyId || !ready) {
    return (
      <div className="case-framework case-framework--message">
        <p className="loading-narrative">Preparando el instrumento…</p>
      </div>
    )
  }

  const triadKey = triadKeyFromFields(fields, config.fields)

  return (
    <div
      className="case-framework case-framework--section"
      role="region"
      aria-label={config.label}
    >
      <SessionCanvasHeader
        variant="section"
        eyebrow={`Marco del objeto de estudio · ${config.number}`}
        title={config.label}
        purpose={config.purpose}
        banner={
          saveState === 'saved' ? (
            <span className="case-framework__saved-flag">Guardado</span>
          ) : null
        }
        aside={
          <>
            <ul
              className="case-framework__status-triad"
              aria-label="Estado de la etapa"
            >
              {STATUS_TRIAD.map((item) => {
                const active = triadKey === item.key
                return (
                  <li
                    key={item.key}
                    className={[
                      'case-framework__status-triad-item',
                      active
                        ? `case-framework__status-triad-item--active case-framework__status-triad-item--${item.key}`
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-current={active ? 'true' : undefined}
                  >
                    {item.label}
                  </li>
                )
              })}
            </ul>
            {saveError ? (
              <button
                type="button"
                className="case-framework__retry"
                onClick={() => void flush()}
              >
                Reintentar guardado
              </button>
            ) : null}
            {saveState === 'saving' || saveState === 'dirty' ? (
              <span className="case-framework__save-hint" aria-live="polite">
                {saveState === 'saving' ? 'Guardando…' : 'Cambios pendientes…'}
              </span>
            ) : null}
          </>
        }
      />

      <div className="case-framework__fields case-framework__fields--mosaic">
        {config.fields.map((field) => {
          const fieldId = `${sectionId}-${field.key}`
          return (
            <section key={field.key} className="case-framework__field">
              <MarkdownResearchEditor
                id={fieldId}
                title={field.title}
                subtitle={field.description}
                guidingQuestion={field.guidingQuestion}
                value={fields[field.key] ?? ''}
                aria-label={field.title}
                onChange={(nextValue) => {
                  const updated = {
                    ...fieldsRef.current,
                    [field.key]: nextValue,
                  }
                  fieldsRef.current = updated
                  setFields(updated)
                  scheduleSave()
                }}
              />
            </section>
          )
        })}
      </div>
    </div>
  )
}

const STATUS_TRIAD = [
  { key: 'not_started' as const, label: 'Sin comenzar' },
  { key: 'in_progress' as const, label: 'En construcción' },
  { key: 'reviewed' as const, label: 'Terminado' },
]

function isSectionComplete(
  fields: Record<string, string>,
  fieldConfigs: readonly CaseFrameworkFieldConfig[],
): boolean {
  return fieldConfigs.every((field) => (fields[field.key] ?? '').trim().length > 0)
}

function triadKeyFromFields(
  fields: Record<string, string>,
  fieldConfigs: readonly CaseFrameworkFieldConfig[],
): TriadKey {
  let filled = 0
  for (const field of fieldConfigs) {
    if ((fields[field.key] ?? '').trim()) {
      filled += 1
    }
  }
  if (filled === 0) {
    return 'not_started'
  }
  if (filled < fieldConfigs.length) {
    return 'in_progress'
  }
  return 'reviewed'
}
