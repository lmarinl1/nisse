const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ??
  'http://127.0.0.1:8000/api'

export type HealthResponse = {
  status: string
  service: string
  api_version: string
}

export async function fetchHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/health/`)

  if (!response.ok) {
    throw new Error(`Health check failed (${response.status})`)
  }

  return response.json() as Promise<HealthResponse>
}
