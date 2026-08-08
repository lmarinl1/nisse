import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  fetchProfileMe,
  getToken,
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  setToken,
  type Profile,
} from '../../shared/api/client'

type AuthState = {
  ready: boolean
  profile: Profile | null
  login: (username: string, password: string) => Promise<void>
  register: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    let cancelled = false

    async function bootstrap() {
      if (!getToken()) {
        if (!cancelled) {
          setReady(true)
        }
        return
      }
      try {
        const me = await fetchProfileMe()
        if (!cancelled) {
          setProfile(me)
        }
      } catch {
        setToken(null)
        if (!cancelled) {
          setProfile(null)
        }
      } finally {
        if (!cancelled) {
          setReady(true)
        }
      }
    }

    void bootstrap()
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (username: string, password: string) => {
    const payload = await apiLogin(username, password)
    setProfile(payload.profile)
  }, [])

  const register = useCallback(async (username: string, password: string) => {
    const payload = await apiRegister(username, password)
    setProfile(payload.profile)
  }, [])

  const logout = useCallback(async () => {
    await apiLogout()
    setProfile(null)
  }, [])

  return (
    <AuthContext.Provider value={{ ready, profile, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
