'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Field, FormAlert } from '@/components/ui/Field'
import { BusyLabel, Spinner } from '@/components/ui/Busy'
import Skeleton from '@/components/ui/Skeleton'
import { button, input } from '@/components/ui/styles'
import { authErrorMessage, useAuth } from '@/lib/auth'
import { cancelInvitation, changeMemberRole, inviteColleague, removeMember, useCurrentMembership, useResource, type Invitation, type Member } from '@/lib/workspace'
import { fmt, INTL_LOCALE } from '@/i18n/config'
import { useI18n } from '@/i18n/client'

export default function TeamPage() {
  const router = useRouter()
  const { locale, t } = useI18n()
  const copy = t.workspace.team
  const { user } = useAuth()
  const { membership } = useCurrentMembership()
  const id = membership?.organisationId
  const isAdmin = membership?.role === 'administrator'
  const members = useResource<{ items: Member[] }>(id ? `/organisations/${id}/members` : null)
  const invitations = useResource<{ items: Invitation[] }>(id && isAdmin ? `/organisations/${id}/invitations` : null)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<Member['role']>('member')
  const [busy, setBusy] = useState('')
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')

  const run = async (key: string, action: () => Promise<unknown>, success?: string) => {
    setBusy(key)
    setError('')
    setNotice('')
    try {
      await action()
      if (success) setNotice(success)
      await Promise.all([members.reload(), isAdmin ? invitations.reload() : null])
      return true
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
      return false
    } finally {
      setBusy('')
    }
  }

  const invite = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!id) return
    const sent = email.trim().toLowerCase()
    if (await run('invite', () => inviteColleague(id, sent, role), fmt(copy.invited, { email: sent }))) setEmail('')
  }

  const remove = async (member: Member) => {
    if (!id || !membership) return
    const self = member.userId === user?.id
    const question = self ? fmt(copy.confirmLeave, { business: membership.name }) : fmt(copy.confirmRemove, { name: `${member.firstName} ${member.lastName}`.trim(), business: membership.name })
    if (!window.confirm(question)) return
    const ok = await run(`remove:${member.userId}`, () => removeMember(id, member.userId))
    if (ok && self) router.replace('/app')
  }

  const administrators = members.data?.items.filter(member => member.role === 'administrator').length ?? 0

  const date = (value: string) => new Intl.DateTimeFormat(INTL_LOCALE[locale], { day: 'numeric', month: 'short' }).format(new Date(value))

  if (!membership || (!members.data && !members.error)) {
    return (
      <div className="space-y-6" aria-busy="true">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-5 w-2/3 sm:w-96" />
        <Skeleton className="h-48 rounded-card" />
        <Skeleton className="h-40 rounded-card" />
      </div>
    )
  }

  return (
    <div className="animate-rise space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">{copy.title}</h1>
        <p className="mt-1.5 text-[15px] text-ink-500">{fmt(copy.subtitle, { business: membership.name })}</p>
      </div>

      {notice && <FormAlert tone="success">{notice}</FormAlert>}
      {error && <FormAlert>{error}</FormAlert>}

      {isAdmin ? (
        <form onSubmit={invite} className="rounded-card border border-line bg-surface p-5 sm:p-6">
          <h2 className="font-display text-lg font-bold text-ink-900">{copy.inviteTitle}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_220px]">
            <Field label={copy.inviteEmail} type="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder={t.auth.emailPlaceholder} />
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-ink-900">{copy.inviteRole}</span>
              <select value={role} onChange={event => setRole(event.target.value as Member['role'])} className={input}>
                <option value="member">{t.workspace.roles.member}</option>
                <option value="administrator">{t.workspace.roles.administrator}</option>
              </select>
            </label>
          </div>
          <p className="mt-2 text-sm text-ink-500">{copy.roleText[role]}</p>
          <button type="submit" disabled={!!busy} className={`${button.primary} mt-5 w-full sm:w-auto`}><BusyLabel busy={busy === 'invite'} label={copy.invite} busyLabel={copy.inviting} /></button>
        </form>
      ) : (
        <FormAlert tone="info">{copy.adminOnly}</FormAlert>
      )}

      <section className="rounded-card border border-line bg-surface">
        <h2 className="border-b border-line px-5 py-4 font-display text-lg font-bold text-ink-900 sm:px-6">{copy.members}</h2>
        <ul className="divide-y divide-line">
          {(members.data?.items ?? []).map(member => {
            const self = member.userId === user?.id
            return (
              <li key={member.userId} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
                <span className="flex min-w-0 flex-1 items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand-700 dark:text-accent-400">{`${member.firstName[0] ?? ''}${member.lastName[0] ?? ''}`.toUpperCase()}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-[15px] font-semibold text-ink-900">
                      {member.firstName} {member.lastName} {self && <span className="ml-1 rounded-full bg-subtle px-2 py-0.5 text-xs font-bold text-ink-500">{copy.you}</span>}
                    </span>
                    <span className="block truncate text-sm text-ink-500">{member.email}</span>
                  </span>
                </span>
                <span className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <span className="rounded-full bg-subtle px-2.5 py-1 text-xs font-bold text-ink-700">{t.workspace.roles[member.role]}</span>
                  {isAdmin && !self && (
                    <button type="button" disabled={!!busy} onClick={() => id && void run(`role:${member.userId}`, () => changeMemberRole(id, member.userId, member.role === 'administrator' ? 'member' : 'administrator'))} className="inline-flex min-h-9 items-center gap-1.5 rounded-input px-2.5 text-xs font-bold text-brand-600 hover:bg-brand-50 dark:text-accent-400">
                      {busy === `role:${member.userId}` && <Spinner className="h-3.5 w-3.5" />}
                      {member.role === 'administrator' ? copy.makeMember : copy.makeAdmin}
                    </button>
                  )}
                  {(isAdmin || self) && !(member.role === 'administrator' && administrators <= 1) && (
                    <button type="button" disabled={!!busy} onClick={() => void remove(member)} className="inline-flex min-h-9 items-center gap-1.5 rounded-input px-2.5 text-xs font-bold text-danger hover:bg-danger-soft">
                      {busy === `remove:${member.userId}` && <Spinner className="h-3.5 w-3.5" />}
                      {self ? copy.leave : copy.remove}
                    </button>
                  )}
                </span>
              </li>
            )
          })}
        </ul>
      </section>

      {isAdmin && (
        <section className="rounded-card border border-line bg-surface">
          <h2 className="border-b border-line px-5 py-4 font-display text-lg font-bold text-ink-900 sm:px-6">{copy.pendingTitle}</h2>
          {invitations.data?.items.length ? (
            <ul className="divide-y divide-line">
              {invitations.data.items.map(invitation => (
                <li key={invitation.id} className="flex items-center gap-3 px-5 py-4 sm:px-6">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-semibold text-ink-900">{invitation.email}</span>
                    <span className="block text-sm text-ink-500">{t.workspace.roles[invitation.role]} · {fmt(copy.expires, { date: date(invitation.expiresAt) })}</span>
                  </span>
                  <button type="button" disabled={!!busy} onClick={() => id && void run(`cancel:${invitation.id}`, () => cancelInvitation(id, invitation.id))} className="inline-flex min-h-9 items-center gap-1.5 rounded-input px-2.5 text-xs font-bold text-ink-500 hover:bg-subtle hover:text-ink-900">
                    {busy === `cancel:${invitation.id}` && <Spinner className="h-3.5 w-3.5" />}
                    {copy.cancelInvite}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-5 py-4 text-sm text-ink-500 sm:px-6">{copy.noPending}</p>
          )}
        </section>
      )}
    </div>
  )
}
