'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import AuthShell from '@/components/auth/AuthShell'
import { button } from '@/components/ui/styles'
import { useAuth, verifyEmail } from '@/lib/auth'
import { useI18n } from '@/i18n/client'

function Verify() {
  const token = useSearchParams().get('token') ?? ''
  const { t } = useI18n()
  const copy = t.auth.verify
  const { isSignedIn } = useAuth()
  const [status, setStatus] = useState<'working' | 'done' | 'failed'>(token ? 'working' : 'failed')
  const started = useRef(false)

  useEffect(() => {
    if (!token || started.current) return
    started.current = true
    verifyEmail(token)
      .then(() => setStatus('done'))
      .catch(() => setStatus('failed'))
  }, [token])

  if (status === 'working') return <p className="text-[15px] text-ink-500" role="status">{copy.verifying}</p>

  const done = status === 'done'
  return (
    <>
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">{done ? copy.doneTitle : copy.failedTitle}</h1>
      <p className="mt-3 text-[15px] leading-6 text-ink-500">{done ? copy.doneBody : copy.failedBody}</p>
      <Link href={isSignedIn ? '/account' : '/sign-in?next=/account'} className={`${button.primary} mt-8 min-h-12 w-full text-[15px]`}>
        {isSignedIn ? copy.continue : copy.signIn}
      </Link>
    </>
  )
}

export default function VerifyEmailPage() {
  const copy = useI18n().t.auth.verify
  return (
    <AuthShell image="/images/auth-sign-in.webp" caption={copy.caption} captionDetail={copy.captionDetail}>
      <Suspense>
        <Verify />
      </Suspense>
    </AuthShell>
  )
}
