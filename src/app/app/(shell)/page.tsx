'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Icon, { type IconName } from '@/components/ui/Icon'
import Skeleton from '@/components/ui/Skeleton'
import StatusBadge from '@/components/workspace/StatusBadge'
import Tour, { tourSeen } from '@/components/workspace/Tour'
import { useAuth } from '@/lib/auth'
import { useCurrentMembership, useResource, type Invitation, type Member, type Organisation } from '@/lib/workspace'
import { fmt } from '@/i18n/config'
import { useI18n } from '@/i18n/client'

const EXPLORED = 'afrigo:explored'

const STATS: { key: 'enquiries' | 'cases' | 'tasks' | 'notifications'; icon: IconName }[] = [
  { key: 'enquiries', icon: 'message' },
  { key: 'cases', icon: 'briefcase' },
  { key: 'tasks', icon: 'clipboard' },
  { key: 'notifications', icon: 'bell' }
]

const EXPLORE_ICONS: IconName[] = ['search', 'globe', 'truck']

const BANNER_TONE: Record<Organisation['verificationStatus'], string> = {
  unverified: 'border-brand-600/15 bg-brand-50 dark:border-accent-500/20',
  pending: 'border-warning/25 bg-warning-soft',
  rejected: 'border-danger/25 bg-danger-soft',
  verified: 'border-success/25 bg-success-soft'
}

const card = 'rounded-card border border-line bg-surface'
const delay = (index: number) => ({ animationDelay: `${index * 70}ms` })

function greetingKey() {
  const hour = new Date().getHours()
  return hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'
}

function ProgressRing({ value }: { value: number }) {
  const radius = 22
  const circumference = 2 * Math.PI * radius
  return (
    <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90" aria-hidden="true">
      <circle cx="28" cy="28" r={radius} fill="none" strokeWidth="6" className="stroke-subtle" />
      <circle cx="28" cy="28" r={radius} fill="none" strokeWidth="6" strokeLinecap="round" className="stroke-accent-500 transition-[stroke-dashoffset] duration-1000 ease-out" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - value)} />
    </svg>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true">
      <Skeleton className="h-40 w-full rounded-sheet" />
      <Skeleton className="h-24 w-full rounded-card" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="h-32 rounded-card" />)}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <Skeleton className="h-80 rounded-card" />
        <Skeleton className="h-80 rounded-card" />
      </div>
    </div>
  )
}

function Dashboard() {
  const { t } = useI18n()
  const copy = t.workspace.dashboard
  const router = useRouter()
  const params = useSearchParams()
  const welcome = params.get('welcome') === '1'
  const replay = params.get('tour') === '1'
  const [touring, setTouring] = useState(false)
  const { user } = useAuth()
  const { membership } = useCurrentMembership()
  const id = membership?.organisationId
  const isAdmin = membership?.role === 'administrator'
  const organisation = useResource<{ organisation: Organisation }>(id ? `/organisations/${id}` : null)
  const members = useResource<{ items: Member[] }>(id ? `/organisations/${id}/members` : null)
  const invitations = useResource<{ items: Invitation[] }>(id && isAdmin ? `/organisations/${id}/invitations` : null)
  const [explored, setExplored] = useState(false)
  const [greeting, setGreeting] = useState<'morning' | 'afternoon' | 'evening'>('morning')

  useEffect(() => {
    setGreeting(greetingKey())
    try {
      setExplored(localStorage.getItem(EXPLORED) === '1')
    } catch {}
  }, [])

  const markExplored = () => {
    setExplored(true)
    try {
      localStorage.setItem(EXPLORED, '1')
    } catch {}
  }

  const business = organisation.data?.organisation
  const status = business?.verificationStatus

  const checklist = useMemo(
    () => [
      { key: 'email', done: Boolean(user?.emailVerified), href: '/app/account' },
      { key: 'profile', done: true, href: '/app/business' },
      { key: 'registration', done: Boolean(business?.registrationNumber), href: '/app/business' },
      { key: 'verification', done: status === 'pending' || status === 'verified', href: '/app/business' },
      { key: 'team', done: (members.data?.items.length ?? 0) > 1 || (invitations.data?.items.length ?? 0) > 0, href: '/app/team' },
      { key: 'explore', done: explored, href: '/opportunities' }
    ] as const,
    [user?.emailVerified, business?.registrationNumber, status, members.data, invitations.data, explored]
  )

  const ready = Boolean(membership && user && business && members.data)

  useEffect(() => {
    if (!ready) return
    const timer = setTimeout(() => setTouring(replay || !tourSeen()), 900)
    return () => clearTimeout(timer)
  }, [ready, replay])

  const endTour = () => {
    setTouring(false)
    if (replay) router.replace('/app')
  }

  if (!membership || !user || !business || !members.data) return <DashboardSkeleton />

  const done = checklist.filter(item => item.done).length
  const banner = status ? copy.banners[status] : null
  const bannerAction = banner && 'action' in banner ? (banner as { action: string }).action : null

  return (
    <div className="space-y-6">
      {touring && <Tour onClose={endTour} />}
      <section style={delay(0)} className="animate-rise relative overflow-hidden rounded-sheet bg-[linear-gradient(135deg,#025344_0%,#012A22_70%)] p-6 text-white sm:p-8">
        <div aria-hidden="true" className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-accent-500/25 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-brand-400/30 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-accent-300">{business.name}</p>
            <h1 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-[32px] sm:leading-tight">{fmt(copy.greeting[greeting], { name: user.firstName || user.displayName })}</h1>
            <p className="mt-2 max-w-xl text-[15px] leading-6 text-white/75">{welcome ? copy.welcome : fmt(copy.subtitle, { business: business.name })}</p>
          </div>
          <div className="shrink-0"><StatusBadge status={business.verificationStatus} inverse /></div>
        </div>
      </section>

      {banner && status && (
        <section data-tour="verification" style={delay(1)} className={`animate-rise flex flex-col gap-4 rounded-card border p-5 sm:flex-row sm:items-center sm:justify-between ${BANNER_TONE[status]}`}>
          <div className="flex gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-input bg-surface text-brand-600 shadow-sm dark:text-accent-400"><Icon name="shield" /></span>
            <div>
              <h2 className="font-display text-lg font-bold text-ink-900">{banner.title}</h2>
              <p className="mt-1 text-sm leading-6 text-ink-700">{banner.text}</p>
              {status === 'rejected' && business.verificationNote && <p className="mt-2 text-sm font-semibold text-danger">{business.verificationNote}</p>}
            </div>
          </div>
          {bannerAction && isAdmin && (
            <Link href="/app/business" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-input bg-brand-600 px-5 text-sm font-bold text-white transition-colors hover:bg-brand-700 dark:bg-accent-500 dark:text-brand-950 dark:hover:bg-accent-400">
              {bannerAction}
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          )}
        </section>
      )}

      <section data-tour="stats" className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {STATS.map((stat, index) => (
          <div key={stat.key} style={delay(index + 2)} className={`animate-rise lift ${card} p-4 sm:p-5`}>
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm font-semibold leading-5 text-ink-500">{copy.stats[stat.key].label}</span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-input bg-brand-50 text-brand-600 dark:text-accent-400"><Icon name={stat.icon} className="h-[18px] w-[18px]" /></span>
            </div>
            <p className="mt-3 font-display text-3xl font-bold text-ink-900">0</p>
            <p className="mt-1 text-xs leading-5 text-ink-400">{copy.stats[stat.key].empty}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <section data-tour="checklist" style={delay(6)} className={`animate-rise ${card} p-5 sm:p-6`}>
          <div className="flex items-center gap-4">
            <div className="relative grid place-items-center">
              <ProgressRing value={done / checklist.length} />
              <span className="absolute text-xs font-bold text-ink-900">{Math.round((done / checklist.length) * 100)}%</span>
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-ink-900">{copy.checklist.title}</h2>
              <p className="text-sm text-ink-500">{fmt(copy.checklist.progress, { done, total: checklist.length })}</p>
            </div>
          </div>
          <ul className="mt-4 divide-y divide-line">
            {checklist.map(item => (
              <li key={item.key}>
                <Link href={item.href} onClick={item.key === 'explore' ? markExplored : undefined} className="group -mx-2 flex min-h-12 items-center gap-3 rounded-input px-2 py-2.5 transition-colors hover:bg-subtle">
                  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors ${item.done ? 'border-brand-600 bg-brand-600 text-white dark:border-accent-500 dark:bg-accent-500 dark:text-brand-950' : 'border-line-strong text-transparent'}`}>
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  <span className={`flex-1 text-[15px] ${item.done ? 'text-ink-400 line-through decoration-ink-400/60' : 'font-semibold text-ink-900'}`}>{copy.checklist.items[item.key]}</span>
                  {!item.done && <Icon name="arrowRight" className="h-4 w-4 text-ink-400 transition-transform group-hover:translate-x-1" />}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section data-tour="explore" style={delay(7)} className={`animate-rise ${card} p-5 sm:p-6`}>
          <h2 className="font-display text-lg font-bold text-ink-900">{copy.explore.title}</h2>
          <ul className="mt-4 space-y-3">
            {copy.explore.items.map((item, index) => (
              <li key={item.href}>
                <Link href={item.href} onClick={markExplored} className="lift group flex gap-3 rounded-input border border-line p-4 hover:border-brand-600/40 dark:hover:border-accent-500/40">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-input bg-brand-50 text-brand-600 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 dark:text-accent-400"><Icon name={EXPLORE_ICONS[index]} className="h-[18px] w-[18px]" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-bold text-ink-900">{item.title}</span>
                    <span className="block text-sm leading-5 text-ink-500">{item.text}</span>
                  </span>
                  <Icon name="arrowRight" className="mt-1 h-4 w-4 shrink-0 text-ink-400 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default function WorkspaceHome() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard />
    </Suspense>
  )
}
