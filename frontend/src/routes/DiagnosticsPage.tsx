import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NisseBrandLockup } from '../shared/brand'
import { fetchHealth, type HealthResponse } from '../shared/api/client'

export function DiagnosticsPage() {
  const [state, setState] = useState<
    | { status: 'loading' }
    | { status: 'ready'; data: HealthResponse }
    | { status: 'error'; message: string }
  >({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    fetchHealth()
      .then((data) => {
        if (!cancelled) {
          setState({ status: 'ready', data })
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            status: 'error',
            message: error instanceof Error ? error.message : 'Unknown error',
          })
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="diagnostics">
      <NisseBrandLockup size="entry" className="diagnostics__brand" />
      <h1>Diagnóstico</h1>
      <p className="lede">
        Comprobación técnica del backend. No forma parte del Workspace de
        investigación.
      </p>
      {state.status === 'loading' && (
        <p className="loading-narrative">Observando el estado del servicio…</p>
      )}
      {state.status === 'ready' && (
        <dl>
          <div>
            <dt>Status</dt>
            <dd>{state.data.status}</dd>
          </div>
          <div>
            <dt>Service</dt>
            <dd>{state.data.service}</dd>
          </div>
          <div>
            <dt>API version</dt>
            <dd>{state.data.api_version}</dd>
          </div>
        </dl>
      )}
      {state.status === 'error' && (
        <p className="form-error">
          No se pudo contactar el backend: {state.message}. Arranca MongoDB y
          `python manage.py runserver` en <code>backend/</code>.
        </p>
      )}
      <p>
        <Link to="/">Volver</Link>
      </p>
    </main>
  )
}
