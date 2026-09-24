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

export default function RegisterPage() {
  const router = useRouter()
  const tracker = useActivityTracker()
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
      .catch(cause => setError(authErrorMessage(cause)))
  }, [router])

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    if (password.length < 8) return setError('Use a password of at least 8 characters.')
    if (!agreed) return setError('Accept the terms and privacy policy to continue.')
    setBusy('email')
    try {
      const result = await signUp({ firstName, lastName, email, password })
      tracker.log('auth_signup', `${firstName} ${lastName}`, email)
      router.replace(workspaceHref(result.user))
    } catch (cause) {
      setError(authErrorMessage(cause, 'Unable to create your account. Please try again.'))
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
      setError(authErrorMessage(cause))
      setBusy('')
    }
  }

  return (
    <AuthShell
      image="/images/auth-register.webp"
      caption="Put your business in front of new African markets."
      captionDetail="Publish products and buyer requests, receive enquiries and prepare for cross-border trade."
    >
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">Register your business</h1>
      <p className="mt-2 text-[15px] leading-6 text-ink-500">Create your account first — you&apos;ll add your business details in the next step.</p>

      <div className="mt-8">
        <GoogleButton onClick={google} busy={busy === 'google'} label="Sign up with Google" />
      </div>
      <OrDivider />

      <form onSubmit={submit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="First name" name="given-name" autoComplete="given-name" required value={firstName} onChange={event => setFirstName(event.target.value)} />
          <Field label="Last name" name="family-name" autoComplete="family-name" required value={lastName} onChange={event => setLastName(event.target.value)} />
        </div>
        <Field label="Work email" type="email" name="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder="you@company.com" />
        <PasswordField
          label="Password"
          name="new-password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={event => setPassword(event.target.value)}
          hint="At least 8 characters."
        />
        <label className="flex items-start gap-3 text-sm leading-6 text-ink-700">
          <input type="checkbox" checked={agreed} onChange={event => setAgreed(event.target.checked)} className="mt-1 h-4 w-4 shrink-0 rounded border-line-strong accent-brand-600" />
          <span>
            I agree to the <Link href="/terms" className={button.link}>Terms</Link> and <Link href="/privacy" className={button.link}>Privacy policy</Link>.
          </span>
        </label>
        {error && <FormAlert>{error}</FormAlert>}
        <button type="submit" disabled={!!busy} className={`${button.primary} min-h-12 w-full text-[15px]`}>
          {busy === 'email' ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-8 text-center text-[15px] text-ink-500">
        Already registered? <Link href="/sign-in" className={button.link}>Sign in</Link>
      </p>
    </AuthShell>
  )
}
