import { useEffect, useState } from 'react'
import { fetchHealth, type HealthResponse } from './api/client'
import './App.css'

type LoadState =
  | { status: 'loading' }
  | { status: 'ready'; data: HealthResponse }
  | { status: 'error'; message: string }

function App() {
  const [state, setState] = useState<LoadState>({ status: 'loading' })

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
          const message =
            error instanceof Error ? error.message : 'Unknown error'
          setState({ status: 'error', message })
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="app">
      <header className="hero">
        <p className="brand">Nisse</p>
        <h1>Monorepo listo</h1>
        <p className="lede">
          Frontend React + backend Django conectados a MongoDB, gobernados con
          OpenSpec.
        </p>
      </header>

      <section className="status" aria-live="polite">
        <h2>API health</h2>
        {state.status === 'loading' && <p>Consultando backend…</p>}
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
          <p className="error">
            No se pudo contactar el backend: {state.message}. Arranca MongoDB y
            `python manage.py runserver` en <code>backend/</code>.
          </p>
        )}
      </section>
    </main>
  )
}

export default App
