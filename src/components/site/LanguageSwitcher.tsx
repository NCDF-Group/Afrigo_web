'use client'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { LOCALE_COOKIE, LOCALES, type Locale } from '@/i18n/config'
import { useI18n } from '@/i18n/client'

// Stores the choice in a cookie (read by the server on every request) and re-renders the current page.
export default function LanguageSwitcher() {
  const { locale, t } = useI18n()
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const choose = (next: Locale) => {
    if (next === locale) return
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`
    document.documentElement.lang = next
    startTransition(() => router.refresh())
  }

  const labels: Record<Locale, string> = { en: t.common.english, fr: t.common.french }

  return (
    <div role="group" aria-label={t.common.language} className={`flex items-center gap-1 transition-opacity ${pending ? 'opacity-60' : ''}`}>
      {LOCALES.map((value, index) => (
        <span key={value} className="flex items-center gap-1">
          {index > 0 && <span aria-hidden="true" className="text-white/30">·</span>}
          <button
            type="button"
            lang={value}
            aria-pressed={locale === value}
            disabled={pending}
            onClick={() => choose(value)}
            className={`rounded-input px-2 py-1 transition-colors ${locale === value ? 'font-bold text-white' : 'text-white/60 hover:text-accent-300'}`}
          >
            {labels[value]}
          </button>
        </span>
      ))}
    </div>
  )
}
