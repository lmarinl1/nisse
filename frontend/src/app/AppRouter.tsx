import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../features/identity/AuthContext'
import { AuthScreen } from '../features/identity/AuthScreen'
import { StudyHome } from '../features/study/StudyHome'
import { ResearchSessionCanvas } from '../features/workspace/ResearchSessionCanvas'
import { StudyWorkspace } from '../features/workspace/StudyWorkspace'
import { DEFAULT_RESEARCH_SESSION } from '../features/workspace/researchSessions'
import { DiagnosticsPage } from '../routes/DiagnosticsPage'
import { RequireAuth } from '../routes/RequireAuth'

export function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthScreen mode="login" />} />
          <Route path="/register" element={<AuthScreen mode="register" />} />
          <Route path="/diagnostics" element={<DiagnosticsPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<StudyHome />} />
            <Route path="/studies/:studyId" element={<StudyWorkspace />}>
              <Route
                index
                element={<Navigate to={DEFAULT_RESEARCH_SESSION} replace />}
              />
              <Route path=":session" element={<ResearchSessionCanvas />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
