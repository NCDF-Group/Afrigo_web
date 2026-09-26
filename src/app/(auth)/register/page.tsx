'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthShell from '@/components/auth/AuthShell'
import GoogleSignIn, { googleEnabled } from '@/components/auth/GoogleSignIn'
import { Field, FormAlert, OrDivider, PasswordField } from '@/components/ui/Field'
import { BusyLabel } from '@/components/ui/Busy'
import { button } from '@/components/ui/styles'
import { authErrorMessage, signInWithGoogle, signUp } from '@/lib/auth'
import { safeNext, workspaceHref } from '@/lib/authRoutes'
import { useActivityTracker } from '@/lib/activityTracker'
import { useI18n } from '@/i18n/client'

const strongEnough = (value: string) => value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value)

function RegisterForm() {
  const router = useRouter()
  const params = useSearchParams()
  const tracker = useActivityTracker()
  const { locale, t } = useI18n()
  const copy = t.auth.register
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [busy, setBusy] = useState<'' | 'email' | 'google'>('')
  const [error, setError] = useState('')
  const next = safeNext(params.get('next'))

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    if (!strongEnough(password)) return setError(copy.passwordShort)
    if (!agreed) return setError(copy.mustAgree)
    setBusy('email')
    try {
      const result = await signUp({ firstName, lastName, email, password, locale })
      tracker.log('auth_signup', 'Created account')
      router.replace(next || workspaceHref(result.user))
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, copy.failed))
      setBusy('')
    }
  }

  const google = async (idToken: string) => {
    setBusy('google')
    setError('')
    try {
      const result = await signInWithGoogle(idToken)
      if (!('user' in result)) {
        router.replace('/sign-in')
        return
      }
      tracker.log('auth_signup', 'google sign up')
      router.replace(next || workspaceHref(result.user))
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
      setBusy('')
    }
  }

  return (
    <>
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">{copy.title}</h1>
      <p className="mt-2 text-[15px] leading-6 text-ink-500">{copy.subtitle}</p>

      {googleEnabled && (
        <>
          <div className="mt-8">
            <GoogleSignIn mode="signup" onCredential={idToken => void google(idToken)} />
          </div>
          <OrDivider />
        </>
      )}

      <form onSubmit={submit} className={`space-y-5 ${googleEnabled ? '' : 'mt-8'}`}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={copy.firstName} name="given-name" autoComplete="given-name" required value={firstName} onChange={event => setFirstName(event.target.value)} />
          <Field label={copy.lastName} name="family-name" autoComplete="family-name" required value={lastName} onChange={event => setLastName(event.target.value)} />
        </div>
        <Field label={copy.email} type="email" name="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder={t.auth.emailPlaceholder} />
        <PasswordField
          label={copy.password}
          name="new-password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={event => setPassword(event.target.value)}
          hint={copy.passwordHint}
        />
        <label className="flex items-start gap-3 text-sm leading-6 text-ink-700">
          <input type="checkbox" checked={agreed} onChange={event => setAgreed(event.target.checked)} className="mt-1 h-4 w-4 shrink-0 rounded border-line-strong accent-brand-600" />
          <span>
            {copy.agreeBefore} <Link href="/terms" className={button.link}>{copy.terms}</Link> {copy.and} <Link href="/privacy" className={button.link}>{copy.privacy}</Link>.
          </span>
        </label>
        {error && <FormAlert>{error}</FormAlert>}
        <button type="submit" disabled={!!busy} className={`${button.primary} min-h-12 w-full text-[15px]`}>
          <BusyLabel busy={busy === 'email'} label={copy.submit} busyLabel={copy.submitting} />
        </button>
      </form>

      <p className="mt-8 text-center text-[15px] text-ink-500">
        {copy.already} <Link href={next ? `/sign-in?next=${encodeURIComponent(next)}` : '/sign-in'} className={button.link}>{copy.signIn}</Link>
      </p>
    </>
  )
}

export default function RegisterPage() {
  const copy = useI18n().t.auth.register
  return (
    <AuthShell image="/images/auth-register.webp" caption={copy.caption} captionDetail={copy.captionDetail}>
      <Suspense>
        <RegisterForm />
      </Suspense>
    </AuthShell>
  )
}
