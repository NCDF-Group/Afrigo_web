'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BusyLabel } from '@/components/ui/Busy'
import { Field, FormAlert, PasswordField } from '@/components/ui/Field'
import { button } from '@/components/ui/styles'
import { api, authErrorMessage, signOut, type AuthUser } from '@/lib/auth'
import { useI18n } from '@/i18n/client'
import { Panel } from './Panel'

export default function DangerZone({ user, delay }: { user: AuthUser; delay: number }) {
  const router = useRouter()
  const { t } = useI18n()
  const copy = t.workspace.account.danger
  const [open, setOpen] = useState(false)
  const [typed, setTyped] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const close = () => {
    setOpen(false)
    setTyped('')
    setPassword('')
    setError('')
  }

  const remove = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      await api('/users/me', { method: 'DELETE', body: { confirm: typed.trim(), password: user.hasPassword ? password : undefined } })
      await signOut()
      router.replace('/')
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
      setBusy(false)
    }
  }

  return (
    <Panel
      icon="trash"
      tone="danger"
      title={copy.title}
      text={copy.text}
      delay={delay}
      action={!open && <button type="button" onClick={() => setOpen(true)} className={`${button.secondary} w-full border-danger/40 text-danger hover:border-danger sm:w-auto`}>{copy.button}</button>}
    >
      {open && (
        <form onSubmit={remove} className="space-y-5">
          <p className="text-[15px] font-semibold text-ink-900">{copy.confirmText}</p>
          <fieldset disabled={busy} className="grid gap-5 sm:grid-cols-2">
            <Field label={copy.typeDelete} autoComplete="off" required value={typed} onChange={event => setTyped(event.target.value)} placeholder="DELETE" />
            {user.hasPassword && <PasswordField label={copy.password} autoComplete="current-password" required value={password} onChange={event => setPassword(event.target.value)} />}
          </fieldset>
          {error && <FormAlert>{error}</FormAlert>}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={close} disabled={busy} className={button.secondary}>{copy.cancel}</button>
            <button type="submit" disabled={busy || typed.trim() !== 'DELETE'} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-input bg-danger px-5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 dark:text-brand-950">
              <BusyLabel busy={busy} label={copy.confirm} busyLabel={copy.deleting} />
            </button>
          </div>
        </form>
      )}
    </Panel>
  )
}
