import Link from 'next/link'
import Logo from '@/components/brand/Logo'
import { BRAND } from '@/lib/brand'
import { footerNav } from './nav'

export default function SiteFooter() {
  return (
    <footer className="bg-brand-900 text-white/70">
      <div className="mx-auto max-w-site px-4 pb-8 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-6">{BRAND.promise} Built for exporters, importers, manufacturers, cooperatives, aggregators and trade-service providers.</p>
          </div>
          {footerNav.map(group => (
            <nav key={group.title} aria-label={group.title}>
              <p className="font-display text-sm font-semibold text-white">{group.title}</p>
              <ul className="mt-4 space-y-3 text-sm">
                {group.links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-gold-300">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-col gap-4 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {BRAND.owner}. {BRAND.name} — all rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>English</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="text-white/40">Français (coming soon)</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
