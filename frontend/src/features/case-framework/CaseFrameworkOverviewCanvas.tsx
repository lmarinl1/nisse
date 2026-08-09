import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  getCaseFramework,
  type CaseFramework,
  type CaseFrameworkProgressStatus,
} from '../../shared/api/client'
import { brandAssetPaths } from '../../shared/brand'
import { CloseIcon } from '../../shared/icons'
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

  useEffect(() => {
    if (!drawer) {
      return
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDrawer(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawer])

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
      <header className="case-framework__hero-header case-framework__hero-header--overview">
        <div className="case-framework__hero-brand">
          <span
            className="nisse-mark nisse-mark--discovery nisse-mark--sm case-framework__mark"
            style={
              {
                ['--nisse-mark-mask' as string]: `url(${brandAssetPaths['official-clean']})`,
              } as CSSProperties
            }
            aria-hidden
          />
          <div>
            <p className="eyebrow">Lectura integrada</p>
            <h2>Marco del objeto de estudio</h2>
            <p className="case-framework__purpose">
              La investigación no empieza con un objeto terminado. El objeto se
              construye mientras pensamos, conversamos, tensionamos y
              delimitamos.
            </p>
          </div>
        </div>
        <ol className="case-framework__tracking" aria-label="Progreso del Marco">
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
                <span className="case-framework__tracking-num">{config.number}</span>
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
      </header>

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

      {drawer ? (
        <>
          <button
            type="button"
            className="case-framework__drawer-backdrop"
            aria-label="Cerrar vista completa"
            onClick={() => setDrawer(null)}
          />
          <aside
            className="case-framework__drawer"
            role="dialog"
            aria-modal="true"
            aria-label={drawer.title}
          >
            <header className="case-framework__drawer-header">
              <h3>{drawer.title}</h3>
              <button
                type="button"
                className="case-framework__drawer-close"
                onClick={() => setDrawer(null)}
                aria-label="Cerrar"
              >
                <CloseIcon size="sm" title="Cerrar" />
              </button>
            </header>
            <div
              className="case-framework__drawer-body case-framework__md"
              dangerouslySetInnerHTML={{
                __html: renderMarkdownToHtml(drawer.markdown),
              }}
            />
          </aside>
        </>
      ) : null}
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
