import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  getCaseFramework,
  type CaseFramework,
  type CaseFrameworkProgressStatus,
} from '../../shared/api/client'
import { ResearchDrawer, SessionCanvasHeader } from '../../shared/ui'
import { caseFrameworkSectionPath } from '../workspace/researchSessions'
import {
  CASE_FRAMEWORK_SECTIONS,
  PROGRESS_STATUS_LABELS,
  type CaseFrameworkFieldConfig,
} from './caseFrameworkSections'
import { renderMarkdownToHtml } from './markdown'
import './case-framework.css'

type DrawerState = {
  title: string
  markdown: string
} | null

export function CaseFrameworkOverviewCanvas() {
  const { studyId } = useParams<{ studyId: string }>()
  const [framework, setFramework] = useState<CaseFramework | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [drawer, setDrawer] = useState<DrawerState>(null)

  useEffect(() => {
    if (!studyId) {
      return
    }
    let cancelled = false
    getCaseFramework(studyId)
      .then((data) => {
        if (!cancelled) {
          setFramework(data)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'No pudimos abrir el Marco del objeto de estudio.',
          )
        }
      })
    return () => {
      cancelled = true
    }
  }, [studyId])

  if (error) {
    return (
      <div className="case-framework case-framework--message" role="alert">
        <p>{error}</p>
      </div>
    )
  }

  if (!studyId || !framework) {
    return (
      <div className="case-framework case-framework--message">
        <p className="loading-narrative">Reuniendo el recorrido del Marco…</p>
      </div>
    )
  }

  return (
    <div
      className={[
        'case-framework',
        'case-framework--overview',
        drawer ? 'case-framework--drawer-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      role="region"
      aria-label="Marco del objeto de estudio"
    >
      <SessionCanvasHeader
        eyebrow="Lectura integrada"
        title="Marco del objeto de estudio"
        purpose="La investigación no empieza con un objeto terminado. El objeto se construye mientras pensamos, conversamos, tensionamos y delimitamos."
        aside={
          <ol
            className="case-framework__tracking"
            aria-label="Progreso del Marco"
          >
            {CASE_FRAMEWORK_SECTIONS.map((config) => {
              const section = framework.sections.find(
                (item) => item.section_type === config.id,
              )
              const status: CaseFrameworkProgressStatus =
                section?.status ?? 'not_started'
              return (
                <li key={config.id} className="case-framework__tracking-item">
                  <span
                    className={`case-framework__tracking-dot case-framework__tracking-dot--${status}`}
                    aria-hidden
                  />
                  <span className="case-framework__tracking-num">
                    {config.number}
                  </span>
                  <span className="case-framework__tracking-label">
                    {config.label}
                  </span>
                  <span className="case-framework__tracking-status">
                    {PROGRESS_STATUS_LABELS[status]}
                  </span>
                </li>
              )
            })}
          </ol>
        }
      />

      <ol className="case-framework__spine">
        {CASE_FRAMEWORK_SECTIONS.map((config) => {
          const section = framework.sections.find(
            (item) => item.section_type === config.id,
          )
          const status: CaseFrameworkProgressStatus =
            section?.status ?? 'not_started'
          const fieldBlocks = config.fields.map((field) => ({
            field,
            markdown: section?.fields?.[field.key] ?? '',
          }))

          return (
            <li key={config.id} className="case-framework__spine-item">
              <div className="case-framework__spine-marker" aria-hidden>
                <span>{config.number}</span>
              </div>
              <article className="case-framework__overview-block">
                <header>
                  <div className="case-framework__overview-heading">
                    <config.Icon size="nav" title={config.label} />
                    <h3>{config.label}</h3>
                  </div>
                  <span
                    className={`case-framework__status-pill case-framework__status-pill--${status}`}
                  >
                    {PROGRESS_STATUS_LABELS[status]}
                  </span>
                </header>
                <p className="case-framework__purpose">{config.purpose}</p>
                <div className="case-framework__tile-grid">
                  {fieldBlocks.map(({ field, markdown }) => (
                    <OverviewFieldTile
                      key={field.key}
                      field={field}
                      markdown={markdown}
                      onExpand={() =>
                        setDrawer({ title: field.title, markdown })
                      }
                    />
                  ))}
                </div>
                <Link
                  className="case-framework__edit"
                  to={caseFrameworkSectionPath(studyId, config.id)}
                >
                  Editar esta etapa
                </Link>
              </article>
            </li>
          )
        })}
      </ol>

      <ResearchDrawer
        open={drawer !== null}
        title={drawer?.title ?? ''}
        onClose={() => setDrawer(null)}
      >
        {drawer ? (
          <div
            className="case-framework__md"
            dangerouslySetInnerHTML={{
              __html: renderMarkdownToHtml(drawer.markdown),
            }}
          />
        ) : null}
      </ResearchDrawer>
    </div>
  )
}

function OverviewFieldTile({
  field,
  markdown,
  onExpand,
}: {
  field: CaseFrameworkFieldConfig
  markdown: string
  onExpand: () => void
}) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [overflows, setOverflows] = useState(false)
  const trimmed = markdown.trim()

  useEffect(() => {
    const el = bodyRef.current
    if (!el || !trimmed) {
      setOverflows(false)
      return
    }
    const measure = () => {
      setOverflows(el.scrollHeight > el.clientHeight + 1)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [trimmed, markdown])

  return (
    <div
      className={[
        'case-framework__tile',
        trimmed ? '' : 'case-framework__tile--empty',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <h4>{field.title}</h4>
      {trimmed ? (
        <>
          <div
            ref={bodyRef}
            className="case-framework__tile-body case-framework__md"
            dangerouslySetInnerHTML={{
              __html: renderMarkdownToHtml(markdown),
            }}
          />
          {overflows ? (
            <button
              type="button"
              className="case-framework__tile-expand"
              onClick={onExpand}
            >
              Ver completo
            </button>
          ) : null}
        </>
      ) : (
        <p className="case-framework__tile-placeholder">Sin escritura aún</p>
      )}
    </div>
  )
}
