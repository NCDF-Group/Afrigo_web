'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthShell from '@/components/auth/AuthShell'
import Icon from '@/components/ui/Icon'
import { FormAlert } from '@/components/ui/Field'
import { BusyLabel } from '@/components/ui/Busy'
import { button } from '@/components/ui/styles'
import { authErrorMessage, reloadAccount, requestEmailVerification, signOut, useAuth, verifyEmail } from '@/lib/auth'
import { workspaceHref } from '@/lib/authRoutes'
import { fmt } from '@/i18n/config'
import { useI18n } from '@/i18n/client'

const COOLDOWN = 60
const POLL_MS = 5000

function MailBadge({ done }: { done?: boolean }) {
  return (
    <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-brand-50 text-brand-600 sm:mx-0 dark:text-accent-400">
      <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-brand-100 opacity-40 [animation-duration:2.4s]" />
      <Icon name={done ? 'check' : 'mail'} className="relative h-10 w-10" />
    </div>
  )
}

function CheckInbox() {
  const router = useRouter()
  const { t } = useI18n()
  const copy = t.workspace.checkInbox
  const { user, loading, isSignedIn } = useAuth()
  const [cooldown, setCooldown] = useState(COOLDOWN)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (loading || leaving) return
    if (!isSignedIn) router.replace('/sign-in?next=/verify-email')
    else if (user?.emailVerified) {
      const timer = setTimeout(() => router.replace(workspaceHref(user)), 1200)
      return () => clearTimeout(timer)
    }
  }, [loading, isSignedIn, user?.emailVerified])

  useEffect(() => {
    if (!isSignedIn || user?.emailVerified) return
    const check = () => document.visibilityState === 'visible' && void reloadAccount()
    const interval = setInterval(check, POLL_MS)
    window.addEventListener('focus', check)
    return () => {
      clearInterval(interval)
      window.removeEventListener('focus', check)
    }
  }, [isSignedIn, user?.emailVerified])

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  const resend = async () => {
    setBusy(true)
    setError('')
    setNotice('')
    try {
      await requestEmailVerification()
      setNotice(copy.resent)
      setCooldown(COOLDOWN)
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
    } finally {
      setBusy(false)
    }
  }

  const startOver = async () => {
    setLeaving(true)
    await signOut()
    router.replace('/register')
  }

  if (!user) {
    return (
      <div className="space-y-4" aria-busy="true">
        <div className="h-24 w-24 animate-pulse rounded-full bg-subtle" />
        <div className="h-9 w-3/4 animate-pulse rounded-input bg-subtle" />
        <div className="h-5 w-full animate-pulse rounded-input bg-subtle" />
      </div>
    )
  }

  if (user.emailVerified) {
    return (
      <div className="text-center sm:text-left" role="status">
        <MailBadge done />
        <p className="mt-6 text-[15px] font-semibold text-success">{copy.confirmed}</p>
      </div>
    )
  }

  return (
    <div className="text-center sm:text-left">
      <MailBadge />
      <h1 className="mt-7 font-display text-3xl font-bold tracking-tight text-ink-900">{fmt(copy.title, { name: user.firstName || user.displayName })}</h1>
      <p className="mt-3 text-[15px] leading-6 text-ink-500">{copy.sentTo}</p>
      <p className="mt-1 break-all text-[17px] font-bold text-ink-900">{user.email}</p>
      <p className="mt-3 text-[15px] leading-6 text-ink-500">{copy.next}</p>

      <ul className="mt-6 space-y-2.5 rounded-card border border-line bg-subtle/60 p-5 text-left text-sm leading-6 text-ink-700">
        {copy.tips.map(tip => (
          <li key={tip} className="flex gap-2.5">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
            {tip}
          </li>
        ))}
      </ul>

      <p className="mt-6 flex items-center justify-center gap-2.5 text-sm font-semibold text-ink-500 sm:justify-start" role="status">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-500" />
        </span>
        {copy.waiting}
      </p>

      <div className="mt-6 space-y-3">
        {notice && <FormAlert tone="success">{notice}</FormAlert>}
        {error && <FormAlert>{error}</FormAlert>}
        <button type="button" onClick={() => void resend()} disabled={busy || cooldown > 0} className={`${button.secondary} min-h-12 w-full text-[15px]`}>
          <BusyLabel busy={busy} label={cooldown > 0 ? fmt(copy.resendIn, { seconds: cooldown }) : copy.resend} />
        </button>
      </div>

      <p className="mt-6 text-sm text-ink-500">
        {copy.wrongEmail}{' '}
        <button type="button" onClick={() => void startOver()} disabled={leaving} className={`${button.link} inline-flex items-center gap-1.5`}>
          <BusyLabel busy={leaving} label={copy.startOver} />
        </button>
      </p>
    </div>
  )
}

function ConfirmLink({ token }: { token: string }) {
  const router = useRouter()
  const { t } = useI18n()
  const copy = t.auth.verify
  const { user, isSignedIn } = useAuth()
  const [status, setStatus] = useState<'working' | 'done' | 'failed'>('working')
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    verifyEmail(token)
      .then(() => setStatus('done'))
      .catch(() => setStatus('failed'))
  }, [token])

  useEffect(() => {
    if (status !== 'done' || !isSignedIn || !user?.emailVerified) return
    const timer = setTimeout(() => router.replace(workspaceHref(user)), 1500)
    return () => clearTimeout(timer)
  }, [status, isSignedIn, user?.emailVerified])

  if (status === 'working') {
    return (
      <div className="text-center sm:text-left" role="status">
        <MailBadge />
        <p className="mt-6 text-[15px] text-ink-500">{copy.verifying}</p>
      </div>
    )
  }

  const done = status === 'done'
  const href = isSignedIn ? (done && user ? workspaceHref(user) : '/verify-email') : '/sign-in'
  return (
    <div className="text-center sm:text-left">
      {done ? <MailBadge done /> : (
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-danger-soft text-danger sm:mx-0">
          <Icon name="mail" className="h-10 w-10" />
        </div>
      )}
      <h1 className="mt-7 font-display text-3xl font-bold tracking-tight text-ink-900">{done ? copy.doneTitle : copy.failedTitle}</h1>
      <p className="mt-3 text-[15px] leading-6 text-ink-500">{done ? copy.doneBody : copy.failedBody}</p>
      <Link href={href} className={`${button.primary} mt-8 min-h-12 w-full text-[15px]`}>
        {isSignedIn ? copy.continue : copy.signIn}
      </Link>
    </div>
  )
}

function Verify() {
  const token = useSearchParams().get('token')
  return token ? <ConfirmLink token={token} /> : <CheckInbox />
}

export default function VerifyEmailPage() {
  const copy = useI18n().t.workspace.checkInbox
  return (
    <AuthShell image="/images/auth-sign-in.webp" caption={copy.caption} captionDetail={copy.captionDetail}>
      <Suspense>
        <Verify />
      </Suspense>
    </AuthShell>
  )
}
