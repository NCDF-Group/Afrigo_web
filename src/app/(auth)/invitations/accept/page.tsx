'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import AuthShell from '@/components/auth/AuthShell'
import { FormAlert } from '@/components/ui/Field'
import { button } from '@/components/ui/styles'
import { acceptInvitation, authErrorMessage, useAuth } from '@/lib/auth'
import { fmt } from '@/i18n/config'
import { useI18n } from '@/i18n/client'

function Accept() {
  const token = useSearchParams().get('token') ?? ''
  const { t } = useI18n()
  const copy = t.auth.invite
  const { isSignedIn, loading } = useAuth()
  const [joined, setJoined] = useState<string | null>(null)
  const [error, setError] = useState('')
  const started = useRef(false)
  const here = `/invitations/accept?token=${encodeURIComponent(token)}`

  useEffect(() => {
    if (loading || !isSignedIn || !token || started.current) return
    started.current = true
    acceptInvitation(token)
      .then(result => setJoined(result.organisation.name))
      .catch(cause => setError(authErrorMessage(cause, t.errors.auth, t.errors.generic)))
  }, [loading, isSignedIn, token])

  if (loading) return <p className="text-[15px] text-ink-500" role="status">{copy.accepting}</p>

  if (!isSignedIn) {
    return (
      <>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">{copy.title}</h1>
        <p className="mt-3 text-[15px] leading-6 text-ink-500">{copy.signInFirst}</p>
        <div className="mt-8 grid gap-3">
          <Link href={`/sign-in?next=${encodeURIComponent(here)}`} className={`${button.primary} min-h-12 text-[15px]`}>{copy.signIn}</Link>
          <Link href={`/register?next=${encodeURIComponent(here)}`} className={`${button.secondary} min-h-12 text-[15px]`}>{copy.register}</Link>
        </div>
      </>
    )
  }

  if (joined) {
    return (
      <>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">{fmt(copy.doneTitle, { name: joined })}</h1>
        <p className="mt-3 text-[15px] leading-6 text-ink-500">{copy.doneBody}</p>
        <Link href="/account" className={`${button.primary} mt-8 min-h-12 w-full text-[15px]`}>{copy.continue}</Link>
      </>
    )
  }

  if (error || !token) {
    return (
      <>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">{copy.failedTitle}</h1>
        <div className="mt-6"><FormAlert>{error || t.errors.auth.INVALID_TOKEN || t.errors.generic}</FormAlert></div>
        <Link href="/account" className={`${button.secondary} mt-8 min-h-12 w-full text-[15px]`}>{copy.continue}</Link>
      </>
    )
  }

  return <p className="text-[15px] text-ink-500" role="status">{copy.accepting}</p>
}

export default function AcceptInvitationPage() {
  const copy = useI18n().t.auth.invite
  return (
    <AuthShell image="/images/auth-register.webp" caption={copy.caption} captionDetail={copy.captionDetail}>
      <Suspense>
        <Accept />
      </Suspense>
    </AuthShell>
  )
}
