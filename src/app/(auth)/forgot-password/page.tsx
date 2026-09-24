'use client'

import { useState } from 'react'
import Link from 'next/link'
import { sendPasswordResetEmail } from 'firebase/auth'
import AuthShell from '@/components/auth/AuthShell'
import { Field, FormAlert } from '@/components/ui/Field'
import { button } from '@/components/ui/styles'
import { authErrorMessage } from '@/lib/auth'
import { firebaseAuth } from '@/lib/firebaseClient'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      if (!firebaseAuth) throw new Error('Firebase Authentication is not configured.')
      await sendPasswordResetEmail(firebaseAuth, email.trim().toLowerCase())
      setSent(true)
    } catch (cause: any) {
      // Don't reveal whether an account exists for this email.
      if (cause?.code === 'auth/user-not-found') setSent(true)
      else setError(authErrorMessage(cause))
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthShell image="/images/auth-recovery.webp" caption="Your trade records stay protected." captionDetail="Recovery links are time-limited and sent only to the account's email address.">
      {sent ? (
        <>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">Check your email</h1>
          <p className="mt-3 text-[15px] leading-6 text-ink-500">
            If an account exists for <strong className="text-ink-900">{email}</strong>, you&apos;ll receive a link to reset your password. It may take a few minutes — check your spam folder too.
          </p>
          <div className="mt-8 grid gap-3">
            <Link href="/sign-in" className={`${button.primary} min-h-12 text-[15px]`}>Back to sign in</Link>
            <button type="button" onClick={() => setSent(false)} className={`${button.secondary} min-h-12 text-[15px]`}>Use a different email</button>
          </div>
        </>
      ) : (
        <>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">Reset your password</h1>
          <p className="mt-2 text-[15px] leading-6 text-ink-500">Enter the email you registered with and we&apos;ll send you a secure reset link.</p>
          <form onSubmit={submit} className="mt-8 space-y-5">
            <Field label="Work email" type="email" name="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder="you@company.com" />
            {error && <FormAlert>{error}</FormAlert>}
            <button type="submit" disabled={busy} className={`${button.primary} min-h-12 w-full text-[15px]`}>
              {busy ? 'Sending link…' : 'Send reset link'}
            </button>
          </form>
          <p className="mt-8 text-center text-[15px] text-ink-500">
            Remembered it? <Link href="/sign-in" className={button.link}>Sign in</Link>
          </p>
        </>
      )}
    </AuthShell>
  )
}
