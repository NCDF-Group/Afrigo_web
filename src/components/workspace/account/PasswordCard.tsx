'use client'
import { useState } from 'react'
import { BusyLabel } from '@/components/ui/Busy'
import { FormAlert, PasswordField } from '@/components/ui/Field'
import { button } from '@/components/ui/styles'
import { api, authErrorMessage, reloadAccount, type AuthUser } from '@/lib/auth'
import { useI18n } from '@/i18n/client'
import { Panel } from './Panel'

const strongEnough = (value: string) => value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value)

export default function PasswordCard({ user, delay }: { user: AuthUser; delay: number }) {
  const { t } = useI18n()
  const copy = t.workspace.account.password
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')

  const reset = () => {
    setOpen(false)
    setCurrent('')
    setNext('')
    setConfirm('')
    setError('')
  }

  const openForm = () => {
    setOpen(true)
    setNotice('')
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    if (!strongEnough(next)) return setError(copy.hint)
    if (next !== confirm) return setError(copy.mismatch)
    setBusy(true)
    try {
      await api('/auth/password/change', { method: 'POST', body: { currentPassword: user.hasPassword ? current : undefined, newPassword: next } })
      await reloadAccount()
      reset()
      setNotice(copy.done)
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
    } finally {
      setBusy(false)
    }
  }

  return (
    <Panel
      icon="key"
      title={copy.title}
      text={user.hasPassword ? copy.text : copy.googleText}
      delay={delay}
      action={!open && <button type="button" onClick={openForm} className={`${button.secondary} w-full sm:w-auto`}>{user.hasPassword ? copy.change : copy.add}</button>}
    >
      {notice && !open && <FormAlert tone="success">{notice}</FormAlert>}
      {open && (
        <form onSubmit={submit} className="space-y-5">
          <fieldset disabled={busy} className="space-y-5">
            {user.hasPassword && <PasswordField label={copy.current} autoComplete="current-password" required value={current} onChange={event => setCurrent(event.target.value)} />}
            <div className="grid gap-5 sm:grid-cols-2">
              <PasswordField label={copy.next} autoComplete="new-password" required minLength={8} value={next} onChange={event => setNext(event.target.value)} hint={copy.hint} />
              <PasswordField label={copy.confirm} autoComplete="new-password" required minLength={8} value={confirm} onChange={event => setConfirm(event.target.value)} />
            </div>
          </fieldset>
          {error && <FormAlert>{error}</FormAlert>}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={reset} disabled={busy} className={button.secondary}>{copy.cancel}</button>
            <button type="submit" disabled={busy} className={button.primary}><BusyLabel busy={busy} label={copy.submit} busyLabel={copy.submitting} /></button>
          </div>
        </form>
      )}
    </Panel>
  )
}
