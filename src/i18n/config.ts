export const LOCALES = ['en', 'fr'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'
export const LOCALE_COOKIE = 'afrigo-locale'

export const isLocale = (value: unknown): value is Locale => LOCALES.includes(value as Locale)

// BCP 47 tags for Intl formatting (numbers, dates, collation).
export const INTL_LOCALE: Record<Locale, string> = { en: 'en-GB', fr: 'fr-FR' }

// Tiny interpolation helper: fmt('{count} items', { count: 3 }) → '3 items'.
export const fmt = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (match, key) => (key in values ? String(values[key]) : match))
