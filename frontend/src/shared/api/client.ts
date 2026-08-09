const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ??
  'http://127.0.0.1:8000/api'

const TOKEN_KEY = 'nisse_auth_token'

export type HealthResponse = {
  status: string
  service: string
  api_version: string
}

export type Profile = {
  id: string
  username: string
  display_name: string
  created_at: string
  updated_at: string
}

export type AuthPayload = {
  token: string
  user: { id: string; username: string }
  profile: Profile
}

export type Study = {
  id: string
  name: string
  description: string
  status: 'active' | 'archived'
  created_at: string
  updated_at: string
}

export type StudyInput = {
  name: string
  description?: string
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string | null): void {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
  } else {
    localStorage.removeItem(TOKEN_KEY)
  }
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers)
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json')
  }
  const token = getToken()
  if (token) {
    headers.set('Authorization', `Token ${token}`)
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })

  if (response.status === 204) {
    return undefined as T
  }

  const text = await response.text()
  const data = text ? (JSON.parse(text) as unknown) : null

  if (!response.ok) {
    const detail =
      data && typeof data === 'object' && 'detail' in data
        ? String((data as { detail: unknown }).detail)
        : `Request failed (${response.status})`
    throw new Error(detail)
  }

  return data as T
}

export async function fetchHealth(): Promise<HealthResponse> {
  return apiFetch<HealthResponse>('/health/')
}

export async function register(
  username: string,
  password: string,
): Promise<AuthPayload> {
  const payload = await apiFetch<AuthPayload>('/auth/register/', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  setToken(payload.token)
  return payload
}

export async function login(
  username: string,
  password: string,
): Promise<AuthPayload> {
  const payload = await apiFetch<AuthPayload>('/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  setToken(payload.token)
  return payload
}

export async function logout(): Promise<void> {
  try {
    await apiFetch<void>('/auth/logout/', { method: 'POST' })
  } finally {
    setToken(null)
  }
}

export async function fetchProfileMe(): Promise<Profile> {
  return apiFetch<Profile>('/profile/me/')
}

export async function listStudies(): Promise<Study[]> {
  return apiFetch<Study[]>('/studies/')
}

export async function createStudy(input: StudyInput): Promise<Study> {
  return apiFetch<Study>('/studies/', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export async function getStudy(id: string): Promise<Study> {
  return apiFetch<Study>(`/studies/${id}/`)
}

export async function updateStudy(
  id: string,
  input: Partial<StudyInput>,
): Promise<Study> {
  return apiFetch<Study>(`/studies/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  })
}

export async function archiveStudy(id: string): Promise<Study> {
  return apiFetch<Study>(`/studies/${id}/archive/`, { method: 'POST' })
}

export type CaseFrameworkProgressStatus =
  | 'not_started'
  | 'in_progress'
  | 'with_content'
  | 'reviewed'

export type CaseFrameworkSection = {
  id: string
  section_type: string
  fields: Record<string, string>
  reviewed: boolean
  status: CaseFrameworkProgressStatus
  created_at: string
  updated_at: string
}

export type CaseFramework = {
  id: string
  study_id: string
  sections: CaseFrameworkSection[]
  created_at: string
  updated_at: string
}

export type CaseFrameworkSectionPatch = {
  fields?: Record<string, string>
  reviewed?: boolean
}

export async function getCaseFramework(
  studyId: string,
): Promise<CaseFramework> {
  return apiFetch<CaseFramework>(`/studies/${studyId}/case-framework/`)
}

export async function patchCaseFrameworkSection(
  studyId: string,
  sectionType: string,
  patch: CaseFrameworkSectionPatch,
): Promise<CaseFrameworkSection> {
  return apiFetch<CaseFrameworkSection>(
    `/studies/${studyId}/case-framework/sections/${sectionType}/`,
    {
      method: 'PATCH',
      body: JSON.stringify(patch),
    },
  )
}
