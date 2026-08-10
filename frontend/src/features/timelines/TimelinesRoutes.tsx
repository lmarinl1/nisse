import { Navigate, useParams } from 'react-router-dom'
import { TimelinesOverviewCanvas } from './TimelinesOverviewCanvas'
import { TimelineCanvas } from './TimelineCanvas'
import { timelinesPath } from '../workspace/researchSessions'
import './timelines.css'
import '../case-framework/case-framework.css'

export function TimelinesOverviewRoute() {
  const { studyId } = useParams<{ studyId: string }>()
  if (!studyId) {
    return <Navigate to="/" replace />
  }
  return <TimelinesOverviewCanvas studyId={studyId} />
}

export function TimelineDetailRoute() {
  const { studyId, timelineId } = useParams<{
    studyId: string
    timelineId: string
  }>()
  if (!studyId) {
    return <Navigate to="/" replace />
  }
  if (!timelineId) {
    return <Navigate to={timelinesPath(studyId)} replace />
  }
  return <TimelineCanvas studyId={studyId} timelineId={timelineId} />
}

export function PriorKnowledgeRedirect() {
  const { studyId } = useParams<{ studyId: string }>()
  if (!studyId) {
    return <Navigate to="/" replace />
  }
  return <Navigate to={timelinesPath(studyId)} replace />
}
