'use client'
import { useId } from 'react'
import { Field } from '@/components/ui/Field'
import { input } from '@/components/ui/styles'
import type { Country, OrganisationInput } from '@/lib/workspace'
import { useI18n } from '@/i18n/client'

export type BusinessForm = Required<Pick<OrganisationInput, 'name' | 'tradingName' | 'country' | 'city' | 'registrationNumber' | 'taxId' | 'address' | 'phone' | 'email' | 'website' | 'description'>>

export const emptyForm: BusinessForm = { name: '', tradingName: '', country: '', city: '', registrationNumber: '', taxId: '', address: '', phone: '', email: '', website: '', description: '' }

export function formFrom(value: Partial<Record<keyof BusinessForm, string | null | undefined>>): BusinessForm {
  return Object.fromEntries(Object.keys(emptyForm).map(key => [key, value[key as keyof BusinessForm] ?? ''])) as BusinessForm
}

export default function BusinessFields({ value, onChange, countries, disabled }: { value: BusinessForm; onChange: (value: BusinessForm) => void; countries: Country[]; disabled?: boolean }) {
  const { t } = useI18n()
  const copy = t.workspace.fields
  const countryId = useId()
  const descriptionId = useId()
  const set = (key: keyof BusinessForm) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => onChange({ ...value, [key]: event.target.value })
  const selected = countries.find(country => country.iso2 === value.country)

  return (
    <fieldset disabled={disabled} className="space-y-5">
      <Field label={copy.name} name="organization" autoComplete="organization" required maxLength={160} value={value.name ?? ''} onChange={set('name')} />
      <Field label={copy.tradingName} name="trading-name" maxLength={160} value={value.tradingName ?? ''} onChange={set('tradingName')} />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={countryId} className="mb-1.5 block text-sm font-semibold text-ink-900">{copy.country}</label>
          <div className="relative">
            {selected && <img src={`/flags/${selected.iso2}.svg`} alt="" className="pointer-events-none absolute left-4 top-1/2 h-4 w-6 -translate-y-1/2 rounded-[3px] object-cover shadow-[0_0_0_1px_rgba(0,0,0,.12)]" />}
            <select id={countryId} required value={value.country ?? ''} onChange={set('country')} className={`${input} appearance-none pr-10 ${selected ? 'pl-12' : ''}`}>
              <option value="" disabled>{copy.countryPlaceholder}</option>
              {countries.map(country => (
                <option key={country.iso2} value={country.iso2}>{country.name}</option>
              ))}
            </select>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
          </div>
          <p className="mt-1.5 text-sm text-ink-500">{copy.countryNote}</p>
        </div>
        <Field label={copy.city} name="address-level2" autoComplete="address-level2" maxLength={120} value={value.city ?? ''} onChange={set('city')} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={copy.registrationNumber} name="registration-number" maxLength={80} value={value.registrationNumber ?? ''} onChange={set('registrationNumber')} hint={copy.registrationHint} />
        <Field label={copy.taxId} name="tax-id" maxLength={80} value={value.taxId ?? ''} onChange={set('taxId')} />
      </div>
      <Field label={copy.address} name="street-address" autoComplete="street-address" maxLength={300} value={value.address ?? ''} onChange={set('address')} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={copy.phone} type="tel" name="tel" autoComplete="tel" maxLength={32} value={value.phone ?? ''} onChange={set('phone')} />
        <Field label={copy.email} type="email" name="business-email" maxLength={254} value={value.email ?? ''} onChange={set('email')} placeholder={t.auth.emailPlaceholder} />
      </div>
      <Field label={copy.website} type="url" name="url" autoComplete="url" maxLength={300} value={value.website ?? ''} onChange={set('website')} placeholder="https://" />
      <div>
        <label htmlFor={descriptionId} className="mb-1.5 block text-sm font-semibold text-ink-900">{copy.description}</label>
        <textarea id={descriptionId} rows={4} maxLength={2000} value={value.description ?? ''} onChange={set('description')} className={`${input} min-h-[120px] py-3 leading-6`} aria-describedby={`${descriptionId}-hint`} />
        <p id={`${descriptionId}-hint`} className="mt-1.5 text-sm text-ink-500">{copy.descriptionHint}</p>
      </div>
    </fieldset>
  )
}
