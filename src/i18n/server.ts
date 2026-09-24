import { cookies } from 'next/headers'
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE, type Locale } from './config'
import { en, type Dictionary } from './dictionaries/en'
import { fr } from './dictionaries/fr'

const DICTIONARIES: Record<Locale, Dictionary> = { en, fr }

// English is the default; French only when the visitor has chosen it in the footer switcher.
export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value
  return isLocale(value) ? value : DEFAULT_LOCALE
}

export async function getDictionary() {
  const locale = await getLocale()
  return { locale, t: DICTIONARIES[locale] }
}

// Only the namespaces client components need are sent to the browser.
export const clientDictionary = (t: Dictionary) => ({ common: t.common, nav: t.nav, map: t.map, countries: t.countries, contactForm: t.contactForm, auth: t.auth, errors: t.errors })
export type ClientDictionary = ReturnType<typeof clientDictionary>
