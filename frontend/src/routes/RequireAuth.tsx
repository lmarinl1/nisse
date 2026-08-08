import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../features/identity/AuthContext'

export function RequireAuth() {
  const { ready, profile } = useAuth()

  if (!ready) {
    return (
      <main className="boot">
        <p className="loading-narrative">Preparando el laboratorio…</p>
      </main>
    )
  }

  if (!profile) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
