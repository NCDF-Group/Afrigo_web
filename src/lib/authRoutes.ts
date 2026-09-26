import type { AuthUser } from './auth'

export function workspaceHref(_user: AuthUser | null) {
  return '/account'
}

export function safeNext(value: string | null) {
  return value && value.startsWith('/') && !value.startsWith('//') && !value.startsWith('/\\') ? value : null
}
