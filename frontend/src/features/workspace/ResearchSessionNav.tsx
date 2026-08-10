import { useEffect, useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import {
  getCaseFramework,
  listTimelines,
  type CaseFrameworkProgressStatus,
  type Timeline,
} from '../../shared/api/client'
import { CalendarIcon, ChevronDownIcon } from '../../shared/icons'
import { CASE_FRAMEWORK_SECTIONS } from '../case-framework/caseFrameworkSections'
import '../case-framework/case-framework.css'
import {
  caseFrameworkPath,
  caseFrameworkSectionPath,
  RESEARCH_SESSIONS,
  studySessionPath,
  timelinePath,
  timelinesPath,
  type ResearchSessionId,
} from './researchSessions'

type ResearchSessionNavProps = {
  studyId: string
}

type ExpandedPrimary = 'case-framework' | 'timelines' | null

export function ResearchSessionNav({ studyId }: ResearchSessionNavProps) {
  const location = useLocation()
  const { session: activeSession, section: activeSection, timelineId } =
    useParams<{
      session?: string
      section?: string
      timelineId?: string
    }>()
  const underCaseFramework = location.pathname.includes(
    `/studies/${studyId}/case-framework`,
  )
  const underTimelines = location.pathname.includes(
    `/studies/${studyId}/timelines`,
  )

  const [manualExpand, setManualExpand] = useState<ExpandedPrimary>(null)
  const [forceCollapsed, setForceCollapsed] = useState<ExpandedPrimary>(null)
  const [progress, setProgress] = useState<
    Partial<Record<string, CaseFrameworkProgressStatus>>
  >({})
  const [activeTimelines, setActiveTimelines] = useState<Timeline[]>([])

  const caseExpanded =
    underCaseFramework && forceCollapsed !== 'case-framework'
      ? true
      : manualExpand === 'case-framework'
  const timelinesExpanded =
    underTimelines && forceCollapsed !== 'timelines'
      ? true
      : manualExpand === 'timelines'

  useEffect(() => {
    if (!underCaseFramework && !underTimelines) {
      setManualExpand(null)
      setForceCollapsed(null)
    } else if (underCaseFramework) {
      setManualExpand(null)
      setForceCollapsed((prev) => (prev === 'case-framework' ? prev : null))
    } else if (underTimelines) {
      setManualExpand(null)
      setForceCollapsed((prev) => (prev === 'timelines' ? prev : null))
    }
  }, [underCaseFramework, underTimelines])

  useEffect(() => {
    let cancelled = false
    getCaseFramework(studyId)
      .then((framework) => {
        if (cancelled) {
          return
        }
        const next: Partial<Record<string, CaseFrameworkProgressStatus>> = {}
        for (const section of framework.sections) {
          next[section.section_type] = section.status
        }
        setProgress(next)
      })
      .catch(() => {
        /* progress indicators are optional */
      })
    return () => {
      cancelled = true
    }
  }, [studyId, location.pathname])

  useEffect(() => {
    let cancelled = false
    listTimelines(studyId, 'active')
      .then((data) => {
        if (!cancelled) {
          setActiveTimelines(
            [...data].sort((a, b) => Number(b.is_default) - Number(a.is_default)),
          )
        }
      })
      .catch(() => {
        /* accordion children optional until loaded */
      })
    return () => {
      cancelled = true
    }
  }, [studyId, location.pathname])

  function currentLabel(): string {
    if (timelineId) {
      return (
        activeTimelines.find((t) => t.id === timelineId)?.name ?? 'Línea de tiempo'
      )
    }
    if (activeSection) {
      return (
        CASE_FRAMEWORK_SECTIONS.find((s) => s.id === activeSection)?.label ??
        activeSection
      )
    }
    if (underTimelines) {
      return 'Líneas de tiempo'
    }
    if (underCaseFramework) {
      return 'Marco del objeto de estudio'
    }
    return (
      RESEARCH_SESSIONS.find((s) => s.id === (activeSession as ResearchSessionId))
        ?.label ?? activeSession ?? ''
    )
  }

  return (
    <nav
      className="research-session-nav"
      aria-label="Sesiones de investigación"
    >
      <ul className="research-session-nav__list">
        {RESEARCH_SESSIONS.map(({ id, label, Icon }) => {
          if (id === 'case-framework') {
            return (
              <li key={id} className="research-session-nav__item--accordion">
                <div
                  className={[
                    'research-session-nav__primary',
                    underCaseFramework
                      ? 'research-session-nav__primary--active'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <NavLink
                    to={caseFrameworkPath(studyId)}
                    end
                    className={({ isActive }) =>
                      [
                        'research-session-nav__link',
                        'research-session-nav__link--primary',
                        isActive || underCaseFramework
                          ? 'research-session-nav__link--active'
                          : '',
                      ]
                        .filter(Boolean)
                        .join(' ')
                    }
                    onClick={() => {
                      setForceCollapsed(null)
                      setManualExpand('case-framework')
                    }}
                    aria-expanded={caseExpanded}
                  >
                    <Icon size="nav" title={label} />
                    <span className="research-session-nav__label">{label}</span>
                  </NavLink>
                  <button
                    type="button"
                    className={[
                      'research-session-nav__chevron',
                      caseExpanded
                        ? 'research-session-nav__chevron--open'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-expanded={caseExpanded}
                    aria-label={
                      caseExpanded
                        ? 'Ocultar etapas del Marco'
                        : 'Mostrar etapas del Marco'
                    }
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      if (underCaseFramework) {
                        setForceCollapsed((value) =>
                          value === 'case-framework' ? null : 'case-framework',
                        )
                        return
                      }
                      setManualExpand((value) =>
                        value === 'case-framework' ? null : 'case-framework',
                      )
                    }}
                  >
                    <ChevronDownIcon size="sm" title="" aria-hidden />
                  </button>
                </div>
                {caseExpanded ? (
                  <ul className="research-session-nav__children">
                    {CASE_FRAMEWORK_SECTIONS.map((section) => {
                      const status = progress[section.id] ?? 'not_started'
                      return (
                        <li key={section.id}>
                          <NavLink
                            to={caseFrameworkSectionPath(studyId, section.id)}
                            className={({ isActive }) =>
                              [
                                'research-session-nav__child-link',
                                isActive
                                  ? 'research-session-nav__child-link--active'
                                  : '',
                              ]
                                .filter(Boolean)
                                .join(' ')
                            }
                          >
                            <section.Icon size="sm" title={section.label} />
                            <span>{section.label}</span>
                            <span
                              className={`research-session-nav__progress research-session-nav__progress--${status}`}
                              title={status}
                              aria-hidden
                            />
                          </NavLink>
                        </li>
                      )
                    })}
                  </ul>
                ) : null}
              </li>
            )
          }

          if (id === 'timelines') {
            return (
              <li key={id} className="research-session-nav__item--accordion">
                <div
                  className={[
                    'research-session-nav__primary',
                    underTimelines
                      ? 'research-session-nav__primary--active'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <NavLink
                    to={timelinesPath(studyId)}
                    end
                    className={({ isActive }) =>
                      [
                        'research-session-nav__link',
                        'research-session-nav__link--primary',
                        isActive || underTimelines
                          ? 'research-session-nav__link--active'
                          : '',
                      ]
                        .filter(Boolean)
                        .join(' ')
                    }
                    onClick={() => {
                      setForceCollapsed(null)
                      setManualExpand('timelines')
                    }}
                    aria-expanded={timelinesExpanded}
                  >
                    <Icon size="nav" title={label} />
                    <span className="research-session-nav__label">{label}</span>
                  </NavLink>
                  <button
                    type="button"
                    className={[
                      'research-session-nav__chevron',
                      timelinesExpanded
                        ? 'research-session-nav__chevron--open'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-expanded={timelinesExpanded}
                    aria-label={
                      timelinesExpanded
                        ? 'Ocultar líneas de tiempo'
                        : 'Mostrar líneas de tiempo'
                    }
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      if (underTimelines) {
                        setForceCollapsed((value) =>
                          value === 'timelines' ? null : 'timelines',
                        )
                        return
                      }
                      setManualExpand((value) =>
                        value === 'timelines' ? null : 'timelines',
                      )
                    }}
                  >
                    <ChevronDownIcon size="sm" title="" aria-hidden />
                  </button>
                </div>
                {timelinesExpanded ? (
                  <ul className="research-session-nav__children">
                    {activeTimelines.map((timeline) => (
                      <li key={timeline.id}>
                        <NavLink
                          to={timelinePath(studyId, timeline.id)}
                          className={({ isActive }) =>
                            [
                              'research-session-nav__child-link',
                              isActive
                                ? 'research-session-nav__child-link--active'
                                : '',
                            ]
                              .filter(Boolean)
                              .join(' ')
                          }
                        >
                          <CalendarIcon size="sm" title={timeline.name} />
                          <span>{timeline.name}</span>
                          {timeline.is_default ? (
                            <span
                              className="research-session-nav__progress research-session-nav__progress--with_content"
                              title="Principal"
                              aria-hidden
                            />
                          ) : null}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            )
          }

          return (
            <li key={id}>
              <NavLink
                to={studySessionPath(studyId, id)}
                className={({ isActive }) =>
                  [
                    'research-session-nav__link',
                    isActive ? 'research-session-nav__link--active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
                onClick={() => {
                  setManualExpand(null)
                  setForceCollapsed(null)
                }}
              >
                <Icon size="nav" title={label} />
                <span className="research-session-nav__label">{label}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
      {underCaseFramework || underTimelines || activeSession ? (
        <p className="research-session-nav__current" aria-live="polite">
          <span className="research-session-nav__current-label">Sesión</span>
          {currentLabel()}
        </p>
      ) : null}
    </nav>
  )
}
