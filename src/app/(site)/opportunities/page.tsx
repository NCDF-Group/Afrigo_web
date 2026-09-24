import type { Metadata } from 'next'
import Link from 'next/link'
import Icon, { IconBadge } from '@/components/ui/Icon'
import { button, card, input } from '@/components/ui/styles'
import { CtaBand, PageHero, revealDelay } from '@/components/site/Section'
import { filterOpportunities, getPublicOpportunities, type OpportunityType } from '@/lib/opportunities'
import { fmt, INTL_LOCALE } from '@/i18n/config'
import { getDictionary } from '@/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary()
  return t.meta.pages.opportunities
}

const TYPES = ['all', 'products', 'requests', 'supply'] as const
type Search = { q?: string; type?: string; location?: string }

export default async function OpportunitiesPage({ searchParams }: { searchParams: Promise<Search> }) {
  const [params, { locale, t }] = await Promise.all([searchParams, getDictionary()])
  const copy = t.opportunities
  const type = TYPES.find(value => value === params.type) || 'all'
  const { items, available } = await getPublicOpportunities()
  const results = filterOpportunities(items, { q: params.q, type, location: params.location })
  const filtered = Boolean(params.q || params.location || type !== 'all')
  const number = new Intl.NumberFormat(INTL_LOCALE[locale])

  return (
    <>
      <PageHero overline={copy.hero.overline} title={copy.hero.title} text={copy.hero.text} image="/images/hero-opportunities.webp" position="85% center" />

      <section className="mx-auto max-w-site px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Plain GET form: works without JavaScript and keeps filters shareable in the URL */}
        <form action="/opportunities" method="get" role="search" className="grid gap-3 rounded-card border border-line bg-white p-4 shadow-sm md:grid-cols-[1.5fr_1fr_1fr_auto] md:p-5">
          <label className="block">
            <span className="sr-only">{copy.form.search}</span>
            <span className="relative block">
              <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
              <input name="q" defaultValue={params.q} placeholder={copy.form.searchPlaceholder} className={`${input} pl-11`} />
            </span>
          </label>
          <label className="block">
            <span className="sr-only">{copy.form.location}</span>
            <input name="location" defaultValue={params.location} placeholder={copy.form.locationPlaceholder} className={input} />
          </label>
          <label className="block">
            <span className="sr-only">{copy.form.type}</span>
            <select name="type" defaultValue={type} className={input}>
              {TYPES.map(value => <option key={value} value={value}>{copy.types[value]}</option>)}
            </select>
          </label>
          <button type="submit" className={`${button.primary} min-h-12`}>{copy.form.submit}</button>
        </form>

        <nav aria-label={copy.typesNav} className="mt-6 flex flex-wrap gap-2">
          {TYPES.map(value => {
            const active = value === type
            const href = value === 'all' ? '/opportunities' : `/opportunities?type=${value}`
            return (
              <Link key={value} href={href} aria-current={active ? 'page' : undefined} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${active ? 'border-brand-600 bg-brand-600 text-white' : 'border-line bg-white text-ink-700 hover:border-brand-300'}`}>
                {copy.types[value]}
              </Link>
            )
          })}
        </nav>

        {results.length > 0 ? (
          <>
            <p className="mt-8 text-sm text-ink-500">{fmt(results.length === 1 ? copy.countOne : copy.countOther, { count: number.format(results.length) })}</p>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((item, index) => (
                <li key={`${item.type}-${item.id}`} data-reveal style={revealDelay(index % 6, 70)} className={`${card.light} flex flex-col p-6`}>
                  <span className={`self-start rounded-full px-3 py-1 text-xs font-bold ${item.type === 'requests' ? 'bg-accent-50 text-accent-700' : 'bg-brand-50 text-brand-700'}`}>{copy.typeLabel[item.type as OpportunityType]}</span>
                  <h2 className="mt-4 font-display text-lg font-semibold text-ink-900">{item.title}</h2>
                  <dl className="mt-3 space-y-1.5 text-sm text-ink-500">
                    {item.quantity && <div className="flex gap-2"><dt className="font-semibold text-ink-700">{copy.quantity}</dt><dd>{number.format(item.quantity)} {item.unit}</dd></div>}
                    {item.location && <div className="flex gap-2"><dt className="font-semibold text-ink-700">{item.type === 'requests' ? copy.destination : copy.origin}</dt><dd>{item.location}</dd></div>}
                    {item.grade && <div className="flex gap-2"><dt className="font-semibold text-ink-700">{copy.grade}</dt><dd>{item.grade}</dd></div>}
                  </dl>
                  {item.summary && <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink-500">{item.summary}</p>}
                  <div className="mt-auto pt-6">
                    <Link href={`/sign-in?next=${encodeURIComponent('/dashboard')}`} className={`${button.secondary} w-full`}>{copy.signInToEnquire}</Link>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div data-reveal className="mt-10 rounded-card border border-dashed border-line-strong bg-white px-6 py-16 text-center">
            <div className="flex justify-center"><IconBadge name={filtered ? 'search' : 'package'} /></div>
            <h2 className="mt-5 font-display text-xl font-semibold text-ink-900">
              {!available ? copy.empty.unavailableTitle : filtered ? copy.empty.noMatchTitle : copy.empty.comingTitle}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-[15px] leading-6 text-ink-500">
              {!available ? copy.empty.unavailableText : filtered ? copy.empty.noMatchText : copy.empty.comingText}
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              {filtered ? <Link href="/opportunities" className={button.secondary}>{copy.empty.clear}</Link> : null}
              <Link href="/register" className={button.primary}>{copy.empty.register}</Link>
            </div>
          </div>
        )}
      </section>

      <CtaBand title={copy.cta.title} text={copy.cta.text} />
    </>
  )
}
