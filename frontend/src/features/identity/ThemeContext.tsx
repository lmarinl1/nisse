import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ThemePreference } from '../../shared/api/client'
import { useAuth } from './AuthContext'

export type ResolvedAppearance = 'light' | 'dark'

const STORAGE_KEY = 'nisse_theme_preference'

type ThemeState = {
  preference: ThemePreference
  resolved: ResolvedAppearance
  setPreference: (preference: ThemePreference) => void
}

const ThemeContext = createContext<ThemeState | null>(null)

function readStoredPreference(): ThemePreference {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === 'light' || raw === 'dark' || raw === 'system') {
      return raw
    }
  } catch {
    /* ignore */
  }
  return 'dark'
}

function resolveAppearance(preference: ThemePreference): ResolvedAppearance {
  if (preference === 'light' || preference === 'dark') {
    return preference
  }
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  return 'dark'
}

function applyDocumentTheme(resolved: ResolvedAppearance) {
  document.documentElement.setAttribute('data-theme', resolved)
  document.documentElement.style.colorScheme = resolved
}

function persistPreference(preference: ThemePreference) {
  try {
    localStorage.setItem(STORAGE_KEY, preference)
  } catch {
    /* ignore */
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { profile } = useAuth()
  const [preference, setPreferenceState] = useState<ThemePreference>(() =>
    readStoredPreference(),
  )
  const [systemIsDark, setSystemIsDark] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : true,
  )

  useEffect(() => {
    if (profile?.theme_preference) {
      setPreferenceState(profile.theme_preference)
      persistPreference(profile.theme_preference)
    }
  }, [profile?.theme_preference])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setSystemIsDark(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const resolved: ResolvedAppearance = useMemo(() => {
    if (preference === 'system') {
      return systemIsDark ? 'dark' : 'light'
    }
    return preference
  }, [preference, systemIsDark])

  useEffect(() => {
    applyDocumentTheme(resolved)
  }, [resolved])

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next)
    persistPreference(next)
    applyDocumentTheme(resolveAppearance(next))
  }, [])

  const value = useMemo(
    () => ({ preference, resolved, setPreference }),
    [preference, resolved, setPreference],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme(): ThemeState {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
