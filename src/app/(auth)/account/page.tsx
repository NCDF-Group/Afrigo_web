'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthShell from '@/components/auth/AuthShell'
import { FormAlert } from '@/components/ui/Field'
import { BusyLabel } from '@/components/ui/Busy'
import { button } from '@/components/ui/styles'
import { authErrorMessage, myOrganisations, requestEmailVerification, signOut, signOutEverywhere, useAuth, type Membership } from '@/lib/auth'
import { fmt } from '@/i18n/config'
import { useI18n } from '@/i18n/client'

export default function AccountPage() {
  const router = useRouter()
  const { t } = useI18n()
  const copy = t.auth.account
  const { user, loading, isSignedIn } = useAuth()
  const [organisations, setOrganisations] = useState<Membership[] | null>(null)
  const [busy, setBusy] = useState<'' | 'resend' | 'signout' | 'everywhere'>('')
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const leaving = useRef(false)

  useEffect(() => {
    if (loading || leaving.current) return
    if (!isSignedIn) router.replace('/sign-in?next=/account')
    else if (user?.emailVerified && user.organisations.length) router.replace('/app/account')
  }, [loading, isSignedIn, user, router])

  useEffect(() => {
    if (!isSignedIn) return
    myOrganisations()
      .then(setOrganisations)
      .catch(() => setOrganisations([]))
  }, [isSignedIn])

  const run = async (kind: 'resend' | 'signout' | 'everywhere', action: () => Promise<unknown>, after?: () => void) => {
    if (kind !== 'resend') leaving.current = true
    setBusy(kind)
    setError('')
    setNotice('')
    try {
      await action()
      after?.()
    } catch (cause) {
      leaving.current = false
      setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
    } finally {
      setBusy('')
    }
  }

  const leave = () => router.replace('/')

  return (
    <AuthShell image="/images/auth-register.webp" caption={copy.caption} captionDetail={copy.captionDetail}>
      {!user ? (
        <div className="space-y-3" aria-busy="true">
          <div className="h-9 w-2/3 animate-pulse rounded-input bg-subtle" />
          <div className="h-5 w-1/2 animate-pulse rounded-input bg-subtle" />
          <div className="h-28 w-full animate-pulse rounded-card bg-subtle" />
        </div>
      ) : (
        <>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">{fmt(copy.greeting, { name: user.firstName || user.displayName })}</h1>
          <p className="mt-2 text-[15px] leading-6 text-ink-500">{copy.subtitle}</p>

          <section className="mt-8 rounded-card border border-line p-5">
            {user.emailVerified ? (
              <p className="flex items-center gap-2 text-[15px] font-semibold text-success">
                <span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded-full bg-success-soft text-xs">✓</span>
                {copy.verified}
              </p>
            ) : (
              <>
                <h2 className="font-display text-lg font-bold text-ink-900">{copy.verifyTitle}</h2>
                <p className="mt-1.5 text-[15px] leading-6 text-ink-500">{fmt(copy.verifyBody, { email: user.email })}</p>
                <button type="button" disabled={!!busy} onClick={() => void run('resend', requestEmailVerification, () => setNotice(copy.resent))} className={`${button.secondary} mt-4 min-h-11 w-full text-[15px]`}>
                  <BusyLabel busy={busy === 'resend'} label={copy.resend} busyLabel={copy.resending} />
                </button>
              </>
            )}
          </section>

          <section className="mt-4 rounded-card border border-line p-5">
            <h2 className="font-display text-lg font-bold text-ink-900">{copy.businessesTitle}</h2>
            {organisations === null ? (
              <div className="mt-3 h-12 animate-pulse rounded-input bg-subtle" />
            ) : organisations.length ? (
              <ul className="mt-3 divide-y divide-line">
                {organisations.map(item => (
                  <li key={item.organisationId} className="flex items-center justify-between gap-3 py-3 text-[15px]">
                    <span className="font-semibold text-ink-900">{item.name}</span>
                    <span className="text-sm text-ink-500">{copy.roles[item.role]}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1.5 text-[15px] leading-6 text-ink-500">{copy.noBusiness}</p>
            )}
          </section>

          <div className="mt-6 space-y-3">
            {notice && <FormAlert tone="success">{notice}</FormAlert>}
            {error && <FormAlert>{error}</FormAlert>}
          </div>

          <div className="mt-6 grid gap-3">
            {user.emailVerified && organisations !== null && (
              <Link href={organisations.length ? '/app' : '/app/setup'} className={`${button.primary} min-h-12 text-[15px]`}>
                {organisations.length ? copy.openWorkspace : copy.setupBusiness}
              </Link>
            )}
            <button type="button" disabled={!!busy} onClick={() => void run('signout', signOut, leave)} className={`${button.secondary} min-h-12 text-[15px]`}>
              <BusyLabel busy={busy === 'signout'} label={copy.signOut} busyLabel={copy.signingOut} />
            </button>
            <button type="button" disabled={!!busy} onClick={() => void run('everywhere', signOutEverywhere, leave)} className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-ink-500 hover:text-ink-900">
              <BusyLabel busy={busy === 'everywhere'} label={copy.signOutEverywhere} busyLabel={copy.signingOut} />
            </button>
          </div>
        </>
      )}
    </AuthShell>
  )
}
