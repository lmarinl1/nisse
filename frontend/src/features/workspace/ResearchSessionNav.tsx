import { useEffect, useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import {
  getCaseFramework,
  type CaseFrameworkProgressStatus,
} from '../../shared/api/client'
import { ChevronDownIcon } from '../../shared/icons'
import { CASE_FRAMEWORK_SECTIONS } from '../case-framework/caseFrameworkSections'
import '../case-framework/case-framework.css'
import {
  caseFrameworkPath,
  caseFrameworkSectionPath,
  RESEARCH_SESSIONS,
  studySessionPath,
  type ResearchSessionId,
} from './researchSessions'

type ResearchSessionNavProps = {
  studyId: string
}

export function ResearchSessionNav({ studyId }: ResearchSessionNavProps) {
  const location = useLocation()
  const { session: activeSession, section: activeSection } = useParams<{
    session?: string
    section?: string
  }>()
  const underCaseFramework = location.pathname.includes(
    `/studies/${studyId}/case-framework`,
  )
  const [manualExpand, setManualExpand] = useState(false)
  const [forceCollapsed, setForceCollapsed] = useState(false)
  const [progress, setProgress] = useState<
    Partial<Record<string, CaseFrameworkProgressStatus>>
  >({})

  const expanded = underCaseFramework ? !forceCollapsed : manualExpand

  useEffect(() => {
    if (!underCaseFramework) {
      setManualExpand(false)
      setForceCollapsed(false)
    }
  }, [underCaseFramework])

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
                      setForceCollapsed(false)
                      setManualExpand(true)
                    }}
                    aria-expanded={expanded}
                  >
                    <Icon size="nav" title={label} />
                    <span className="research-session-nav__label">{label}</span>
                  </NavLink>
                  <button
                    type="button"
                    className={[
                      'research-session-nav__chevron',
                      expanded
                        ? 'research-session-nav__chevron--open'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-expanded={expanded}
                    aria-label={
                      expanded
                        ? 'Ocultar etapas del Marco'
                        : 'Mostrar etapas del Marco'
                    }
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      if (underCaseFramework) {
                        setForceCollapsed((value) => !value)
                        return
                      }
                      setManualExpand((value) => !value)
                    }}
                  >
                    <ChevronDownIcon size="sm" title="" aria-hidden />
                  </button>
                </div>
                {expanded ? (
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
                onClick={() => setManualExpand(false)}
              >
                <Icon size="nav" title={label} />
                <span className="research-session-nav__label">{label}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
      {underCaseFramework || activeSession ? (
        <p className="research-session-nav__current" aria-live="polite">
          <span className="research-session-nav__current-label">Sesión</span>
          {activeSection
            ? (CASE_FRAMEWORK_SECTIONS.find((s) => s.id === activeSection)
                ?.label ?? activeSection)
            : underCaseFramework
              ? 'Marco del objeto de estudio'
              : (RESEARCH_SESSIONS.find(
                  (s) => s.id === (activeSession as ResearchSessionId),
                )?.label ?? activeSession)}
        </p>
      ) : null}
    </nav>
  )
}
