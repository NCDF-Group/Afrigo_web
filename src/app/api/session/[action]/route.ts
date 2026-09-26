import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { callBackend, sameOrigin, SESSION_COOKIE, type BackendResult } from '@/lib/server/backend'

export const dynamic = 'force-dynamic'

const ROUTES: Record<string, string> = { login: '/auth/login', register: '/auth/register', google: '/auth/google', mfa: '/auth/mfa/challenge' }

const REMEMBER_COOKIE = 'afrigo_remember'

type Tokens = { accessToken: string; accessTokenExpiresIn: number; refreshToken: string; refreshTokenExpiresAt: string }

async function respond(result: BackendResult, remember?: boolean) {
  const jar = await cookies()
  const data = result.data ?? {}
  const tokens: Tokens | undefined = data.tokens
  if (result.status >= 400 || !tokens) {
    if (result.status === 401 && data?.error?.code === 'SESSION_EXPIRED') {
      jar.delete({ name: SESSION_COOKIE, path: '/api/session' })
      jar.delete({ name: REMEMBER_COOKIE, path: '/api/session' })
    }
    return NextResponse.json(data, { status: result.status })
  }
  const persistent = remember ?? jar.get(REMEMBER_COOKIE)?.value !== '0'
  const base = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, path: '/api/session' }
  jar.set({ ...base, name: SESSION_COOKIE, value: tokens.refreshToken, ...(persistent ? { expires: new Date(tokens.refreshTokenExpiresAt) } : {}) })
  if (persistent) jar.delete({ name: REMEMBER_COOKIE, path: '/api/session' })
  else jar.set({ ...base, name: REMEMBER_COOKIE, value: '0' })
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
    jar.delete({ name: REMEMBER_COOKIE, path: '/api/session' })
    return new NextResponse(null, { status: 204 })
  }

  const path = ROUTES[action]
  if (!path) return NextResponse.json({ error: { code: 'NOT_FOUND', message: 'Not found.' } }, { status: 404 })
  const { remember, ...body } = await request.json().catch(() => ({}))
  return respond(await callBackend(request, path, { method: 'POST', body: { ...body, platform: 'web' } }), remember !== false)
}
