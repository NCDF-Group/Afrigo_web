'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Icon from '@/components/ui/Icon'
import Skeleton from '@/components/ui/Skeleton'
import DangerZone from '@/components/workspace/account/DangerZone'
import { Panel } from '@/components/workspace/account/Panel'
import PasswordCard from '@/components/workspace/account/PasswordCard'
import PersonalDetails from '@/components/workspace/account/PersonalDetails'
import SessionsCard from '@/components/workspace/account/SessionsCard'
import TwoStepCard from '@/components/workspace/account/TwoStepCard'
import StatusBadge from '@/components/workspace/StatusBadge'
import ThemeSwitcher from '@/components/workspace/ThemeSwitcher'
import { resetTour } from '@/components/workspace/Tour'
import { button } from '@/components/ui/styles'
import UserAvatar from '@/components/workspace/UserAvatar'
import { useAuth } from '@/lib/auth'
import { rememberSelected, type Organisation } from '@/lib/workspace'
import { fmt, INTL_LOCALE } from '@/i18n/config'
import { useI18n } from '@/i18n/client'

function Pill({ on, label }: { on: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${on ? 'bg-success-soft text-success ring-success/20' : 'bg-subtle text-ink-500 ring-line'}`}>
      <Icon name={on ? 'check' : 'lock'} className="h-3.5 w-3.5" />
      {label}
    </span>
  )
}

export default function AccountPage() {
  const { locale, t } = useI18n()
  const copy = t.workspace.account
  const { user, organisations } = useAuth()
  const router = useRouter()

  const replayTour = () => {
    resetTour()
    router.push('/app?tour=1')
  }

  if (!user) {
    return (
      <div className="space-y-6" aria-busy="true">
        <Skeleton className="h-36 rounded-sheet" />
        <Skeleton className="h-64 rounded-card" />
        <Skeleton className="h-40 rounded-card" />
      </div>
    )
  }

  const since = user.createdAt ? new Intl.DateTimeFormat(INTL_LOCALE[locale], { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(user.createdAt)) : null

  return (
    <div className="space-y-6">
      <section className="animate-rise relative overflow-hidden rounded-sheet border border-line bg-surface p-5 sm:p-7">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(120deg,#025344_0%,#0B7259_55%,#7CB041_120%)] opacity-90 dark:opacity-70" />
        <div className="relative flex flex-col gap-4 pt-10 sm:flex-row sm:items-end sm:gap-5 sm:pt-12">
          <UserAvatar src={user.photoURL} name={user.displayName} size="lg" className="border-4 border-surface shadow-md" />
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">{user.displayName}</h1>
            <p className="truncate text-[15px] text-ink-500">{user.email}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Pill on={Boolean(user.emailVerified)} label={user.emailVerified ? copy.emailVerified : copy.emailNotVerified} />
              <Pill on={Boolean(user.mfaEnabled)} label={user.mfaEnabled ? copy.mfaOn : copy.mfaOff} />
            </div>
          </div>
          {since && <p className="text-sm text-ink-500 sm:text-right">{fmt(copy.memberSince, { date: since })}</p>}
        </div>
      </section>

      <PersonalDetails user={user} delay={1} />

      <Panel icon="building" title={copy.businesses.title} delay={2}>
        <ul className="divide-y divide-line rounded-input border border-line">
          {organisations.map(item => (
            <li key={item.organisationId} className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center">
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-semibold text-ink-900">{item.name}</span>
                <span className="mt-1 flex flex-wrap items-center gap-2">
                  <StatusBadge status={item.verificationStatus as Organisation['verificationStatus']} />
                  <span className="text-xs font-semibold text-ink-500">{t.workspace.roles[item.role]}</span>
                </span>
              </span>
              <Link href="/app" onClick={() => rememberSelected(item.organisationId)} className="inline-flex min-h-10 items-center gap-1.5 self-start rounded-input px-3 text-sm font-bold text-brand-600 hover:bg-brand-50 sm:self-auto dark:text-accent-400">
                {copy.businesses.open}
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/app/setup" className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-brand-600 hover:underline dark:text-accent-400">
          <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full bg-brand-50 text-base leading-none">+</span>
          {copy.businesses.add}
        </Link>
      </Panel>

      <PasswordCard user={user} delay={3} />
      <TwoStepCard user={user} delay={4} />
      <SessionsCard delay={5} />

      <Panel icon="sun" title={copy.appearance.title} text={copy.appearance.text} delay={6}>
        <ThemeSwitcher withLabels className="w-full sm:w-auto" />
      </Panel>

      <Panel icon="target" title={t.workspace.tour.replayTitle} text={t.workspace.tour.replayText} delay={7} action={<button type="button" onClick={replayTour} className={`${button.secondary} w-full sm:w-auto`}>{t.workspace.tour.replay}</button>} />

      <DangerZone user={user} delay={8} />
    </div>
  )
}
