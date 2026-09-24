'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthShell from '@/components/auth/AuthShell'
import GoogleButton from '@/components/auth/GoogleButton'
import { Field, FormAlert, OrDivider, PasswordField } from '@/components/ui/Field'
import { button } from '@/components/ui/styles'
import { authErrorMessage, completeRedirectSignIn, signIn, signInWithGoogle, useAuth, type AuthUser } from '@/lib/auth'
import { safeNext, workspaceHref } from '@/lib/authRoutes'
import { useActivityTracker } from '@/lib/activityTracker'
import { useI18n } from '@/i18n/client'

function SignInForm() {
  const router = useRouter()
  const params = useSearchParams()
  const tracker = useActivityTracker()
  const { t } = useI18n()
  const copy = t.auth.signIn
  const { user, isSignedIn, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState<'' | 'email' | 'google'>('')
  const [error, setError] = useState('')

  const next = safeNext(params.get('next'))
  const go = (signedIn: AuthUser | null) => router.replace(next || workspaceHref(signedIn))

  useEffect(() => {
    completeRedirectSignIn()
      .then(result => result && go(result))
      .catch(cause => setError(authErrorMessage(cause, t.errors.auth, t.errors.generic)))
  }, [])

  useEffect(() => {
    if (!loading && isSignedIn && !busy) go(user)
  }, [loading, isSignedIn])

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy('email')
    setError('')
    try {
      const signedIn = await signIn({ email, password })
      tracker.log('auth_signin', 'User logged in', email)
      go(signedIn)
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, copy.failed))
      tracker.log('auth_signin', 'failed', (cause as any)?.code || 'Unknown error')
      setBusy('')
    }
  }

  const google = async () => {
    setBusy('google')
    setError('')
    try {
      const signedIn = await signInWithGoogle()
      if (!signedIn) return // redirect fallback in progress
      tracker.log('auth_signin', 'google sign in')
      go(signedIn)
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
      setBusy('')
    }
  }

  return (
    <>
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">{copy.title}</h1>
      <p className="mt-2 text-[15px] leading-6 text-ink-500">{copy.subtitle}</p>

      <div className="mt-8">
        <GoogleButton onClick={google} busy={busy === 'google'} />
      </div>
      <OrDivider />

      <form onSubmit={submit} className="space-y-5">
        <Field label={copy.email} type="email" name="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder={t.auth.emailPlaceholder} />
        <PasswordField
          label={copy.password}
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={event => setPassword(event.target.value)}
          action={<Link href="/forgot-password" className="text-sm font-semibold text-brand-600 hover:underline">{copy.forgot}</Link>}
        />
        {error && <FormAlert>{error}</FormAlert>}
        <button type="submit" disabled={!!busy} className={`${button.primary} min-h-12 w-full text-[15px]`}>
          {busy === 'email' ? copy.submitting : copy.submit}
        </button>
      </form>

      <p className="mt-8 text-center text-[15px] text-ink-500">
        {copy.newHere} <Link href="/register" className={button.link}>{copy.register}</Link>
      </p>
    </>
  )
}

export default function SignInPage() {
  const copy = useI18n().t.auth.signIn
  return (
    <AuthShell image="/images/auth-sign-in.webp" caption={copy.caption} captionDetail={copy.captionDetail}>
      <Suspense>
        <SignInForm />
      </Suspense>
    </AuthShell>
  )
}
