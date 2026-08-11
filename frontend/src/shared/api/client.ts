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
  email: string
  first_name: string
  last_name: string
  role_title: string
  country_code: string
  phone: string
  display_name: string
  created_at: string
  updated_at: string
}

export type ProfileUpdateInput = {
  username: string
  email: string
  first_name: string
  last_name: string
  role_title: string
  country_code: string
  phone: string
}

export type ApiFieldErrors = Record<string, string[]>

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

export class ProfileUpdateError extends Error {
  fieldErrors: ApiFieldErrors

  constructor(message: string, fieldErrors: ApiFieldErrors) {
    super(message)
    this.name = 'ProfileUpdateError'
    this.fieldErrors = fieldErrors
  }
}

export async function updateProfileMe(
  input: ProfileUpdateInput,
): Promise<Profile> {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  const token = getToken()
  if (token) {
    headers.set('Authorization', `Token ${token}`)
  }

  const response = await fetch(`${API_BASE_URL}/profile/me/`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(input),
  })

  const text = await response.text()
  const data = text ? (JSON.parse(text) as unknown) : null

  if (!response.ok) {
    if (
      response.status === 400 &&
      data &&
      typeof data === 'object' &&
      !Array.isArray(data)
    ) {
      const fieldErrors: ApiFieldErrors = {}
      for (const [key, value] of Object.entries(
        data as Record<string, unknown>,
      )) {
        if (Array.isArray(value)) {
          fieldErrors[key] = value.map(String)
        } else if (typeof value === 'string') {
          fieldErrors[key] = [value]
        }
      }
      throw new ProfileUpdateError('No pudimos guardar el perfil.', fieldErrors)
    }
    const detail =
      data && typeof data === 'object' && 'detail' in data
        ? String((data as { detail: unknown }).detail)
        : `Request failed (${response.status})`
    throw new Error(detail)
  }

  return data as Profile
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

export type TimelineClassification = 'real' | 'fictional'
export type TimelineStatus = 'active' | 'archived'
export type RecallClassification =
  | 'verified'
  | 'approximate'
  | 'hypothetical'
  | 'fiction'

export type Timeline = {
  id: string
  study_id: string
  name: string
  description: string
  classification: TimelineClassification
  retrospective_year: number
  status: TimelineStatus
  is_default: boolean
  recall_count: number
  created_at: string
  updated_at: string
}

export type TimelineInput = {
  name: string
  description?: string
  classification: TimelineClassification
  retrospective_year: number
}

export type Moment = {
  id: string
  title: string
  content_markdown: string
  type: string
  reference: string
  created_at: string
  updated_at: string
}

export type MomentInput = {
  title: string
  content_markdown?: string
  type?: string
  reference?: string
}

export type Recall = {
  id: string
  study_id: string
  home_timeline_id: string
  timeline_ids: string[]
  title: string
  location: string
  description_markdown: string
  classification: RecallClassification
  temporal_year: number
  temporal_month: number | null
  temporal_day: number | null
  sort_key: number
  is_collapse: boolean
  moments: Moment[]
  created_at: string
  updated_at: string
}

export type RecallInput = {
  title: string
  location?: string
  description_markdown: string
  classification: RecallClassification
  temporal_year: number
  temporal_month?: number | null
  temporal_day?: number | null
}

export async function listTimelines(
  studyId: string,
  status: 'active' | 'archived' | 'all' = 'all',
): Promise<Timeline[]> {
  const query = status === 'all' ? '' : `?status=${status}`
  return apiFetch<Timeline[]>(`/studies/${studyId}/timelines/${query}`)
}

export async function createTimeline(
  studyId: string,
  input: TimelineInput,
): Promise<Timeline> {
  return apiFetch<Timeline>(`/studies/${studyId}/timelines/`, {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export async function getTimeline(
  studyId: string,
  timelineId: string,
): Promise<Timeline> {
  return apiFetch<Timeline>(`/studies/${studyId}/timelines/${timelineId}/`)
}

export async function updateTimeline(
  studyId: string,
  timelineId: string,
  input: TimelineInput,
): Promise<Timeline> {
  return apiFetch<Timeline>(`/studies/${studyId}/timelines/${timelineId}/`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  })
}

export async function archiveTimeline(
  studyId: string,
  timelineId: string,
): Promise<Timeline> {
  return apiFetch<Timeline>(
    `/studies/${studyId}/timelines/${timelineId}/archive/`,
    { method: 'POST' },
  )
}

export async function restoreTimeline(
  studyId: string,
  timelineId: string,
): Promise<Timeline> {
  return apiFetch<Timeline>(
    `/studies/${studyId}/timelines/${timelineId}/restore/`,
    { method: 'POST' },
  )
}

export async function deleteTimeline(
  studyId: string,
  timelineId: string,
): Promise<void> {
  return apiFetch<void>(`/studies/${studyId}/timelines/${timelineId}/`, {
    method: 'DELETE',
  })
}

export async function listRecalls(
  studyId: string,
  timelineId: string,
): Promise<Recall[]> {
  return apiFetch<Recall[]>(
    `/studies/${studyId}/timelines/${timelineId}/recalls/`,
  )
}

export async function createRecall(
  studyId: string,
  timelineId: string,
  input: RecallInput,
): Promise<Recall> {
  return apiFetch<Recall>(
    `/studies/${studyId}/timelines/${timelineId}/recalls/`,
    {
      method: 'POST',
      body: JSON.stringify(input),
    },
  )
}

export async function updateRecall(
  studyId: string,
  recallId: string,
  input: RecallInput,
): Promise<Recall> {
  return apiFetch<Recall>(`/studies/${studyId}/recalls/${recallId}/`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  })
}

export async function deleteRecall(
  studyId: string,
  recallId: string,
): Promise<void> {
  return apiFetch<void>(`/studies/${studyId}/recalls/${recallId}/`, {
    method: 'DELETE',
  })
}

export async function createMoment(
  studyId: string,
  recallId: string,
  input: MomentInput,
): Promise<Moment> {
  return apiFetch<Moment>(
    `/studies/${studyId}/recalls/${recallId}/moments/`,
    {
      method: 'POST',
      body: JSON.stringify(input),
    },
  )
}

export async function updateMoment(
  studyId: string,
  recallId: string,
  momentId: string,
  input: MomentInput,
): Promise<Moment> {
  return apiFetch<Moment>(
    `/studies/${studyId}/recalls/${recallId}/moments/${momentId}/`,
    {
      method: 'PATCH',
      body: JSON.stringify(input),
    },
  )
}

export async function deleteMoment(
  studyId: string,
  recallId: string,
  momentId: string,
): Promise<void> {
  return apiFetch<void>(
    `/studies/${studyId}/recalls/${recallId}/moments/${momentId}/`,
    { method: 'DELETE' },
  )
}

export async function createCollapse(
  studyId: string,
  recallId: string,
  timelineIds: string[],
): Promise<Recall> {
  return apiFetch<Recall>(
    `/studies/${studyId}/recalls/${recallId}/collapses/`,
    {
      method: 'POST',
      body: JSON.stringify({ timeline_ids: timelineIds }),
    },
  )
}

/* --- Time derivations (Neo4j via Django; Mongo for Study/Recall) --- */

export type DerivationNodeKind = 'root' | 'derivation'

export type DerivationRecallRef = {
  id: string
  title: string
  temporal_year: number
  temporal_month: number | null
  temporal_day: number | null
  timeline_id: string
  timeline_name: string
}

export type DerivationNode = {
  id: string
  kind: DerivationNodeKind
  name: string
  position_x: number
  position_y: number
  created_at?: string
  updated_at?: string
  description_markdown?: string
  derivation_type?: string
  impact?: string
  is_speculative?: boolean
  recall_id?: string | null
  recall?: DerivationRecallRef | null
  recall_missing?: boolean
}

export type DerivationEdge = {
  id: string
  source_node_id: string
  target_node_id: string
  relationship_type: string
  created_at?: string
  updated_at?: string
}

export type DerivationGraph = {
  study_id: string
  nodes: DerivationNode[]
  edges: DerivationEdge[]
  derivation_count: number
  edge_count: number
  study: {
    id: string
    name: string
    description: string
  }
}

export type DerivationNodeInput = {
  name: string
  description_markdown?: string
  derivation_type?: string
  impact?: string
  is_speculative?: boolean
  recall_id?: string | null
  position_x?: number
  position_y?: number
  source_node_id?: string
}

export type DerivationNodePatch = Partial<DerivationNodeInput> & {
  position_x?: number
  position_y?: number
}

export async function getDerivationGraph(
  studyId: string,
): Promise<DerivationGraph> {
  return apiFetch<DerivationGraph>(`/studies/${studyId}/derivations/`)
}

export async function createDerivationNode(
  studyId: string,
  input: DerivationNodeInput,
): Promise<DerivationNode & { created_edge?: DerivationEdge }> {
  return apiFetch(`/studies/${studyId}/derivations/nodes/`, {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export async function updateDerivationNode(
  studyId: string,
  nodeId: string,
  patch: DerivationNodePatch,
): Promise<DerivationNode> {
  return apiFetch(`/studies/${studyId}/derivations/nodes/${nodeId}/`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
  })
}

export async function deleteDerivationNode(
  studyId: string,
  nodeId: string,
): Promise<void> {
  await apiFetch(`/studies/${studyId}/derivations/nodes/${nodeId}/`, {
    method: 'DELETE',
  })
}

export async function createDerivationEdge(
  studyId: string,
  sourceNodeId: string,
  targetNodeId: string,
): Promise<DerivationEdge> {
  return apiFetch(`/studies/${studyId}/derivations/edges/`, {
    method: 'POST',
    body: JSON.stringify({
      source_node_id: sourceNodeId,
      target_node_id: targetNodeId,
    }),
  })
}

export async function deleteDerivationEdge(
  studyId: string,
  edgeId: string,
): Promise<void> {
  await apiFetch(`/studies/${studyId}/derivations/edges/${edgeId}/`, {
    method: 'DELETE',
  })
}

export async function listStudyRecalls(
  studyId: string,
): Promise<DerivationRecallRef[]> {
  return apiFetch<DerivationRecallRef[]>(`/studies/${studyId}/recalls/`)
}
