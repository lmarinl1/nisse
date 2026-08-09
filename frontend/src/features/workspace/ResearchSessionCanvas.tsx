import { Navigate, useParams } from 'react-router-dom'
import { WorkspaceCanvas } from '../canvas/WorkspaceCanvas'
import {
  DEFAULT_RESEARCH_SESSION,
  isResearchSessionId,
  studySessionPath,
} from './researchSessions'

export function ResearchSessionCanvas() {
  const { studyId, session } = useParams<{
    studyId: string
    session: string
  }>()

  if (!studyId) {
    return <Navigate to="/" replace />
  }

  if (!isResearchSessionId(session)) {
    return (
      <Navigate to={studySessionPath(studyId, DEFAULT_RESEARCH_SESSION)} replace />
    )
  }

  return (
    <div className="workspace__session" key={session} data-session={session}>
      <WorkspaceCanvas />
    </div>
  )
}
