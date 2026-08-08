import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../features/identity/AuthContext'
import { AuthScreen } from '../features/identity/AuthScreen'
import { StudyHome } from '../features/study/StudyHome'
import { StudyWorkspace } from '../features/workspace/StudyWorkspace'
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
            <Route path="/studies/:studyId" element={<StudyWorkspace />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
