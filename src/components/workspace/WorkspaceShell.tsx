'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Logo from '@/components/brand/Logo'
import { Spinner } from '@/components/ui/Busy'
import Icon, { type IconName } from '@/components/ui/Icon'
import Skeleton from '@/components/ui/Skeleton'
import { signOut, useAuth } from '@/lib/auth'
import { ThemeScope } from '@/lib/theme'
import { useCurrentMembership, type Organisation } from '@/lib/workspace'
import { useI18n } from '@/i18n/client'
import StatusBadge from './StatusBadge'
import ThemeSwitcher from './ThemeSwitcher'

const NAV: { href: string; key: 'home' | 'business' | 'team' | 'account'; icon: IconName }[] = [
  { href: '/app', key: 'home', icon: 'layers' },
  { href: '/app/business', key: 'business', icon: 'building' },
  { href: '/app/team', key: 'team', icon: 'users' },
  { href: '/app/account', key: 'account', icon: 'user' }
]

export const initials = (first?: string, last?: string) => `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase() || 'A'

function ShellSkeleton() {
  return (
    <div className="min-h-[100svh] bg-canvas lg:flex" aria-busy="true">
      <ThemeScope />
      <aside className="hidden w-64 shrink-0 flex-col gap-4 border-r border-line bg-surface p-5 lg:flex">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-24 w-full rounded-card" />
        {Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="h-10 w-full" />)}
      </aside>
      <div className="flex-1">
        <div className="flex h-16 items-center justify-between border-b border-line bg-surface px-4 lg:hidden">
          <Skeleton className="h-7 w-28" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <div className="mx-auto max-w-5xl space-y-6 px-4 pt-6 sm:px-6 lg:px-10 lg:pt-10">
          <Skeleton className="h-9 w-2/3 sm:w-80" />
          <Skeleton className="h-5 w-1/2 sm:w-64" />
          <Skeleton className="h-24 w-full rounded-card" />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="h-28 rounded-card" />)}
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
            <Skeleton className="h-72 rounded-card" />
            <Skeleton className="h-72 rounded-card" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useI18n()
  const copy = t.workspace.shell
  const { user, loading, isSignedIn } = useAuth()
  const { membership, organisations, select } = useCurrentMembership()
  const leaving = useRef(false)
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    if (loading || leaving.current) return
    if (!isSignedIn) router.replace(`/sign-in?next=${encodeURIComponent(pathname)}`)
    else if (!user?.emailVerified) router.replace('/verify-email')
    else if (!organisations.length) router.replace('/app/setup')
  }, [loading, isSignedIn, user?.emailVerified, organisations.length])

  const active = (href: string) => (href === '/app' ? pathname === '/app' : pathname.startsWith(href))

  const leave = async () => {
    leaving.current = true
    setSigningOut(true)
    await signOut()
    router.replace('/')
  }

  if (!user || !membership) return <ShellSkeleton />

  return (
    <div className="min-h-[100svh] bg-canvas lg:flex">
      <ThemeScope />
      <aside className="sticky top-0 hidden h-[100svh] w-64 shrink-0 flex-col border-r border-line bg-surface lg:flex">
        <div className="flex h-[72px] items-center px-6"><Logo href="/app" adaptive /></div>
        <div className="mx-4 rounded-card border border-line bg-subtle/60 p-4">
          {organisations.length > 1 ? (
            <select aria-label={membership.name} value={membership.organisationId} onChange={event => select(event.target.value)} className="w-full truncate bg-transparent text-[15px] font-bold text-ink-900 focus:outline-none">
              {organisations.map(item => <option key={item.organisationId} value={item.organisationId}>{item.name}</option>)}
            </select>
          ) : (
            <p className="truncate text-[15px] font-bold text-ink-900">{membership.name}</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusBadge status={membership.verificationStatus as Organisation['verificationStatus']} />
            <span className="text-xs font-semibold text-ink-500">{t.workspace.roles[membership.role]}</span>
          </div>
        </div>
        <nav aria-label={copy.menu} className="mt-4 flex-1 overflow-y-auto px-3">
          <ul className="space-y-1">
            {NAV.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active(item.href) ? 'page' : undefined}
                  className={`group relative flex items-center gap-3 rounded-input px-3 py-2.5 text-[15px] font-semibold transition-colors ${active(item.href) ? 'bg-brand-50 text-brand-700 dark:text-accent-400' : 'text-ink-700 hover:bg-subtle hover:text-ink-900'}`}
                >
                  {active(item.href) && <span aria-hidden="true" className="absolute inset-y-2 left-0 w-1 rounded-full bg-brand-600 dark:bg-accent-500" />}
                  <Icon name={item.icon} className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
                  {copy.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-3 border-t border-line p-4">
          <ThemeSwitcher className="w-full" />
          <div className="flex items-center gap-3">
            <Link href="/app/account" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white dark:bg-accent-500 dark:text-brand-950">{initials(user.firstName, user.lastName)}</Link>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-ink-900">{user.displayName}</span>
              <span className="block truncate text-xs text-ink-500">{user.email}</span>
            </span>
            <button type="button" onClick={() => void leave()} disabled={signingOut} aria-label={copy.signOut} title={copy.signOut} className="grid h-9 w-9 place-items-center rounded-input text-ink-500 transition-colors hover:bg-subtle hover:text-ink-900">
              {signingOut ? <Spinner /> : <Icon name="logout" className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-line bg-surface/90 px-4 backdrop-blur-lg lg:hidden">
          <Logo href="/app" adaptive className="h-8" />
          <span className="flex min-w-0 items-center gap-2">
            <span className="hidden max-w-[40vw] truncate text-sm font-bold text-ink-900 min-[400px]:block">{membership.name}</span>
            <Link href="/app/account" aria-label={copy.nav.account} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-600 text-[11px] font-bold text-white dark:bg-accent-500 dark:text-brand-950">{initials(user.firstName, user.lastName)}</Link>
          </span>
        </header>
        <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12 lg:pt-10">{children}</main>
      </div>

      <nav aria-label={copy.menu} className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg lg:hidden">
        <ul className="grid grid-cols-4">
          {NAV.map(item => (
            <li key={item.href}>
              <Link href={item.href} aria-current={active(item.href) ? 'page' : undefined} className={`relative flex min-h-[60px] flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors ${active(item.href) ? 'text-brand-600 dark:text-accent-400' : 'text-ink-500'}`}>
                {active(item.href) && <span aria-hidden="true" className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-brand-600 dark:bg-accent-500" />}
                <Icon name={item.icon} className="h-5 w-5" />
                <span className="max-w-full truncate px-1">{copy.nav[item.key]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
