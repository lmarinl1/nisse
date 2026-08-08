import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import './auth.css'

type Mode = 'login' | 'register'

export function AuthScreen({ mode }: { mode: Mode }) {
  const { profile, login, register, ready } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  if (ready && profile) {
    return <Navigate to="/" replace />
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setPending(true)
    try {
      if (mode === 'login') {
        await login(username.trim(), password)
      } else {
        await register(username.trim(), password)
      }
      navigate('/', { replace: true })
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No pudimos continuar. Revisa tus datos e inténtalo de nuevo.',
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <main className="auth-screen">
      <p className="brand">NISSE</p>
      <h1>
        {mode === 'login'
          ? 'Volver al laboratorio'
          : 'Preparar tu espacio de investigación'}
      </h1>
      <p className="lede">
        Speculative Research Workspace para Diseñadores de Futuros. Aquí se
        exploran preguntas, no se administran tareas.
      </p>
      <form className="auth-form" onSubmit={onSubmit}>
        <label>
          Usuario
          <input
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="btn-discovery" disabled={pending}>
          {pending
            ? 'Abriendo el laboratorio…'
            : mode === 'login'
              ? 'Entrar a explorar'
              : 'Comenzar a explorar'}
        </button>
      </form>
      <p className="auth-switch">
        {mode === 'login' ? (
          <>
            ¿Primera vez aquí? <Link to="/register">Crear perfil</Link>
          </>
        ) : (
          <>
            ¿Ya tienes un espacio? <Link to="/login">Entrar</Link>
          </>
        )}
      </p>
    </main>
  )
}
