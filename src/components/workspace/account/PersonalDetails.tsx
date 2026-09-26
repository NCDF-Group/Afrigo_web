'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BusyLabel } from '@/components/ui/Busy'
import { Field, FormAlert } from '@/components/ui/Field'
import { button, input } from '@/components/ui/styles'
import { api, authErrorMessage, reloadAccount, type AuthUser } from '@/lib/auth'
import type { Country } from '@/lib/workspace'
import { LOCALE_COOKIE } from '@/i18n/config'
import { useI18n } from '@/i18n/client'
import { DetailList, Panel } from './Panel'

type Form = { firstName: string; lastName: string; phone: string; country: string; locale: 'en' | 'fr' }

export default function PersonalDetails({ user, delay }: { user: AuthUser; delay: number }) {
  const router = useRouter()
  const { t } = useI18n()
  const copy = t.workspace.account.personal
  const [countries, setCountries] = useState<Country[]>([])
  const [form, setForm] = useState<Form | null>(null)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api<{ items: Country[] }>('/config/countries')
      .then(result => setCountries(result.items))
      .catch(() => setCountries([]))
  }, [])

  const edit = () => {
    setForm({ firstName: user.firstName, lastName: user.lastName, phone: user.phone ?? '', country: user.country ?? '', locale: user.locale ?? 'en' })
    setNotice('')
    setError('')
  }

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form) return
    setBusy(true)
    setError('')
    try {
      await api('/users/me', { method: 'PATCH', body: { firstName: form.firstName.trim(), lastName: form.lastName.trim(), phone: form.phone.trim() || null, country: form.country || null, locale: form.locale } })
      await reloadAccount()
      if (form.locale !== user.locale) {
        document.cookie = `${LOCALE_COOKIE}=${form.locale}; path=/; max-age=31536000; samesite=lax`
        router.refresh()
      }
      setForm(null)
      setNotice(copy.saved)
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
    } finally {
      setBusy(false)
    }
  }

  const set = (key: keyof Form) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(current => (current ? { ...current, [key]: event.target.value } : current))
  const countryName = countries.find(country => country.iso2 === user.country)?.name
  const muted = (value?: string | null) => (value ? value : <span className="text-ink-400">{copy.notSet}</span>)

  return (
    <Panel
      icon="user"
      title={copy.title}
      delay={delay}
      action={!form && <button type="button" onClick={edit} className={`${button.secondary} w-full sm:w-auto`}>{copy.edit}</button>}
    >
      {notice && <div className="mb-4"><FormAlert tone="success">{notice}</FormAlert></div>}
      {form ? (
        <form onSubmit={save} className="space-y-5">
          <fieldset disabled={busy} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={copy.firstName} autoComplete="given-name" required maxLength={80} value={form.firstName} onChange={set('firstName')} />
              <Field label={copy.lastName} autoComplete="family-name" required maxLength={80} value={form.lastName} onChange={set('lastName')} />
            </div>
            <Field label={copy.email} value={user.email} readOnly disabled hint={copy.emailHint} />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={copy.phone} type="tel" autoComplete="tel" maxLength={32} value={form.phone} onChange={set('phone')} />
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-ink-900">{copy.country}</span>
                <select value={form.country} onChange={set('country')} className={input}>
                  <option value="">{copy.notSet}</option>
                  {countries.map(country => <option key={country.iso2} value={country.iso2}>{country.name}</option>)}
                </select>
              </label>
            </div>
            <label className="block sm:max-w-[calc(50%-10px)]">
              <span className="mb-1.5 block text-sm font-semibold text-ink-900">{copy.language}</span>
              <select value={form.locale} onChange={set('locale')} className={input}>
                <option value="en">{copy.languages.en}</option>
                <option value="fr">{copy.languages.fr}</option>
              </select>
            </label>
          </fieldset>
          {error && <FormAlert>{error}</FormAlert>}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => setForm(null)} disabled={busy} className={button.secondary}>{copy.cancel}</button>
            <button type="submit" disabled={busy} className={button.primary}><BusyLabel busy={busy} label={copy.save} busyLabel={copy.saving} /></button>
          </div>
        </form>
      ) : (
        <DetailList
          rows={[
            [copy.firstName, user.firstName],
            [copy.lastName, muted(user.lastName)],
            [copy.email, user.email],
            [copy.phone, muted(user.phone)],
            [copy.country, muted(countryName ?? user.country?.toUpperCase())],
            [copy.language, copy.languages[user.locale ?? 'en']]
          ]}
        />
      )}
    </Panel>
  )
}
