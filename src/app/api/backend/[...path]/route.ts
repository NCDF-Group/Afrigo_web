import { NextResponse } from 'next/server'
import { callBackend, sameOrigin } from '@/lib/server/backend'

export const dynamic = 'force-dynamic'

const SESSION_ROUTES = new Set(['auth/login', 'auth/register', 'auth/google', 'auth/refresh', 'auth/logout', 'auth/mfa/challenge'])

async function proxy(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  const joined = path.map(encodeURIComponent).join('/')
  if (SESSION_ROUTES.has(joined) || path.some(part => part === '..')) return NextResponse.json({ error: { code: 'NOT_FOUND', message: 'Not found.' } }, { status: 404 })
  if (request.method !== 'GET' && !sameOrigin(request)) return NextResponse.json({ error: { code: 'FORBIDDEN', message: 'Request blocked.' } }, { status: 403 })
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || null
  const body = request.method === 'GET' || request.method === 'HEAD' ? undefined : await request.json().catch(() => undefined)
  const result = await callBackend(request, `/${joined}`, { method: request.method, body, token, search: new URL(request.url).search })
  if (result.status === 204) return new NextResponse(null, { status: 204 })
  return NextResponse.json(result.data, { status: result.status, headers: { 'Cache-Control': 'no-store' } })
}

export { proxy as GET, proxy as POST, proxy as PATCH, proxy as PUT, proxy as DELETE }
