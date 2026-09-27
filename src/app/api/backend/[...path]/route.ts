import { NextResponse } from 'next/server'
import { backendHeaders, backendUrl, sameOrigin, unavailable } from '@/lib/server/backend'

export const dynamic = 'force-dynamic'

const SESSION_ROUTES = new Set(['auth/login', 'auth/register', 'auth/google', 'auth/refresh', 'auth/logout', 'auth/mfa/challenge'])

const UPLOAD_TYPES = new Set(['application/pdf', 'image/png', 'image/jpeg'])

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024

const json = (data: unknown, status: number) => NextResponse.json(data, { status, headers: { 'Cache-Control': 'no-store' } })

async function proxy(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  const joined = path.map(encodeURIComponent).join('/')
  if (SESSION_ROUTES.has(joined) || path.some(part => part === '..' || part === '.')) return json({ error: { code: 'NOT_FOUND', message: 'Not found.' } }, 404)
  if (request.method !== 'GET' && !sameOrigin(request)) return json({ error: { code: 'FORBIDDEN', message: 'Request blocked.' } }, 403)
  const url = backendUrl(`/${joined}`, new URL(request.url).search)
  if (!url) return json(unavailable().data, 503)
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || null
  const headers = backendHeaders(request, token)
  const type = request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() ?? ''
  let body: BodyInit | undefined
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    if (UPLOAD_TYPES.has(type)) {
      const file = await request.arrayBuffer()
      if (file.byteLength > MAX_UPLOAD_BYTES) return json({ error: { code: 'FILE_TOO_LARGE', message: 'Files can be up to 4 MB.' } }, 413)
      headers['Content-Type'] = type
      body = file
    } else {
      const text = await request.text()
      if (text) {
        headers['Content-Type'] = 'application/json'
        body = text
      }
    }
  }
  try {
    const response = await fetch(url, { method: request.method, headers, body, cache: 'no-store', signal: AbortSignal.timeout(65_000) })
    if (response.status === 204) return new NextResponse(null, { status: 204 })
    const returned = response.headers.get('content-type') ?? ''
    if (!returned.includes('application/json')) {
      const passed = new Headers({ 'Content-Type': returned || 'application/octet-stream', 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff' })
      const disposition = response.headers.get('content-disposition')
      if (disposition) passed.set('Content-Disposition', disposition)
      return new NextResponse(response.body, { status: response.status, headers: passed })
    }
    return new NextResponse(await response.text(), { status: response.status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } })
  } catch {
    return json(unavailable().data, 503)
  }
}

export { proxy as GET, proxy as POST, proxy as PATCH, proxy as PUT, proxy as DELETE }
