'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Logo from '@/components/brand/Logo'
import { button } from '@/components/ui/styles'
import { useAuth } from '@/lib/auth'
import { smoothScroll } from '@/lib/smoothScroll'
import { useI18n } from '@/i18n/client'
import { workspaceHref } from '@/lib/authRoutes'
import { siteNav } from './nav'

export default function SiteHeader() {
  const pathname = usePathname()
  const { user, isSignedIn } = useAuth()
  const { t } = useI18n()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    smoothScroll.stop()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      smoothScroll.start()
    }
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex h-16 max-w-site items-center justify-between gap-6 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Logo />

        <nav aria-label={t.nav.main} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {siteNav.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`relative block whitespace-nowrap rounded-input px-3 py-2 text-[15px] font-semibold transition-colors hover:text-brand-600 ${isActive(item.href) ? 'text-brand-600 after:absolute after:inset-x-3 after:-bottom-[15px] after:h-0.5 after:bg-accent-500' : 'text-ink-700'}`}
                >
                  {t.nav.items[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {isSignedIn ? (
            <Link href={workspaceHref(user)} className={`${button.primary} hidden whitespace-nowrap sm:inline-flex`}>
              {t.nav.openDashboard}
            </Link>
          ) : (
            <>
              <Link href="/sign-in" className="whitespace-nowrap rounded-input px-3 py-2 text-sm font-bold text-ink-900 hover:text-brand-600">
                {t.nav.signIn}
              </Link>
              <Link href="/register" className={`${button.primary} hidden whitespace-nowrap sm:inline-flex`}>
                {t.nav.register}
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t.nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-input text-ink-900 hover:bg-subtle xl:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" data-lenis-prevent role="dialog" aria-modal="true" aria-label={t.nav.menu} className="fixed inset-0 z-50 flex flex-col bg-white xl:hidden">
          <div className="flex h-16 items-center justify-between border-b border-line px-4 sm:px-6">
            <Logo />
            <button
              type="button"
              autoFocus
              onClick={() => setOpen(false)}
              aria-label={t.nav.closeMenu}
              className="inline-flex h-11 w-11 items-center justify-center rounded-input text-ink-900 hover:bg-subtle"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <nav aria-label={t.nav.mobile} className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
            <ul className="divide-y divide-line">
              {[...siteNav.map(item => ({ href: item.href, label: t.nav.items[item.key] })), { href: '/contact', label: t.nav.contact }].map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`block py-4 font-display text-lg font-semibold ${isActive(item.href) ? 'text-brand-600' : 'text-ink-900'}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-3 border-t border-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
            {isSignedIn ? (
              <Link href={workspaceHref(user)} className={button.primary}>{t.nav.openDashboard}</Link>
            ) : (
              <>
                <Link href="/register" className={button.primary}>{t.nav.register}</Link>
                <Link href="/sign-in" className={button.secondary}>{t.nav.signIn}</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
