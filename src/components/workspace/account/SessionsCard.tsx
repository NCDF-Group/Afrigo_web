'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BusyLabel, Spinner } from '@/components/ui/Busy'
import { FormAlert } from '@/components/ui/Field'
import Icon from '@/components/ui/Icon'
import Skeleton from '@/components/ui/Skeleton'
import { button } from '@/components/ui/styles'
import { api, authErrorMessage, signOutEverywhere } from '@/lib/auth'
import { useResource } from '@/lib/workspace'
import { fmt, INTL_LOCALE } from '@/i18n/config'
import { useI18n } from '@/i18n/client'
import { Panel } from './Panel'

type Session = { id: string; platform: 'web' | 'ios' | 'android' | 'admin' | null; userAgent: string | null; createdAt: string; current: boolean }

function describe(agent: string | null) {
  if (!agent) return null
  const browser = /Edg\//.test(agent) ? 'Edge' : /OPR\//.test(agent) ? 'Opera' : /Chrome\//.test(agent) ? 'Chrome' : /Firefox\//.test(agent) ? 'Firefox' : /Safari\//.test(agent) ? 'Safari' : null
  const system = /iPhone|iPad/.test(agent) ? 'iOS' : /Android/.test(agent) ? 'Android' : /Mac OS X/.test(agent) ? 'macOS' : /Windows/.test(agent) ? 'Windows' : /Linux/.test(agent) ? 'Linux' : null
  return [browser, system].filter(Boolean).join(' on ') || null
}

export default function SessionsCard({ delay }: { delay: number }) {
  const router = useRouter()
  const { locale, t } = useI18n()
  const copy = t.workspace.account.sessions
  const { data, reload } = useResource<{ items: Session[] }>('/auth/sessions')
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')

  const date = (value: string) => new Intl.DateTimeFormat(INTL_LOCALE[locale], { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(value))

  const revoke = async (id: string) => {
    setBusy(id)
    setError('')
    try {
      await api(`/auth/sessions/${id}`, { method: 'DELETE' })
      await reload()
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
    } finally {
      setBusy('')
    }
  }

  const everywhere = async () => {
    setBusy('all')
    try {
      await signOutEverywhere()
      router.replace('/')
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
      setBusy('')
    }
  }

  return (
    <Panel icon="monitor" title={copy.title} text={copy.subtitle} delay={delay}>
      {error && <div className="mb-4"><FormAlert>{error}</FormAlert></div>}
      {!data ? (
        <div className="space-y-2">{Array.from({ length: 2 }, (_, index) => <Skeleton key={index} className="h-16" />)}</div>
      ) : (
        <ul className="divide-y divide-line rounded-input border border-line">
          {data.items.map(session => (
            <li key={session.id} className="flex items-center gap-3 px-4 py-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-input bg-subtle text-ink-500">
                <Icon name={session.platform === 'ios' || session.platform === 'android' ? 'phone' : 'monitor'} className="h-[18px] w-[18px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2 text-[15px] font-semibold text-ink-900">
                  {describe(session.userAgent) ?? copy.platforms[session.platform ?? 'unknown']}
                  {session.current && <span className="rounded-full bg-success-soft px-2 py-0.5 text-xs font-bold text-success">{copy.current}</span>}
                </span>
                <span className="block truncate text-sm text-ink-500">{copy.platforms[session.platform ?? 'unknown']} · {fmt(copy.signedIn, { date: date(session.createdAt) })}</span>
              </span>
              {!session.current && (
                <button type="button" onClick={() => void revoke(session.id)} disabled={!!busy} className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-input px-2.5 text-xs font-bold text-danger hover:bg-danger-soft">
                  {busy === session.id && <Spinner className="h-3.5 w-3.5" />}
                  {copy.signOut}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <button type="button" onClick={() => void everywhere()} disabled={!!busy} className={`${button.secondary} mt-4 w-full sm:w-auto`}>
        <BusyLabel busy={busy === 'all'} label={copy.signOutAll} busyLabel={copy.signingOut} />
      </button>
    </Panel>
  )
}
