import { NavLink, useParams } from 'react-router-dom'
import {
  RESEARCH_SESSIONS,
  studySessionPath,
} from './researchSessions'

type ResearchSessionNavProps = {
  studyId: string
}

export function ResearchSessionNav({ studyId }: ResearchSessionNavProps) {
  const { session: activeSession } = useParams<{ session?: string }>()

  return (
    <nav
      className="research-session-nav"
      aria-label="Sesiones de investigación"
    >
      <p className="research-session-nav__eyebrow">Proceso</p>
      <ul className="research-session-nav__list">
        {RESEARCH_SESSIONS.map(({ id, label, Icon }) => (
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
            >
              <Icon size="nav" title={label} />
              <span className="research-session-nav__label">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      {activeSession ? (
        <p className="research-session-nav__current" aria-live="polite">
          <span className="research-session-nav__current-label">Sesión</span>
          {RESEARCH_SESSIONS.find((s) => s.id === activeSession)?.label ??
            activeSession}
        </p>
      ) : null}
    </nav>
  )
}
