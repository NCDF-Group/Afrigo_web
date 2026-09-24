import type { AuthUser } from './auth'

// Transitional: the role-based dashboard remains until the business workspace (/app) replaces it.
export function workspaceHref(user: AuthUser | null) {
  return user?.role ? '/dashboard' : '/role-selection'
}

// Only allow same-origin relative paths as post-login destinations.
export function safeNext(value: string | null) {
  return value && value.startsWith('/') && !value.startsWith('//') && !value.startsWith('/\\') ? value : null
}
