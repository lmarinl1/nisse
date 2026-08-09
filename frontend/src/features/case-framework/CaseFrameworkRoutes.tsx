import { Navigate, useParams } from 'react-router-dom'
import {
  isCaseFrameworkSectionId,
} from './caseFrameworkSections'
import { CaseFrameworkOverviewCanvas } from './CaseFrameworkOverviewCanvas'
import { CaseFrameworkSectionCanvas } from './CaseFrameworkSectionCanvas'
import { caseFrameworkPath } from '../workspace/researchSessions'

export function CaseFrameworkOverviewRoute() {
  return <CaseFrameworkOverviewCanvas />
}

export function CaseFrameworkSectionRoute() {
  const { studyId, section } = useParams<{
    studyId?: string
    section?: string
  }>()
  if (!studyId || !isCaseFrameworkSectionId(section)) {
    return (
      <Navigate
        to={studyId ? caseFrameworkPath(studyId) : '/'}
        replace
      />
    )
  }
  return <CaseFrameworkSectionCanvas sectionId={section} />
}
