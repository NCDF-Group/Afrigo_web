'use client'
import { useState } from 'react'
import { BusyLabel } from '@/components/ui/Busy'
import { Field, FormAlert } from '@/components/ui/Field'
import Icon from '@/components/ui/Icon'
import { button } from '@/components/ui/styles'
import { api, authErrorMessage, reloadAccount, type AuthUser } from '@/lib/auth'
import { useI18n } from '@/i18n/client'
import { Panel } from './Panel'

type Stage = 'idle' | 'setup' | 'codes' | 'disable'

export default function TwoStepCard({ user, delay }: { user: AuthUser; delay: number }) {
  const { t } = useI18n()
  const copy = t.workspace.account.mfa
  const [stage, setStage] = useState<Stage>('idle')
  const [setup, setSetup] = useState<{ secret: string; otpauthUrl: string } | null>(null)
  const [codes, setCodes] = useState<string[]>([])
  const [code, setCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [busy, setBusy] = useState('')
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const isStaff = Boolean(user.operationalRole)

  const run = async (key: string, action: () => Promise<void>) => {
    setBusy(key)
    setError('')
    setNotice('')
    try {
      await action()
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
    } finally {
      setBusy('')
    }
  }

  const start = () =>
    run('start', async () => {
      setSetup(await api('/auth/mfa/setup', { method: 'POST', body: {} }))
      setCode('')
      setStage('setup')
    })

  const enable = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void run('enable', async () => {
      const result = await api<{ recoveryCodes: string[] }>('/auth/mfa/enable', { method: 'POST', body: { code: code.replace(/\s/g, '') } })
      setCodes(result.recoveryCodes)
      setStage('codes')
      await reloadAccount()
    })
  }

  const disable = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void run('disable', async () => {
      await api('/auth/mfa/disable', { method: 'POST', body: { code: code.replace(/\s/g, '') } })
      await reloadAccount()
      setStage('idle')
      setNotice(copy.disabled)
    })
  }

  const copyKey = async () => {
    if (!setup) return
    try {
      await navigator.clipboard.writeText(setup.secret)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const askDisable = () => {
    setStage('disable')
    setCode('')
  }

  const cancel = () => {
    setStage('idle')
    setCode('')
    setError('')
  }

  const action =
    stage === 'idle' &&
    (user.mfaEnabled ? (
      !isStaff && <button type="button" onClick={askDisable} className={`${button.secondary} w-full sm:w-auto`}>{copy.disable}</button>
    ) : (
      <button type="button" onClick={() => void start()} disabled={!!busy} className={`${button.primary} w-full sm:w-auto`}><BusyLabel busy={busy === 'start'} label={copy.enable} busyLabel={copy.starting} /></button>
    ))

  return (
    <Panel icon="shield" title={copy.title} text={user.mfaEnabled ? copy.onText : copy.offText} delay={delay} action={action || undefined}>
      {notice && stage === 'idle' && <FormAlert tone="success">{notice}</FormAlert>}
      {error && stage === 'idle' && <FormAlert>{error}</FormAlert>}

      {stage === 'setup' && setup && (
        <form onSubmit={enable} className="space-y-5">
          <ol className="space-y-5">
            <li className="space-y-3">
              <p className="text-[15px] text-ink-700"><span className="mr-2 font-bold text-ink-900">1.</span>{copy.step1}</p>
              <div className="flex flex-col gap-2 rounded-input border border-dashed border-line-strong bg-subtle p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{copy.key}</p>
                  <p className="mt-1 break-all font-mono text-[15px] font-bold tracking-wider text-ink-900">{setup.secret.match(/.{1,4}/g)?.join(' ')}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button type="button" onClick={() => void copyKey()} className={`${button.secondary} min-h-10 px-3`}>{copied ? copy.copied : copy.copy}</button>
                  <a href={setup.otpauthUrl} className={`${button.secondary} min-h-10 px-3 sm:hidden`}>{copy.openApp}</a>
                </div>
              </div>
            </li>
            <li className="space-y-3">
              <p className="text-[15px] text-ink-700"><span className="mr-2 font-bold text-ink-900">2.</span>{copy.step2}</p>
              <Field label={copy.code} inputMode="numeric" autoComplete="one-time-code" required maxLength={7} value={code} onChange={event => setCode(event.target.value)} placeholder="123456" className="sm:max-w-xs" />
            </li>
          </ol>
          {error && <FormAlert>{error}</FormAlert>}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={cancel} disabled={!!busy} className={button.secondary}>{copy.cancel}</button>
            <button type="submit" disabled={!!busy} className={button.primary}><BusyLabel busy={busy === 'enable'} label={copy.confirm} busyLabel={copy.confirming} /></button>
          </div>
        </form>
      )}

      {stage === 'codes' && (
        <div className="space-y-4">
          <div className="rounded-input border border-warning/30 bg-warning-soft p-4">
            <p className="font-bold text-ink-900">{copy.recoveryTitle}</p>
            <p className="mt-1 text-sm leading-6 text-ink-700">{copy.recoveryText}</p>
          </div>
          <ul className="grid grid-cols-2 gap-2 rounded-input border border-line bg-subtle p-4 font-mono text-[15px] font-bold tracking-wider text-ink-900 sm:grid-cols-5">
            {codes.map(item => <li key={item}>{item}</li>)}
          </ul>
          <button type="button" onClick={() => setStage('idle')} className={`${button.primary} w-full sm:w-auto`}>
            <Icon name="check" className="h-4 w-4" />
            {copy.saved}
          </button>
        </div>
      )}

      {stage === 'disable' && (
        <form onSubmit={disable} className="space-y-5">
          <p className="text-[15px] text-ink-700">{copy.disableText}</p>
          <Field label={copy.code} inputMode="numeric" autoComplete="one-time-code" required maxLength={7} value={code} onChange={event => setCode(event.target.value)} placeholder="123456" className="sm:max-w-xs" />
          {error && <FormAlert>{error}</FormAlert>}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={cancel} disabled={!!busy} className={button.secondary}>{copy.cancel}</button>
            <button type="submit" disabled={!!busy} className={`${button.secondary} border-danger/40 text-danger`}><BusyLabel busy={busy === 'disable'} label={copy.disable} busyLabel={copy.disabling} /></button>
          </div>
        </form>
      )}
    </Panel>
  )
}
