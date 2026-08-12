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
  updateProfileMe,
  type Profile,
  type ProfileThemeUpdate,
  type ProfileUpdateInput,
} from '../../shared/api/client'

type AuthState = {
  ready: boolean
  profile: Profile | null
  profileError: string | null
  login: (username: string, password: string) => Promise<void>
  register: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (
    input: ProfileUpdateInput | ProfileThemeUpdate,
  ) => Promise<Profile>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [profileError, setProfileError] = useState<string | null>(null)

  const refreshProfile = useCallback(async () => {
    const me = await fetchProfileMe()
    setProfile(me)
    setProfileError(null)
  }, [])

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
          setProfileError(null)
        }
      } catch {
        setToken(null)
        if (!cancelled) {
          setProfile(null)
          setProfileError(null)
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
    setProfileError(null)
  }, [])

  const register = useCallback(async (username: string, password: string) => {
    const payload = await apiRegister(username, password)
    setProfile(payload.profile)
    setProfileError(null)
  }, [])

  const logout = useCallback(async () => {
    await apiLogout()
    setProfile(null)
    setProfileError(null)
  }, [])

  const updateProfile = useCallback(
    async (input: ProfileUpdateInput | ProfileThemeUpdate) => {
      const updated = await updateProfileMe(input)
      setProfile(updated)
      setProfileError(null)
      return updated
    },
    [],
  )

  return (
    <AuthContext.Provider
      value={{
        ready,
        profile,
        profileError,
        login,
        register,
        logout,
        updateProfile,
        refreshProfile,
      }}
    >
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
