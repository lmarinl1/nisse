import type { ComponentType } from 'react'
import {
  CandidatesIcon,
  CheckIcon,
  DecisionIcon,
  DocumentIcon,
  EyeIcon,
  FilterIcon,
  FolderIcon,
  GraphIcon,
  TimelineIcon,
  type IconSize,
} from '../../shared/icons'

export type ResearchSessionId =
  | 'case-framework'
  | 'prior-knowledge'
  | 'evolution-forces'
  | 'critical-axes'
  | 'scenarios'
  | 'narratives'
  | 'validation'
  | 'evaluation'
  | 'monitoring'

type SessionIcon = ComponentType<{ size?: IconSize; title?: string }>

export type ResearchSession = {
  id: ResearchSessionId
  label: string
  Icon: SessionIcon
}

export const DEFAULT_RESEARCH_SESSION: ResearchSessionId = 'case-framework'

export const RESEARCH_SESSIONS: readonly ResearchSession[] = [
  {
    id: 'case-framework',
    label: 'Marco del objeto de estudio',
    Icon: DocumentIcon,
  },
  {
    id: 'prior-knowledge',
    label: 'Conocimiento previo',
    Icon: FolderIcon,
  },
  {
    id: 'evolution-forces',
    label: 'Fuerzas de evolución',
    Icon: TimelineIcon,
  },
  {
    id: 'critical-axes',
    label: 'Ejes críticos',
    Icon: DecisionIcon,
  },
  {
    id: 'scenarios',
    label: 'Escenarios',
    Icon: GraphIcon,
  },
  {
    id: 'narratives',
    label: 'Narrativas',
    Icon: CandidatesIcon,
  },
  {
    id: 'validation',
    label: 'Validación',
    Icon: CheckIcon,
  },
  {
    id: 'evaluation',
    label: 'Evaluación',
    Icon: FilterIcon,
  },
  {
    id: 'monitoring',
    label: 'Monitoreo',
    Icon: EyeIcon,
  },
] as const

const SESSION_IDS = new Set<string>(
  RESEARCH_SESSIONS.map((session) => session.id),
)

export function isResearchSessionId(
  value: string | undefined,
): value is ResearchSessionId {
  return value !== undefined && SESSION_IDS.has(value)
}

export function studySessionPath(
  studyId: string,
  session: ResearchSessionId = DEFAULT_RESEARCH_SESSION,
): string {
  return `/studies/${studyId}/${session}`
}

export function caseFrameworkPath(studyId: string): string {
  return `/studies/${studyId}/case-framework`
}

export function caseFrameworkSectionPath(
  studyId: string,
  section: string,
): string {
  return `/studies/${studyId}/case-framework/${section}`
}

export function getResearchSession(
  id: ResearchSessionId,
): ResearchSession | undefined {
  return RESEARCH_SESSIONS.find((session) => session.id === id)
}
