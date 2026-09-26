'use client'

import { useEffect, useState } from 'react'
import Icon from '@/components/ui/Icon'
import { FormAlert } from '@/components/ui/Field'
import { BusyLabel } from '@/components/ui/Busy'
import Skeleton from '@/components/ui/Skeleton'
import { button } from '@/components/ui/styles'
import BusinessFields, { formFrom, type BusinessForm } from '@/components/workspace/BusinessFields'
import StatusBadge from '@/components/workspace/StatusBadge'
import { authErrorMessage } from '@/lib/auth'
import { clean, countriesOpen, submitVerification, updateOrganisation, useCurrentMembership, useResource, type Country, type Organisation } from '@/lib/workspace'
import { fmt } from '@/i18n/config'
import { useI18n } from '@/i18n/client'

export default function BusinessPage() {
  const { t } = useI18n()
  const copy = t.workspace.business
  const fields = t.workspace.fields
  const { membership } = useCurrentMembership()
  const id = membership?.organisationId
  const { data, setData } = useResource<{ organisation: Organisation }>(id ? `/organisations/${id}` : null)
  const [countries, setCountries] = useState<Country[]>([])
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState<BusinessForm | null>(null)
  const [busy, setBusy] = useState<'' | 'save' | 'submit'>('')
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')

  const business = data?.organisation
  const isAdmin = membership?.role === 'administrator'

  useEffect(() => {
    countriesOpen().then(setCountries).catch(() => setCountries([]))
  }, [])

  const startEditing = () => {
    if (!business) return
    setForm(formFrom(business))
    setEditing(true)
    setNotice('')
    setError('')
  }

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!business || !form) return
    setBusy('save')
    setError('')
    try {
      const organisation = await updateOrganisation(business.id, clean(form))
      setData({ organisation })
      setEditing(false)
      setNotice(copy.saved)
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
    } finally {
      setBusy('')
    }
  }

  const submit = async () => {
    if (!business) return
    setBusy('submit')
    setError('')
    setNotice('')
    try {
      const organisation = await submitVerification(business.id)
      setData({ organisation })
      setNotice(copy.submitted)
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
    } finally {
      setBusy('')
    }
  }

  if (!business) {
    return (
      <div className="space-y-6" aria-busy="true">
        <Skeleton className="h-9 w-2/3 sm:w-72" />
        <Skeleton className="h-5 w-1/2 sm:w-96" />
        <Skeleton className="h-28 rounded-card" />
        <div className="space-y-3 rounded-card border border-line bg-surface p-5">
          {Array.from({ length: 8 }, (_, index) => <Skeleton key={index} className="h-6" />)}
        </div>
      </div>
    )
  }

  const countryName = countries.find(country => country.iso2 === business.country)?.name ?? business.country.toUpperCase()
  const details: [string, string | null][] = [
    [copy.kind, t.workspace.kinds[business.kind].title],
    [copy.activities, business.types.map(type => t.workspace.types[type].title).join(', ')],
    [fields.name, business.name],
    [fields.tradingName, business.tradingName],
    [fields.country, countryName],
    [fields.city, business.city],
    [fields.registrationNumber, business.registrationNumber],
    [fields.taxId, business.taxId],
    [fields.address, business.address],
    [fields.phone, business.phone],
    [fields.email, business.email],
    [fields.website, business.website],
    [fields.description, business.description]
  ]
  const canSubmit = isAdmin && (business.verificationStatus === 'unverified' || business.verificationStatus === 'rejected')

  return (
    <div className="animate-rise space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">{copy.title}</h1>
          <p className="mt-1.5 text-[15px] text-ink-500">{fmt(copy.subtitle, { business: business.name })}</p>
        </div>
        {isAdmin && !editing && <button type="button" onClick={startEditing} className={`${button.secondary} w-full sm:w-auto`}>{copy.edit}</button>}
      </div>

      {notice && <FormAlert tone="success">{notice}</FormAlert>}
      {error && !editing && <FormAlert>{error}</FormAlert>}

      <section className="rounded-card border border-line bg-surface p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-input bg-brand-50 text-brand-600 dark:text-accent-400"><Icon name="shield" /></span>
            <div>
              <h2 className="font-display text-lg font-bold text-ink-900">{copy.verificationTitle}</h2>
              <div className="mt-1.5"><StatusBadge status={business.verificationStatus} /></div>
              {business.verificationStatus === 'rejected' && business.verificationNote && (
                <p className="mt-3 text-sm leading-6 text-ink-700"><span className="font-semibold">{copy.reviewNote}:</span> {business.verificationNote}</p>
              )}
              {canSubmit && !business.registrationNumber && <p className="mt-3 text-sm text-ink-500">{copy.needsRegistration}</p>}
            </div>
          </div>
          {canSubmit && (
            <button type="button" onClick={() => void submit()} disabled={!!busy || !business.registrationNumber} className={`${button.primary} w-full shrink-0 sm:w-auto`}>
              <BusyLabel busy={busy === 'submit'} label={copy.submit} busyLabel={copy.submitting} />
            </button>
          )}
        </div>
      </section>

      {editing && form ? (
        <form onSubmit={save} className="animate-rise rounded-card border border-line bg-surface p-5 sm:p-6">
          {business.verificationStatus === 'verified' && <div className="mb-5"><FormAlert tone="info">{copy.identityWarning}</FormAlert></div>}
          <BusinessFields value={form} onChange={setForm} countries={countries} disabled={busy === 'save'} />
          {error && <div className="mt-5"><FormAlert>{error}</FormAlert></div>}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => setEditing(false)} disabled={busy === 'save'} className={button.secondary}>{copy.cancel}</button>
            <button type="submit" disabled={busy === 'save'} className={button.primary}><BusyLabel busy={busy === 'save'} label={copy.save} busyLabel={copy.saving} /></button>
          </div>
        </form>
      ) : (
        <section className="rounded-card border border-line bg-surface">
          <dl className="divide-y divide-line">
            {details.map(([label, value]) => (
              <div key={label} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[220px_1fr] sm:gap-4 sm:px-6">
                <dt className="text-sm font-semibold text-ink-500">{label}</dt>
                <dd className={`break-words text-[15px] ${value?.trim() ? 'text-ink-900' : 'text-ink-400'}`}>{value?.trim() || t.workspace.setup.notProvided}</dd>
              </div>
            ))}
          </dl>
          {!isAdmin && <p className="border-t border-line px-5 py-3 text-sm text-ink-500 sm:px-6">{copy.adminOnly}</p>}
        </section>
      )}
    </div>
  )
}
