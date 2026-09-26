'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '@/components/brand/Logo'
import { FormAlert } from '@/components/ui/Field'
import { BusyLabel } from '@/components/ui/Busy'
import { button } from '@/components/ui/styles'
import BusinessFields, { emptyForm, type BusinessForm } from '@/components/workspace/BusinessFields'
import { KindPicker, TypesPicker } from '@/components/workspace/TypePicker'
import { authErrorMessage, useAuth } from '@/lib/auth'
import { workspaceHref } from '@/lib/authRoutes'
import { clean, countriesOpen, createOrganisation, type BusinessType, type Country, type Organisation } from '@/lib/workspace'
import { ThemeScope } from '@/lib/theme'
import { fmt } from '@/i18n/config'
import { useI18n } from '@/i18n/client'

export default function SetupPage() {
  const router = useRouter()
  const { t } = useI18n()
  const copy = t.workspace.setup
  const { user, loading, isSignedIn } = useAuth()
  const [step, setStep] = useState(0)
  const [kind, setKind] = useState<Organisation['kind'] | null>(null)
  const [types, setTypes] = useState<BusinessType[]>([])
  const [form, setForm] = useState<BusinessForm>(emptyForm)
  const [countries, setCountries] = useState<Country[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (loading) return
    if (!isSignedIn) router.replace('/sign-in?next=/app/setup')
    else if (!user?.emailVerified) router.replace('/verify-email')
  }, [loading, isSignedIn, user?.emailVerified])

  useEffect(() => {
    countriesOpen().then(setCountries).catch(() => setCountries([]))
  }, [])

  useEffect(() => {
    if (!form.country && countries.length === 1) setForm(current => ({ ...current, country: countries[0].iso2 }))
  }, [countries])

  const chosenTypes: BusinessType[] = kind === 'service_partner' ? ['trade_service_provider'] : types

  const advance = () => {
    setError('')
    if (step === 0) {
      if (!kind) return setError(copy.chooseKind)
      if (kind === 'business' && !types.length) return setError(copy.chooseType)
    }
    if (step === 1) {
      if (!form.name?.trim()) return setError(copy.nameRequired)
      if (!form.country) return setError(copy.countryRequired)
    }
    setStep(step + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const back = () => {
    setError('')
    setStep(step - 1)
  }

  const create = async () => {
    setBusy(true)
    setError('')
    try {
      await createOrganisation({ ...clean(form), name: form.name!.trim(), country: form.country!, kind: kind!, types: chosenTypes })
      router.replace('/app?welcome=1')
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
      setBusy(false)
    }
  }

  const country = countries.find(item => item.iso2 === form.country)
  const review: [string, string | null | undefined][] = [
    [t.workspace.business.kind, kind ? t.workspace.kinds[kind].title : null],
    [t.workspace.business.activities, chosenTypes.map(type => t.workspace.types[type].title).join(', ')],
    [t.workspace.fields.name, form.name],
    [t.workspace.fields.tradingName, form.tradingName],
    [t.workspace.fields.country, country?.name],
    [t.workspace.fields.city, form.city],
    [t.workspace.fields.registrationNumber, form.registrationNumber],
    [t.workspace.fields.taxId, form.taxId],
    [t.workspace.fields.address, form.address],
    [t.workspace.fields.phone, form.phone],
    [t.workspace.fields.email, form.email],
    [t.workspace.fields.website, form.website],
    [t.workspace.fields.description, form.description]
  ]

  return (
    <div className="min-h-[100svh] bg-canvas">
      <ThemeScope />
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Logo adaptive href="/app/setup" />
          <span className="text-sm font-semibold text-ink-500">{fmt(copy.step, { current: step + 1, total: copy.steps.length })}</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <ol className="grid grid-cols-3 gap-2" aria-label={fmt(copy.step, { current: step + 1, total: copy.steps.length })}>
          {copy.steps.map((label, index) => (
            <li key={label} aria-current={index === step ? 'step' : undefined}>
              <span className={`block h-1.5 rounded-full transition-colors duration-500 ${index <= step ? 'bg-brand-600 dark:bg-accent-500' : 'bg-line'}`} />
              <span className={`mt-2 block text-xs font-semibold sm:text-sm ${index === step ? 'text-ink-900' : 'text-ink-400'}`}>{label}</span>
            </li>
          ))}
        </ol>

        <div className="mt-6 animate-rise rounded-sheet border border-line bg-surface p-5 shadow-sm sm:mt-8 sm:p-8" key={step}>
          {step === 0 && (
            <>
              <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">{copy.kindTitle}</h1>
              <p className="mt-2 text-[15px] leading-6 text-ink-500">{copy.kindSubtitle}</p>
              <div className="mt-6"><KindPicker value={kind} onChange={value => { setKind(value); setError('') }} /></div>
              {kind === 'business' && (
                <div className="mt-8">
                  <h2 className="font-display text-lg font-bold text-ink-900">{copy.typesTitle}</h2>
                  <p className="mt-1 text-sm text-ink-500">{copy.typesHint}</p>
                  <div className="mt-4"><TypesPicker value={types} onChange={value => { setTypes(value); setError('') }} /></div>
                </div>
              )}
            </>
          )}

          {step === 1 && (
            <>
              <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">{copy.detailsTitle}</h1>
              <p className="mt-2 text-[15px] leading-6 text-ink-500">{copy.detailsSubtitle}</p>
              <div className="mt-6"><BusinessFields value={form} onChange={setForm} countries={countries} /></div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">{copy.reviewTitle}</h1>
              <p className="mt-2 text-[15px] leading-6 text-ink-500">{copy.reviewSubtitle}</p>
              <dl className="mt-6 divide-y divide-line rounded-card border border-line">
                {review.map(([label, value]) => (
                  <div key={label} className="grid gap-1 px-4 py-3 sm:grid-cols-[200px_1fr] sm:gap-4">
                    <dt className="text-sm font-semibold text-ink-500">{label}</dt>
                    <dd className={`break-words text-[15px] ${value?.trim() ? 'text-ink-900' : 'text-ink-400'}`}>{value?.trim() || copy.notProvided}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}

          {error && <div className="mt-6"><FormAlert>{error}</FormAlert></div>}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            {step > 0 ? (
              <button type="button" onClick={back} disabled={busy} className={`${button.secondary} min-h-12 text-[15px]`}>{copy.back}</button>
            ) : <span />}
            {step < 2 ? (
              <button type="button" onClick={advance} className={`${button.primary} min-h-12 text-[15px] sm:min-w-44`}>
                {copy.next}
              </button>
            ) : (
              <button type="button" onClick={() => void create()} disabled={busy} className={`${button.primary} min-h-12 text-[15px] sm:min-w-56`}>
                <BusyLabel busy={busy} label={copy.create} busyLabel={copy.creating} />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
