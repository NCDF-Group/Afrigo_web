import Link from 'next/link'
import Logo from '@/components/brand/Logo'
import { fmt } from '@/i18n/config'
import { getDictionary } from '@/i18n/server'
import LanguageSwitcher from './LanguageSwitcher'
import { footerNav } from './nav'

export default async function SiteFooter() {
  const { t } = await getDictionary()
  return (
    <footer className="bg-brand-900 text-white/70">
      <div className="mx-auto max-w-site px-4 pb-8 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="full" tone="light" className="h-14" />
            <p className="mt-5 max-w-xs text-sm leading-6">{t.footer.blurb}</p>
          </div>
          {footerNav.map(group => {
            const copy = t.footer.groups[group.key]
            return (
              <nav key={group.key} aria-label={copy.title}>
                <p className="font-display text-sm font-semibold text-white">{copy.title}</p>
                <ul className="mt-4 space-y-3 text-sm">
                  {group.links.map(link => (
                    <li key={link.href}>
                      <Link href={link.href} className="transition-colors hover:text-accent-300">{(copy.links as Record<string, string>)[link.key]}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )
          })}
        </div>
        <div className="flex flex-col gap-4 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>{fmt(t.footer.rights, { year: new Date().getFullYear() })}</p>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  )
}
