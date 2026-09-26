import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { callBackend, sameOrigin, SESSION_COOKIE, type BackendResult } from '@/lib/server/backend'

export const dynamic = 'force-dynamic'

const ROUTES: Record<string, string> = { login: '/auth/login', register: '/auth/register', google: '/auth/google', mfa: '/auth/mfa/challenge' }

type Tokens = { accessToken: string; accessTokenExpiresIn: number; refreshToken: string; refreshTokenExpiresAt: string }

async function respond(result: BackendResult) {
  const jar = await cookies()
  const data = result.data ?? {}
  const tokens: Tokens | undefined = data.tokens
  if (result.status >= 400 || !tokens) {
    if (result.status === 401 && data?.error?.code === 'SESSION_EXPIRED') jar.delete({ name: SESSION_COOKIE, path: '/api/session' })
    return NextResponse.json(data, { status: result.status })
  }
  jar.set({
    name: SESSION_COOKIE,
    value: tokens.refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api/session',
    expires: new Date(tokens.refreshTokenExpiresAt)
  })
  return NextResponse.json({ user: data.user, accessToken: tokens.accessToken, expiresIn: tokens.accessTokenExpiresIn, recoveryCodes: data.recoveryCodes }, { status: result.status, headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(request: Request, { params }: { params: Promise<{ action: string }> }) {
  if (!sameOrigin(request)) return NextResponse.json({ error: { code: 'FORBIDDEN', message: 'Request blocked.' } }, { status: 403 })
  const { action } = await params
  const jar = await cookies()

  if (action === 'refresh') {
    const refreshToken = jar.get(SESSION_COOKIE)?.value
    if (!refreshToken) return NextResponse.json({ user: null }, { headers: { 'Cache-Control': 'no-store' } })
    return respond(await callBackend(request, '/auth/refresh', { method: 'POST', body: { refreshToken } }))
  }

  if (action === 'logout') {
    const refreshToken = jar.get(SESSION_COOKIE)?.value
    if (refreshToken) await callBackend(request, '/auth/logout', { method: 'POST', body: { refreshToken } })
    jar.delete({ name: SESSION_COOKIE, path: '/api/session' })
    return new NextResponse(null, { status: 204 })
  }

  const path = ROUTES[action]
  if (!path) return NextResponse.json({ error: { code: 'NOT_FOUND', message: 'Not found.' } }, { status: 404 })
  const body = await request.json().catch(() => ({}))
  return respond(await callBackend(request, path, { method: 'POST', body: { ...body, platform: 'web' } }))
}
