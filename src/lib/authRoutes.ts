import type { AuthUser } from './auth'

export function workspaceHref(user: AuthUser | null) {
  if (!user) return '/sign-in'
  if (!user.emailVerified) return '/verify-email'
  if (!user.organisations.length) return '/app/setup'
  return '/app'
}

export function safeNext(value: string | null) {
  return value && value.startsWith('/') && !value.startsWith('//') && !value.startsWith('/\\') ? value : null
}
