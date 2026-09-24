'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthShell from '@/components/auth/AuthShell'
import GoogleButton from '@/components/auth/GoogleButton'
import { Field, FormAlert, OrDivider, PasswordField } from '@/components/ui/Field'
import { button } from '@/components/ui/styles'
import { authErrorMessage, completeRedirectSignIn, signInWithGoogle, signUp } from '@/lib/auth'
import { workspaceHref } from '@/lib/authRoutes'
import { useActivityTracker } from '@/lib/activityTracker'
import { useI18n } from '@/i18n/client'

export default function RegisterPage() {
  const router = useRouter()
  const tracker = useActivityTracker()
  const { t } = useI18n()
  const copy = t.auth.register
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [busy, setBusy] = useState<'' | 'email' | 'google'>('')
  const [error, setError] = useState('')

  useEffect(() => {
    completeRedirectSignIn()
      .then(result => result && router.replace(workspaceHref(result)))
      .catch(cause => setError(authErrorMessage(cause, t.errors.auth, t.errors.generic)))
  }, [router])

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    if (password.length < 8) return setError(copy.passwordShort)
    if (!agreed) return setError(copy.mustAgree)
    setBusy('email')
    try {
      const result = await signUp({ firstName, lastName, email, password })
      tracker.log('auth_signup', `${firstName} ${lastName}`, email)
      router.replace(workspaceHref(result.user))
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, copy.failed))
      tracker.log('auth_signup', 'failed', (cause as any)?.code || 'Unknown error')
      setBusy('')
    }
  }

  const google = async () => {
    setBusy('google')
    setError('')
    try {
      const signedIn = await signInWithGoogle()
      if (!signedIn) return
      tracker.log('auth_signup', 'google sign up')
      router.replace(workspaceHref(signedIn))
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
      setBusy('')
    }
  }

  return (
    <AuthShell image="/images/auth-register.webp" caption={copy.caption} captionDetail={copy.captionDetail}>
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">{copy.title}</h1>
      <p className="mt-2 text-[15px] leading-6 text-ink-500">{copy.subtitle}</p>

      <div className="mt-8">
        <GoogleButton onClick={google} busy={busy === 'google'} label={t.auth.google.signUp} />
      </div>
      <OrDivider />

      <form onSubmit={submit} className="space-y-5">
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
          {busy === 'email' ? copy.submitting : copy.submit}
        </button>
      </form>

      <p className="mt-8 text-center text-[15px] text-ink-500">
        {copy.already} <Link href="/sign-in" className={button.link}>{copy.signIn}</Link>
      </p>
    </AuthShell>
  )
}
