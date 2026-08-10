import { useEffect, useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoutIcon, SettingsIcon, UserIcon } from '../../shared/icons'
import { useAuth } from './AuthContext'
import { UserIdentity } from './UserIdentity'
import './user-menu.css'

export function UserMenu() {
  const { profile, logout, ready } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) {
      return
    }

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  async function handleLogout() {
    setOpen(false)
    await logout()
    navigate('/login', { replace: true })
  }

  function goSettings() {
    setOpen(false)
    navigate('/settings')
  }

  return (
    <div className="user-menu" ref={rootRef}>
      <button
        type="button"
        className="user-menu__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <UserIdentity
          profile={profile}
          variant="header"
          loading={!ready && !profile}
        />
      </button>

      {open ? (
        <div
          id={menuId}
          className="user-menu__dropdown"
          role="menu"
          aria-label="Menú de usuario"
        >
          <div className="user-menu__identity">
            <UserIdentity profile={profile} variant="dropdown" />
          </div>
          <div className="user-menu__divider" role="separator" />
          <button
            type="button"
            className="user-menu__item"
            role="menuitem"
            onClick={goSettings}
          >
            <UserIcon size="sm" aria-hidden />
            Perfil
          </button>
          <button
            type="button"
            className="user-menu__item"
            role="menuitem"
            onClick={goSettings}
          >
            <SettingsIcon size="sm" aria-hidden />
            Settings
          </button>
          <div className="user-menu__divider" role="separator" />
          <button
            type="button"
            className="user-menu__item user-menu__item--danger"
            role="menuitem"
            onClick={() => void handleLogout()}
          >
            <LogoutIcon size="sm" aria-hidden />
            Cerrar sesión
          </button>
        </div>
      ) : null}
    </div>
  )
}
