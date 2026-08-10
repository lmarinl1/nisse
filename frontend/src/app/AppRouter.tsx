import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import {
  CaseFrameworkOverviewRoute,
  CaseFrameworkSectionRoute,
} from '../features/case-framework/CaseFrameworkRoutes'
import { AuthProvider } from '../features/identity/AuthContext'
import { AuthScreen } from '../features/identity/AuthScreen'
import { SettingsScreen } from '../features/identity/SettingsScreen'
import { StudyHome } from '../features/study/StudyHome'
import {
  PriorKnowledgeRedirect,
  TimelineDetailRoute,
  TimelinesOverviewRoute,
} from '../features/timelines/TimelinesRoutes'
import { ResearchSessionCanvas } from '../features/workspace/ResearchSessionCanvas'
import { StudyWorkspace } from '../features/workspace/StudyWorkspace'
import { DEFAULT_RESEARCH_SESSION } from '../features/workspace/researchSessions'
import { DiagnosticsPage } from '../routes/DiagnosticsPage'
import { RequireAuth } from '../routes/RequireAuth'

const router = createBrowserRouter([
  { path: '/login', element: <AuthScreen mode="login" /> },
  { path: '/register', element: <AuthScreen mode="register" /> },
  { path: '/diagnostics', element: <DiagnosticsPage /> },
  {
    element: <RequireAuth />,
    children: [
      { path: '/', element: <StudyHome /> },
      { path: '/settings', element: <SettingsScreen /> },
      {
        path: '/studies/:studyId',
        element: <StudyWorkspace />,
        children: [
          {
            index: true,
            element: <Navigate to={DEFAULT_RESEARCH_SESSION} replace />,
          },
          {
            path: 'case-framework',
            element: <CaseFrameworkOverviewRoute />,
          },
          {
            path: 'case-framework/:section',
            element: <CaseFrameworkSectionRoute />,
          },
          { path: 'timelines', element: <TimelinesOverviewRoute /> },
          {
            path: 'timelines/:timelineId',
            element: <TimelineDetailRoute />,
          },
          {
            path: 'prior-knowledge',
            element: <PriorKnowledgeRedirect />,
          },
          { path: ':session', element: <ResearchSessionCanvas /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])

export function AppRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
