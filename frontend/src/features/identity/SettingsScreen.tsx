import { useCallback, useState } from 'react'
import { Link, useBlocker, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeftIcon } from '../../shared/icons'
import { AppearanceSettingsForm } from './AppearanceSettingsForm'
import { useAuth } from './AuthContext'
import {
  ProfileSettingsForm,
  useUnsavedSettingsPrompt,
} from './ProfileSettingsForm'
import { UserMenu } from './UserMenu'
import './settings.css'
import '../../shared/ui/research-drawer.css'
import '../study/study.css'

type SettingsSection = 'perfil' | 'apariencia'

export function SettingsScreen() {
  const { profile, ready, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const sectionParam = searchParams.get('section')
  const section: SettingsSection =
    sectionParam === 'apariencia' ? 'apariencia' : 'perfil'

  const [dirty, setDirty] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [retrying, setRetrying] = useState(false)

  useUnsavedSettingsPrompt(dirty && section === 'perfil')

  const blocker = useBlocker(dirty && section === 'perfil')

  const onDirtyChange = useCallback((value: boolean) => {
    setDirty(value)
  }, [])

  function goSection(next: SettingsSection) {
    if (next === 'perfil') {
      setSearchParams({}, { replace: true })
    } else {
      setSearchParams({ section: next }, { replace: true })
    }
  }

  async function handleRetry() {
    setRetrying(true)
    setLoadError(null)
    try {
      await refreshProfile()
    } catch {
      setLoadError('No pudimos cargar tu perfil. Inténtalo de nuevo.')
    } finally {
      setRetrying(false)
    }
  }

  return (
    <main className="settings-screen">
      <div className="settings-screen__chrome">
        <header className="settings-screen__top">
          <div className="settings-screen__nav">
            <button
              type="button"
              className="ghost btn-with-icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeftIcon size="sm" aria-hidden />
              Campo
            </button>
            <h1>Settings</h1>
          </div>
          <UserMenu />
        </header>

        <div className="settings-screen__body">
          <nav className="settings-screen__sections" aria-label="Secciones">
            <Link
              to="/settings"
              className={`settings-screen__section-link${section === 'perfil' ? ' is-active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                goSection('perfil')
              }}
            >
              Perfil
            </Link>
            <Link
              to="/settings?section=apariencia"
              className={`settings-screen__section-link${section === 'apariencia' ? ' is-active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                goSection('apariencia')
              }}
            >
              Apariencia
            </Link>
          </nav>

          {section === 'perfil' ? (
            <section
              className="settings-screen__panel"
              aria-labelledby="settings-perfil-title"
            >
              <header className="settings-screen__panel-header">
                <h2 id="settings-perfil-title">Perfil</h2>
                <p>
                  Identidad de trabajo del Diseñador de Futuros. Los cambios se
                  reflejan en todo NISSE sin cerrar sesión.
                </p>
              </header>

              {!ready ? (
                <div className="settings-screen__loading" aria-busy="true">
                  <div className="settings-screen__skeleton" />
                  <div className="settings-screen__skeleton settings-screen__skeleton--short" />
                  <div className="settings-screen__skeleton" />
                </div>
              ) : null}

              {ready && !profile ? (
                <div className="settings-screen__error" role="alert">
                  <p>
                    {loadError ??
                      'No pudimos cargar tu perfil. Revisa la conexión e inténtalo de nuevo.'}
                  </p>
                  <button
                    type="button"
                    className="btn-discovery"
                    disabled={retrying}
                    onClick={() => void handleRetry()}
                  >
                    {retrying ? 'Reintentando…' : 'Reintentar'}
                  </button>
                </div>
              ) : null}

              {ready && profile ? (
                <ProfileSettingsForm
                  profile={profile}
                  onDirtyChange={onDirtyChange}
                />
              ) : null}
            </section>
          ) : (
            <section
              className="settings-screen__panel"
              aria-labelledby="settings-apariencia-title"
            >
              <header className="settings-screen__panel-header">
                <h2 id="settings-apariencia-title">Apariencia</h2>
                <p>
                  Elige la atmósfera del laboratorio: clara, oscura o según el
                  dispositivo. Se guarda al instante como preferencia tuya.
                </p>
              </header>

              {!ready ? (
                <div className="settings-screen__loading" aria-busy="true">
                  <div className="settings-screen__skeleton" />
                  <div className="settings-screen__skeleton settings-screen__skeleton--short" />
                </div>
              ) : null}

              {ready && !profile ? (
                <div className="settings-screen__error" role="alert">
                  <p>
                    {loadError ??
                      'No pudimos cargar tu perfil. Revisa la conexión e inténtalo de nuevo.'}
                  </p>
                  <button
                    type="button"
                    className="btn-discovery"
                    disabled={retrying}
                    onClick={() => void handleRetry()}
                  >
                    {retrying ? 'Reintentando…' : 'Reintentar'}
                  </button>
                </div>
              ) : null}

              {ready && profile ? <AppearanceSettingsForm /> : null}
            </section>
          )}
        </div>
      </div>

      {blocker.state === 'blocked' ? (
        <div
          className="settings-leave"
          role="dialog"
          aria-modal="true"
          aria-labelledby="settings-leave-title"
        >
          <div className="settings-leave__panel">
            <h2 id="settings-leave-title">Cambios sin guardar</h2>
            <p>¿Deseas salir sin guardar?</p>
            <div className="settings-leave__actions">
              <button
                type="button"
                className="ghost"
                onClick={() => blocker.reset?.()}
              >
                Seguir editando
              </button>
              <button
                type="button"
                className="btn-discovery"
                onClick={() => blocker.proceed?.()}
              >
                Salir sin guardar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
