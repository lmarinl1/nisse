import { useId, useState } from 'react'
import {
  ProfileUpdateError,
  type ThemePreference,
} from '../../shared/api/client'
import { MoonIcon, SunIcon } from '../../shared/icons'
import { useAuth } from './AuthContext'
import { useTheme } from './ThemeContext'

const OPTIONS: {
  value: ThemePreference
  label: string
  description: string
}[] = [
  {
    value: 'light',
    label: 'Claro',
    description: 'Papel técnico cálido para lectura diurna.',
  },
  {
    value: 'dark',
    label: 'Oscuro',
    description: 'Profundidad de observatorio (laboratorio actual).',
  },
  {
    value: 'system',
    label: 'Dependiente del dispositivo',
    description: 'Sigue la configuración clara/oscura del sistema.',
  },
]

export function AppearanceSettingsForm() {
  const { profile, updateProfile } = useAuth()
  const { preference, setPreference } = useTheme()
  const baseId = useId()
  const [saveState, setSaveState] = useState<
    'idle' | 'saving' | 'saved' | 'error'
  >('idle')
  const [error, setError] = useState<string | null>(null)

  const current = preference

  async function selectPreference(next: ThemePreference) {
    if (next === current && saveState !== 'error') {
      return
    }
    setPreference(next)
    setSaveState('saving')
    setError(null)
    try {
      await updateProfile({ theme_preference: next })
      setSaveState('saved')
    } catch (err) {
      setSaveState('error')
      if (err instanceof ProfileUpdateError) {
        setError(
          err.fieldErrors.theme_preference?.[0] ??
            err.message ??
            'No pudimos guardar la apariencia.',
        )
      } else {
        setError('No pudimos guardar la apariencia.')
      }
      if (profile?.theme_preference) {
        setPreference(profile.theme_preference)
      }
    }
  }

  return (
    <div className="appearance-form">
      <fieldset className="appearance-form__fieldset">
        <legend className="appearance-form__legend">Modo de apariencia</legend>
        <div
          className="appearance-form__options"
          role="radiogroup"
          aria-labelledby={`${baseId}-legend`}
        >
          <span id={`${baseId}-legend`} className="visually-hidden">
            Modo de apariencia
          </span>
          {OPTIONS.map((option) => {
            const selected = current === option.value
            return (
              <label
                key={option.value}
                className={`appearance-form__option${selected ? ' is-selected' : ''}`}
              >
                <input
                  type="radio"
                  name={`${baseId}-theme`}
                  value={option.value}
                  checked={selected}
                  disabled={saveState === 'saving'}
                  onChange={() => void selectPreference(option.value)}
                />
                <span className="appearance-form__option-icon" aria-hidden>
                  {option.value === 'light' ? (
                    <SunIcon size="sm" />
                  ) : option.value === 'dark' ? (
                    <MoonIcon size="sm" />
                  ) : (
                    <>
                      <SunIcon size="sm" />
                      <MoonIcon size="sm" />
                    </>
                  )}
                </span>
                <span className="appearance-form__option-copy">
                  <span className="appearance-form__option-label">
                    {option.label}
                  </span>
                  <span className="appearance-form__option-desc">
                    {option.description}
                  </span>
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      {saveState === 'saved' ? (
        <p className="settings-form__success" role="status">
          Cambios guardados
        </p>
      ) : null}
      {error ? (
        <p className="form-field__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
