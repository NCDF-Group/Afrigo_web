'use client'

import { useState } from 'react'
import Link from 'next/link'
import { sendPasswordResetEmail } from 'firebase/auth'
import AuthShell from '@/components/auth/AuthShell'
import { Field, FormAlert } from '@/components/ui/Field'
import { button } from '@/components/ui/styles'
import { authErrorMessage } from '@/lib/auth'
import { firebaseAuth } from '@/lib/firebaseClient'
import { useI18n } from '@/i18n/client'

export default function ForgotPasswordPage() {
  const { locale, t } = useI18n()
  const copy = t.auth.forgot
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      if (!firebaseAuth) throw Object.assign(new Error('not-configured'), { code: 'app/not-configured' })
      firebaseAuth.languageCode = locale // reset email arrives in the page language
      await sendPasswordResetEmail(firebaseAuth, email.trim().toLowerCase())
      setSent(true)
    } catch (cause: any) {
      // Don't reveal whether an account exists for this email.
      if (cause?.code === 'auth/user-not-found') setSent(true)
      else setError(cause?.code === 'app/not-configured' ? copy.notConfigured : authErrorMessage(cause, t.errors.auth, t.errors.generic))
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthShell image="/images/auth-recovery.webp" caption={copy.caption} captionDetail={copy.captionDetail}>
      {sent ? (
        <>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">{copy.sentTitle}</h1>
          <p className="mt-3 text-[15px] leading-6 text-ink-500">
            {copy.sentBefore} <strong className="text-ink-900">{email}</strong>{copy.sentAfter}
          </p>
          <div className="mt-8 grid gap-3">
            <Link href="/sign-in" className={`${button.primary} min-h-12 text-[15px]`}>{copy.back}</Link>
            <button type="button" onClick={() => setSent(false)} className={`${button.secondary} min-h-12 text-[15px]`}>{copy.different}</button>
          </div>
        </>
      ) : (
        <>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">{copy.title}</h1>
          <p className="mt-2 text-[15px] leading-6 text-ink-500">{copy.subtitle}</p>
          <form onSubmit={submit} className="mt-8 space-y-5">
            <Field label={copy.email} type="email" name="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder={t.auth.emailPlaceholder} />
            {error && <FormAlert>{error}</FormAlert>}
            <button type="submit" disabled={busy} className={`${button.primary} min-h-12 w-full text-[15px]`}>
              {busy ? copy.submitting : copy.submit}
            </button>
          </form>
          <p className="mt-8 text-center text-[15px] text-ink-500">
            {copy.remembered} <Link href="/sign-in" className={button.link}>{copy.signIn}</Link>
          </p>
        </>
      )}
    </AuthShell>
  )
}
