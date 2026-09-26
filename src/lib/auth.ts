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
    mfaEnabled: Boolean(data.mfaEnabled)
  }
}

function signedOut() {
  if (refreshTimer) clearTimeout(refreshTimer)
  state = { user: null, token: null, ready: true }
  emit()
}

function apply(result: { user?: any; accessToken?: string; expiresIn?: number }) {
  if (!result?.accessToken || !result.user) return null
  state = { user: toUser(result.user), token: result.accessToken, ready: true }
  if (refreshTimer) clearTimeout(refreshTimer)
  refreshTimer = setTimeout(() => void refreshSession(), Math.max(30, (result.expiresIn ?? 900) - 60) * 1000)
  emit()
  return state.user
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
    .then(result => apply(result) ?? (signedOut(), null))
    .catch(() => (signedOut(), null))
    .finally(() => {
      restoring = null
    })
  return restoring
}

export async function api<T = any>(path: string, init: { method?: string; body?: unknown } = {}, retried = false): Promise<T> {
  if (!state.ready) await refreshSession()
  const response = await fetch(`/api/backend${path}`, {
    method: init.method ?? 'GET',
    headers: { ...(state.token ? { Authorization: `Bearer ${state.token}` } : {}), ...(init.body !== undefined ? { 'Content-Type': 'application/json' } : {}) },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    credentials: 'same-origin'
  }).catch(() => {
    throw new ApiError('NETWORK', 'Network problem. Check your connection and try again.')
  })
  if (response.status === 401 && state.token && !retried) {
    const user = await refreshSession()
    if (user) return api<T>(path, init, true)
  }
  return parse(response)
}

type SignInResult = { user: AuthUser } | MfaStep

function signInResult(result: any): SignInResult {
  if (result?.mfaToken) return result as MfaStep
  return { user: apply(result)! }
}

export const signIn = async ({ email, password }: { email: string; password: string }) => signInResult(await session('login', { email: email.trim().toLowerCase(), password }))

export async function signUp(input: { firstName: string; lastName: string; email: string; password: string; locale?: 'en' | 'fr' }) {
  const user = apply(await session('register', { ...input, email: input.email.trim().toLowerCase(), firstName: input.firstName.trim(), lastName: input.lastName.trim() }))!
  return { user, needsVerification: !user.emailVerified }
}

export const signInWithGoogle = async (idToken: string) => signInResult(await session('google', { idToken }))

export async function completeMfa(mfaToken: string, input: { code?: string; recoveryCode?: string }) {
  return apply(await session('mfa', { mfaToken, ...input }))!
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
  if (state.user) {
    state = { ...state, user: toUser(result.user) }
    emit()
  }
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
      isSignedIn: Boolean(snapshot.user),
      isDemo: false,
      setRole: updateRole,
      signOut,
      refresh: () => void refreshSession()
    }),
    [snapshot]
  )
}
