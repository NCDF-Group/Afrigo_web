const API_URL = (process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '')

export const SESSION_COOKIE = 'afrigo_session'

export type BackendResult = { status: number; data: any }

export function visitorIp(request: Request) {
  const headers = request.headers
  return headers.get('x-nf-client-connection-ip') || headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || ''
}

export function visitorCountry(request: Request) {
  const code = (request.headers.get('x-vercel-ip-country') || request.headers.get('x-country') || '').trim().toLowerCase()
  return /^[a-z]{2}$/.test(code) ? code : null
}

export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin) return true
  try {
    return new URL(origin).host === request.headers.get('host')
  } catch {
    return false
  }
}

export const unavailable = (): BackendResult => ({ status: 503, data: { error: { code: 'SERVICE_UNAVAILABLE', message: 'Something went wrong. Please try again.' } } })

export const backendUrl = (path: string, search = '') => (API_URL ? `${API_URL}/api/v1${path}${search}` : null)

export function backendHeaders(request: Request, token?: string | null) {
  const headers: Record<string, string> = { Accept: 'application/json', 'X-Client-Platform': 'web' }
  if (token) headers.Authorization = `Bearer ${token}`
  const ip = visitorIp(request)
  if (ip && process.env.BACKEND_PROXY_SECRET) {
    headers['X-Afrigo-Client-Ip'] = ip
    headers['X-Afrigo-Proxy-Secret'] = process.env.BACKEND_PROXY_SECRET
  }
  const agent = request.headers.get('user-agent')
  if (agent) headers['User-Agent'] = agent.slice(0, 300)
  return headers
}

export async function callBackend(request: Request, path: string, init: { method?: string; body?: unknown; token?: string | null; search?: string } = {}): Promise<BackendResult> {
  const url = backendUrl(path, init.search)
  if (!url) return unavailable()
  const headers = backendHeaders(request, init.token)
  if (init.body !== undefined) headers['Content-Type'] = 'application/json'
  try {
    const response = await fetch(url, {
      method: init.method ?? 'GET',
      headers,
      body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
      cache: 'no-store',
      signal: AbortSignal.timeout(65_000)
    })
    const text = await response.text()
    return { status: response.status, data: text ? JSON.parse(text) : null }
  } catch {
    return unavailable()
  }
}
