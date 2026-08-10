import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
  type FormEvent,
} from 'react'
import {
  ProfileUpdateError,
  type ApiFieldErrors,
  type Profile,
  type ProfileUpdateInput,
} from '../../shared/api/client'
import { FormField } from '../../shared/ui'
import { useAuth } from './AuthContext'
import { UserIdentity } from './UserIdentity'

type FormState = ProfileUpdateInput

type ProfileSettingsFormProps = {
  profile: Profile
  onDirtyChange: (dirty: boolean) => void
}

function profileToForm(profile: Profile): FormState {
  return {
    first_name: profile.first_name ?? '',
    last_name: profile.last_name ?? '',
    role_title: profile.role_title ?? '',
    country_code: profile.country_code || '+57',
    phone: profile.phone ?? '',
    email: profile.email ?? '',
    username: profile.username ?? '',
  }
}

function firstError(errors: ApiFieldErrors, key: string): string | null {
  const value = errors[key]
  return value?.[0] ?? null
}

export function ProfileSettingsForm({
  profile,
  onDirtyChange,
}: ProfileSettingsFormProps) {
  const { updateProfile } = useAuth()
  const baseId = useId()
  const [form, setForm] = useState<FormState>(() => profileToForm(profile))
  const [fieldErrors, setFieldErrors] = useState<ApiFieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [saveState, setSaveState] = useState<
    'idle' | 'saving' | 'saved' | 'error'
  >('idle')

  const initial = useMemo(() => profileToForm(profile), [profile])

  const dirty = useMemo(
    () =>
      (Object.keys(form) as (keyof FormState)[]).some(
        (key) => form[key].trim() !== initial[key].trim(),
      ),
    [form, initial],
  )

  useEffect(() => {
    setForm(profileToForm(profile))
    setFieldErrors({})
    setFormError(null)
    setSaveState('idle')
  }, [profile])

  useEffect(() => {
    onDirtyChange(dirty)
  }, [dirty, onDirtyChange])

  const previewProfile: Profile = {
    ...profile,
    ...form,
  }

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setSaveState('idle')
    setFieldErrors((prev) => {
      if (!(key in prev)) {
        return prev
      }
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (saveState === 'saving') {
      return
    }
    setSaveState('saving')
    setFormError(null)
    setFieldErrors({})
    try {
      await updateProfile({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        role_title: form.role_title.trim(),
        country_code: form.country_code.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        username: form.username.trim(),
      })
      setSaveState('saved')
    } catch (err) {
      setSaveState('error')
      if (err instanceof ProfileUpdateError) {
        setFieldErrors(err.fieldErrors)
        setFormError(err.message)
      } else {
        setFormError(
          err instanceof Error
            ? err.message
            : 'No pudimos guardar los cambios. Inténtalo de nuevo.',
        )
      }
    }
  }

  const saveLabel =
    saveState === 'saving'
      ? 'Guardando…'
      : saveState === 'saved'
        ? 'Guardado'
        : 'Guardar cambios'

  return (
    <form className="settings-form" onSubmit={(e) => void handleSubmit(e)} noValidate>
      <UserIdentity profile={previewProfile} variant="settings" />

      <section className="settings-form__section" aria-labelledby={`${baseId}-personal`}>
        <h2 id={`${baseId}-personal`}>Información personal</h2>
        <FormField
          label="Nombre"
          htmlFor={`${baseId}-first`}
          error={firstError(fieldErrors, 'first_name')}
        >
          <input
            id={`${baseId}-first`}
            className="research-field__control"
            value={form.first_name}
            onChange={(e) => setField('first_name', e.target.value)}
            autoComplete="given-name"
            required
          />
        </FormField>
        <FormField
          label="Apellidos"
          htmlFor={`${baseId}-last`}
          error={firstError(fieldErrors, 'last_name')}
        >
          <input
            id={`${baseId}-last`}
            className="research-field__control"
            value={form.last_name}
            onChange={(e) => setField('last_name', e.target.value)}
            autoComplete="family-name"
            required
          />
        </FormField>
        <FormField
          label="Cargo"
          htmlFor={`${baseId}-role`}
          error={firstError(fieldErrors, 'role_title')}
        >
          <input
            id={`${baseId}-role`}
            className="research-field__control"
            value={form.role_title}
            onChange={(e) => setField('role_title', e.target.value)}
            placeholder="Diseñador de Futuros"
            required
          />
        </FormField>
      </section>

      <section className="settings-form__section" aria-labelledby={`${baseId}-contact`}>
        <h2 id={`${baseId}-contact`}>Contacto</h2>
        <div className="settings-form__phone-row">
          <FormField
            label="Country Code"
            htmlFor={`${baseId}-cc`}
            error={firstError(fieldErrors, 'country_code')}
          >
            <input
              id={`${baseId}-cc`}
              className="research-field__control"
              value={form.country_code}
              onChange={(e) => setField('country_code', e.target.value)}
              placeholder="+57"
              inputMode="tel"
              required
            />
          </FormField>
          <FormField
            label="Celular"
            htmlFor={`${baseId}-phone`}
            error={firstError(fieldErrors, 'phone')}
          >
            <input
              id={`${baseId}-phone`}
              className="research-field__control"
              value={form.phone}
              onChange={(e) => setField('phone', e.target.value)}
              inputMode="tel"
              autoComplete="tel-national"
              required
            />
          </FormField>
        </div>
        <FormField
          label="Correo electrónico"
          htmlFor={`${baseId}-email`}
          error={firstError(fieldErrors, 'email')}
        >
          <input
            id={`${baseId}-email`}
            className="research-field__control"
            type="email"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
            autoComplete="email"
            required
          />
        </FormField>
      </section>

      <section className="settings-form__section" aria-labelledby={`${baseId}-identity`}>
        <h2 id={`${baseId}-identity`}>Identidad</h2>
        <FormField
          label="Username"
          htmlFor={`${baseId}-username`}
          error={firstError(fieldErrors, 'username')}
        >
          <input
            id={`${baseId}-username`}
            className="research-field__control"
            value={form.username}
            onChange={(e) => setField('username', e.target.value)}
            autoComplete="username"
            required
          />
        </FormField>
      </section>

      {formError ? (
        <p className="form-error" role="alert">
          {formError}
        </p>
      ) : null}

      {saveState === 'saved' ? (
        <p className="settings-form__success" role="status">
          Cambios guardados
        </p>
      ) : null}

      <div className="settings-form__actions">
        <button
          type="submit"
          className="btn-discovery"
          disabled={saveState === 'saving' || !dirty}
        >
          {saveLabel}
        </button>
      </div>
    </form>
  )
}

export function useUnsavedSettingsPrompt(dirty: boolean) {
  const onBeforeUnload = useCallback(
    (event: BeforeUnloadEvent) => {
      if (!dirty) {
        return
      }
      event.preventDefault()
      event.returnValue = ''
    },
    [dirty],
  )

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [onBeforeUnload])
}
