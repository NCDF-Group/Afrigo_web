'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthShell from '@/components/auth/AuthShell'
import GoogleSignIn, { googleEnabled } from '@/components/auth/GoogleSignIn'
import { Field, FormAlert, OrDivider, PasswordField } from '@/components/ui/Field'
import { button } from '@/components/ui/styles'
import { authErrorMessage, completeMfa, signIn, signInWithGoogle, useAuth, type AuthUser, type MfaStep } from '@/lib/auth'
import { safeNext, workspaceHref } from '@/lib/authRoutes'
import { useActivityTracker } from '@/lib/activityTracker'
import { useI18n } from '@/i18n/client'

function MfaForm({ step, onDone, onBack }: { step: MfaStep; onDone: (user: AuthUser) => void; onBack: () => void }) {
  const { t } = useI18n()
  const copy = t.auth.mfa
  const [recovery, setRecovery] = useState(false)
  const [value, setValue] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const toggle = () => {
    setRecovery(!recovery)
    setValue('')
    setError('')
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      onDone(await completeMfa(step.mfaToken, recovery ? { recoveryCode: value.trim() } : { code: value.replace(/\s/g, '') }))
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
      setBusy(false)
    }
  }

  return (
    <>
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">{copy.title}</h1>
      <p className="mt-2 text-[15px] leading-6 text-ink-500">{copy.subtitle}</p>
      <form onSubmit={submit} className="mt-8 space-y-5">
        <Field
          label={recovery ? copy.recoveryCode : copy.code}
          name="one-time-code"
          autoComplete="one-time-code"
          inputMode={recovery ? 'text' : 'numeric'}
          required
          autoFocus
          value={value}
          onChange={event => setValue(event.target.value)}
          placeholder={recovery ? 'XXXXX-XXXXX' : '123456'}
        />
        {error && <FormAlert>{error}</FormAlert>}
        <button type="submit" disabled={busy} className={`${button.primary} min-h-12 w-full text-[15px]`}>
          {busy ? copy.submitting : copy.submit}
        </button>
      </form>
      <div className="mt-6 flex flex-col items-center gap-3 text-sm">
        <button type="button" onClick={toggle} className={button.link}>
          {recovery ? copy.useCode : copy.useRecovery}
        </button>
        <button type="button" onClick={onBack} className="font-semibold text-ink-500 hover:text-ink-900">{copy.back}</button>
      </div>
    </>
  )
}

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
  const [mfa, setMfa] = useState<MfaStep | null>(null)

  const next = safeNext(params.get('next'))
  const go = (signedIn: AuthUser | null) => router.replace(next || workspaceHref(signedIn))

  useEffect(() => {
    if (!loading && isSignedIn && !busy && !mfa) go(user)
  }, [loading, isSignedIn])

  const handle = async (attempt: Promise<{ user: AuthUser } | MfaStep>, kind: 'email' | 'google') => {
    setBusy(kind)
    setError('')
    try {
      const result = await attempt
      if ('user' in result) {
        tracker.log('auth_signin', kind === 'google' ? 'google sign in' : 'User logged in')
        go(result.user)
        return
      }
      if (result.mfaSetupRequired) {
        setError(t.auth.mfa.staffOnly)
        setBusy('')
        return
      }
      setMfa(result)
      setBusy('')
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, copy.failed))
      setBusy('')
    }
  }

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void handle(signIn({ email, password }), 'email')
  }

  const back = () => {
    setMfa(null)
    setPassword('')
  }

  if (mfa) return <MfaForm step={mfa} onDone={go} onBack={back} />

  return (
    <>
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">{copy.title}</h1>
      <p className="mt-2 text-[15px] leading-6 text-ink-500">{copy.subtitle}</p>

      {googleEnabled && (
        <>
          <div className="mt-8">
            <GoogleSignIn onCredential={idToken => void handle(signInWithGoogle(idToken), 'google')} />
          </div>
          <OrDivider />
        </>
      )}

      <form onSubmit={submit} className={`space-y-5 ${googleEnabled ? '' : 'mt-8'}`}>
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
        {copy.newHere} <Link href={next ? `/register?next=${encodeURIComponent(next)}` : '/register'} className={button.link}>{copy.register}</Link>
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
