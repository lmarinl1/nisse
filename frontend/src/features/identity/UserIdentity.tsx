import type { Profile } from '../../shared/api/client'
import { getProfileFirstName, getProfileInitials } from './profileInitials'
import './user-identity.css'

export type UserIdentityVariant = 'header' | 'workspace' | 'dropdown' | 'settings'

export type UserIdentityProps = {
  profile: Profile | null
  variant: UserIdentityVariant
  loading?: boolean
  className?: string
}

export function UserIdentity({
  profile,
  variant,
  loading = false,
  className,
}: UserIdentityProps) {
  const firstName = getProfileFirstName(profile)
  const username = (profile?.username ?? '').trim()
  const roleTitle = (profile?.role_title ?? '').trim()
  const initials = getProfileInitials(profile?.first_name, profile?.last_name)

  const rootClass = [
    'user-identity',
    `user-identity--${variant}`,
    loading ? 'user-identity--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (loading && !profile) {
    return (
      <div className={rootClass} aria-busy="true" aria-label="Cargando identidad">
        <span className="user-identity__avatar user-identity__avatar--skeleton" />
        <span className="user-identity__text">
          <span className="user-identity__skeleton-line" />
          <span className="user-identity__skeleton-line user-identity__skeleton-line--short" />
        </span>
      </div>
    )
  }

  return (
    <div className={rootClass}>
      <span
        className="user-identity__avatar"
        aria-hidden={variant === 'settings' ? undefined : true}
        aria-label={variant === 'settings' ? `Iniciales ${initials}` : undefined}
      >
        {initials}
      </span>
      {variant !== 'settings' ? (
        <span className="user-identity__text">
          <span className="user-identity__name">{firstName || '—'}</span>
          {username ? (
            <span className="user-identity__username">@{username}</span>
          ) : null}
          {variant === 'dropdown' && roleTitle ? (
            <span className="user-identity__role">{roleTitle}</span>
          ) : null}
        </span>
      ) : null}
    </div>
  )
}
