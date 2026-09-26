'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import AuthShell from '@/components/auth/AuthShell'
import { FormAlert, PasswordField } from '@/components/ui/Field'
import { button } from '@/components/ui/styles'
import { authErrorMessage, resetPassword } from '@/lib/auth'
import { useI18n } from '@/i18n/client'

function ResetForm() {
  const params = useSearchParams()
  const token = params.get('token') ?? ''
  const { t } = useI18n()
  const copy = t.auth.reset
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    if (password !== confirm) return setError(copy.mismatch)
    setBusy(true)
    try {
      await resetPassword(token, password)
      setDone(true)
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">{copy.doneTitle}</h1>
        <p className="mt-3 text-[15px] leading-6 text-ink-500">{copy.doneBody}</p>
        <Link href="/sign-in" className={`${button.primary} mt-8 min-h-12 w-full text-[15px]`}>{copy.signIn}</Link>
      </>
    )
  }

  if (!token) {
    return (
      <>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">{copy.title}</h1>
        <div className="mt-6"><FormAlert>{copy.missing}</FormAlert></div>
        <Link href="/forgot-password" className={`${button.primary} mt-8 min-h-12 w-full text-[15px]`}>{copy.requestNew}</Link>
      </>
    )
  }

  return (
    <>
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">{copy.title}</h1>
      <p className="mt-2 text-[15px] leading-6 text-ink-500">{copy.subtitle}</p>
      <form onSubmit={submit} className="mt-8 space-y-5">
        <PasswordField label={copy.password} name="new-password" autoComplete="new-password" required minLength={8} value={password} onChange={event => setPassword(event.target.value)} />
        <PasswordField label={copy.confirm} name="confirm-password" autoComplete="new-password" required minLength={8} value={confirm} onChange={event => setConfirm(event.target.value)} />
        {error && <FormAlert>{error}</FormAlert>}
        <button type="submit" disabled={busy} className={`${button.primary} min-h-12 w-full text-[15px]`}>
          {busy ? copy.submitting : copy.submit}
        </button>
      </form>
      <p className="mt-8 text-center text-[15px]">
        <Link href="/forgot-password" className={button.link}>{copy.requestNew}</Link>
      </p>
    </>
  )
}

export default function ResetPasswordPage() {
  const copy = useI18n().t.auth.reset
  return (
    <AuthShell image="/images/auth-recovery.webp" caption={copy.caption} captionDetail={copy.captionDetail}>
      <Suspense>
        <ResetForm />
      </Suspense>
    </AuthShell>
  )
}
