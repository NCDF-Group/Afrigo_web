'use client'
import { useEffect, useMemo, useState } from 'react'
import type { Role } from './roles'

export type Membership = { organisationId: string; name: string; kind: 'business' | 'service_partner'; verificationStatus: string; status: string; role: 'administrator' | 'member' }

export type AuthUser = {
  id: string
  email: string
  firstName: string
  lastName: string
  displayName: string
  role?: Role
  operationalRole?: string
  demo: boolean
  emailVerified?: boolean
  photoURL?: string
  locale?: 'en' | 'fr'
  mfaEnabled?: boolean
  organisations: Membership[]
  phone?: string | null
  country?: string | null
  createdAt?: string
  hasPassword?: boolean
}

export type MfaStep = { mfaRequired?: true; mfaSetupRequired?: true; mfaToken: string }

export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status = 0,
    public readonly details?: { field: string; message: string }[]
  ) {
    super(message)
  }
}

type Session = { user: AuthUser | null; token: string | null; ready: boolean }

let state: Session = { user: null, token: null, ready: false }
let refreshTimer: ReturnType<typeof setTimeout> | null = null
let restoring: Promise<AuthUser | null> | null = null
const listeners = new Set<() => void>()

const emit = () => listeners.forEach(listener => listener())

function toUser(data: any): AuthUser {
  return {
    id: data.id,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    displayName: data.displayName || data.email?.split('@')[0] || 'Afrigo user',
    operationalRole: data.staffRole ?? undefined,
    demo: false,
    emailVerified: Boolean(data.emailVerified),
    photoURL: data.avatarUrl ?? undefined,
    locale: data.locale,
    mfaEnabled: Boolean(data.mfaEnabled),
    phone: data.phone ?? null,
    country: data.country ?? null,
    createdAt: data.createdAt,
    hasPassword: data.hasPassword !== false,
    organisations: state.user?.id === data.id ? state.user?.organisations ?? [] : []
  }
}

function signedOut() {
  if (refreshTimer) clearTimeout(refreshTimer)
  state = { user: null, token: null, ready: true }
  emit()
}

function apply(result: { user?: any; accessToken?: string; expiresIn?: number }) {
  if (!result?.accessToken || !result.user) return null
  state = { user: toUser(result.user), token: result.accessToken, ready: state.ready }
  if (refreshTimer) clearTimeout(refreshTimer)
  refreshTimer = setTimeout(() => void refreshSession(), Math.max(30, (result.expiresIn ?? 900) - 60) * 1000)
  return state.user
}

export async function reloadAccount() {
  if (!state.token) return state.user
  const response = await fetch('/api/backend/auth/me', { headers: { Authorization: `Bearer ${state.token}` }, credentials: 'same-origin' }).catch(() => null)
  const data = response?.ok ? await response.json().catch(() => null) : null
  if (data?.user) state = { ...state, user: { ...toUser(data.user), organisations: data.organisations ?? [] } }
  state = { ...state, ready: true }
  emit()
  return state.user
}

async function establish(result: any) {
  if (!apply(result)) return null
  return reloadAccount()
}

async function parse(response: Response) {
  const data = response.status === 204 ? null : await response.json().catch(() => null)
  if (!response.ok) {
    const error = data?.error
    throw new ApiError(error?.code || 'REQUEST_FAILED', error?.message || 'Something went wrong. Please try again.', response.status, error?.details)
  }
  return data
}

async function session(action: string, body?: unknown) {
  const response = await fetch(`/api/session/${action}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
    credentials: 'same-origin'
  }).catch(() => {
    throw new ApiError('NETWORK', 'Network problem. Check your connection and try again.')
  })
  return parse(response)
}

export function refreshSession() {
  restoring ??= session('refresh')
    .then(async result => (await establish(result)) ?? (signedOut(), null))
    .catch(() => (signedOut(), null))
    .finally(() => {
      restoring = null
    })
  return restoring
}

type ApiInit = { method?: string; body?: unknown; file?: Blob }

async function send(path: string, init: ApiInit, retried = false): Promise<Response> {
  if (!state.ready) await refreshSession()
  const headers: Record<string, string> = state.token ? { Authorization: `Bearer ${state.token}` } : {}
  if (init.file) headers['Content-Type'] = init.file.type || 'application/octet-stream'
  else if (init.body !== undefined) headers['Content-Type'] = 'application/json'
  const response = await fetch(`/api/backend${path}`, {
    method: init.method ?? 'GET',
    headers,
    body: init.file ?? (init.body === undefined ? undefined : JSON.stringify(init.body)),
    credentials: 'same-origin'
  }).catch(() => {
    throw new ApiError('NETWORK', 'Network problem. Check your connection and try again.')
  })
  if (response.status === 401 && state.token && !retried) {
    const user = await refreshSession()
    if (user) return send(path, init, true)
  }
  return response
}

export async function api<T = any>(path: string, init: ApiInit = {}): Promise<T> {
  return parse(await send(path, init))
}

export async function apiBlob(path: string) {
  const response = await send(path, {})
  if (!response.ok) await parse(response)
  return response.blob()
}

type SignInResult = { user: AuthUser } | MfaStep

async function signInResult(result: any): Promise<SignInResult> {
  if (result?.mfaToken) return result as MfaStep
  return { user: (await establish(result))! }
}

export const signIn = async ({ email, password, remember = true }: { email: string; password: string; remember?: boolean }) => signInResult(await session('login', { email: email.trim().toLowerCase(), password, remember }))

export async function signUp(input: { firstName: string; lastName: string; email: string; password: string; locale?: 'en' | 'fr' }) {
  const user = (await establish(await session('register', { ...input, email: input.email.trim().toLowerCase(), firstName: input.firstName.trim(), lastName: input.lastName.trim() })))!
  return { user, needsVerification: !user.emailVerified }
}

export const signInWithGoogle = async (idToken: string, remember = true) => signInResult(await session('google', { idToken, remember }))

export async function completeMfa(mfaToken: string, input: { code?: string; recoveryCode?: string }, remember = true) {
  return (await establish(await session('mfa', { mfaToken, ...input, remember })))!
}

export async function signOut() {
  await session('logout').catch(() => null)
  signedOut()
}

export const signOutEverywhere = async () => {
  await api('/auth/logout-all', { method: 'POST' })
  await signOut()
}

export async function requestEmailVerification() {
  await api('/auth/email/resend', { method: 'POST' })
}

export async function verifyEmail(token: string) {
  const result = await api<{ user: any }>('/auth/email/verify', { method: 'POST', body: { token } })
  if (state.user) await reloadAccount()
  return result.user
}

export const requestPasswordReset = (email: string) => api('/auth/password/forgot', { method: 'POST', body: { email: email.trim().toLowerCase() } })

export const resetPassword = (token: string, password: string) => api('/auth/password/reset', { method: 'POST', body: { token, password } })

export const acceptInvitation = (token: string) => api<{ organisation: { id: string; name: string }; role: string }>('/organisations/invitations/accept', { method: 'POST', body: { token } })

export const myOrganisations = () => api<{ items: Membership[] }>('/organisations/mine').then(result => result.items)

export function authErrorMessage(error: unknown, messages: Record<string, string>, fallback: string) {
  if (!(error instanceof ApiError)) return fallback
  if (error.code === 'VALIDATION_FAILED' && error.details?.length) return error.details[0].message
  return messages[error.code] || error.message || fallback
}

export async function updateRole(_role?: string): Promise<AuthUser> {
  throw new ApiError('ROLE_SELECTION_REMOVED', 'Your business type is set when you add your business profile.')
}

export function useAuth() {
  const [snapshot, setSnapshot] = useState(state)
  useEffect(() => {
    const listener = () => setSnapshot(state)
    listeners.add(listener)
    setSnapshot(state)
    if (!state.ready) void refreshSession()
    return () => {
      listeners.delete(listener)
    }
  }, [])
  return useMemo(
    () => ({
      user: snapshot.user,
      loading: !snapshot.ready,
      organisations: snapshot.user?.organisations ?? [],
      isSignedIn: Boolean(snapshot.user),
      isDemo: false,
      setRole: updateRole,
      signOut,
      refresh: () => void refreshSession()
    }),
    [snapshot]
  )
}
