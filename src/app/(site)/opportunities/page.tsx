import type { Metadata } from 'next'
import Link from 'next/link'
import Icon, { IconBadge } from '@/components/ui/Icon'
import { button, card, input } from '@/components/ui/styles'
import { CtaBand, PageHero, revealDelay } from '@/components/site/Section'
import { filterOpportunities, getPublicOpportunities, type OpportunityType } from '@/lib/opportunities'

export const metadata: Metadata = {
  title: 'Trade opportunities',
  description: 'Search products, buyer requests and supply opportunities from African businesses.'
}

const types: { value: 'all' | OpportunityType; label: string }[] = [
  { value: 'all', label: 'All opportunities' },
  { value: 'products', label: 'Products' },
  { value: 'requests', label: 'Buyer requests' },
  { value: 'supply', label: 'Supply opportunities' }
]

const typeLabel: Record<OpportunityType, string> = { products: 'Product', requests: 'Buyer request', supply: 'Supply' }

type Search = { q?: string; type?: string; location?: string }

export default async function OpportunitiesPage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams
  const type = types.some(item => item.value === params.type) ? params.type! : 'all'
  const { items, available } = await getPublicOpportunities()
  const results = filterOpportunities(items, { q: params.q, type, location: params.location })
  const filtered = Boolean(params.q || params.location || type !== 'all')

  return (
    <>
      <PageHero
        overline="Trade opportunities"
        title="Find products, buyers and supply across Africa"
        text="Browse what African businesses are offering and looking for. Register to publish your own listings and contact businesses directly."
        image="/images/hero-opportunities.webp"
        position="85% center"
      />

      <section className="mx-auto max-w-site px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Plain GET form: works without JavaScript and keeps filters shareable in the URL */}
        <form action="/opportunities" method="get" role="search" className="grid gap-3 rounded-card border border-line bg-white p-4 shadow-sm md:grid-cols-[1.5fr_1fr_1fr_auto] md:p-5">
          <label className="block">
            <span className="sr-only">Search</span>
            <span className="relative block">
              <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
              <input name="q" defaultValue={params.q} placeholder="Product, e.g. cashew, sesame, shea" className={`${input} pl-11`} />
            </span>
          </label>
          <label className="block">
            <span className="sr-only">Country or location</span>
            <input name="location" defaultValue={params.location} placeholder="Country or city" className={input} />
          </label>
          <label className="block">
            <span className="sr-only">Opportunity type</span>
            <select name="type" defaultValue={type} className={input}>
              {types.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>
          <button type="submit" className={`${button.primary} min-h-12`}>Search</button>
        </form>

        <nav aria-label="Opportunity types" className="mt-6 flex flex-wrap gap-2">
          {types.map(item => {
            const active = item.value === type
            const href = item.value === 'all' ? '/opportunities' : `/opportunities?type=${item.value}`
            return (
              <Link key={item.value} href={href} aria-current={active ? 'page' : undefined} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${active ? 'border-brand-600 bg-brand-600 text-white' : 'border-line bg-white text-ink-700 hover:border-brand-300'}`}>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {results.length > 0 ? (
          <>
            <p className="mt-8 text-sm text-ink-500">{results.length} {results.length === 1 ? 'opportunity' : 'opportunities'}</p>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((item, index) => (
                <li key={`${item.type}-${item.id}`} data-reveal style={revealDelay(index % 6, 70)} className={`${card.light} flex flex-col p-6`}>
                  <span className={`self-start rounded-full px-3 py-1 text-xs font-bold ${item.type === 'requests' ? 'bg-gold-50 text-gold-700' : 'bg-brand-50 text-brand-700'}`}>{typeLabel[item.type]}</span>
                  <h2 className="mt-4 font-display text-lg font-semibold text-ink-900">{item.title}</h2>
                  <dl className="mt-3 space-y-1.5 text-sm text-ink-500">
                    {item.quantity && <div className="flex gap-2"><dt className="font-semibold text-ink-700">Quantity</dt><dd>{item.quantity.toLocaleString()} {item.unit}</dd></div>}
                    {item.location && <div className="flex gap-2"><dt className="font-semibold text-ink-700">{item.type === 'requests' ? 'Destination' : 'Origin'}</dt><dd>{item.location}</dd></div>}
                    {item.grade && <div className="flex gap-2"><dt className="font-semibold text-ink-700">Grade</dt><dd>{item.grade}</dd></div>}
                  </dl>
                  {item.summary && <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink-500">{item.summary}</p>}
                  <div className="mt-auto pt-6">
                    <Link href={`/sign-in?next=${encodeURIComponent('/dashboard')}`} className={`${button.secondary} w-full`}>Sign in to enquire</Link>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div data-reveal className="mt-10 rounded-card border border-dashed border-line-strong bg-white px-6 py-16 text-center">
            <div className="flex justify-center"><IconBadge name={filtered ? 'search' : 'package'} /></div>
            <h2 className="mt-5 font-display text-xl font-semibold text-ink-900">
              {!available ? 'Opportunities are temporarily unavailable' : filtered ? 'No opportunities match your search' : 'Public opportunities are coming soon'}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-[15px] leading-6 text-ink-500">
              {!available
                ? 'We could not load listings right now. Please try again in a few minutes.'
                : filtered
                  ? 'Try a different product or country, or clear your filters.'
                  : 'Businesses in our pilot markets are publishing their first products and buyer requests. Register to be among the first to list.'}
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              {filtered ? <Link href="/opportunities" className={button.secondary}>Clear filters</Link> : null}
              <Link href="/register" className={button.primary}>Register to publish</Link>
            </div>
          </div>
        )}
      </section>

      <CtaBand title="Have something to sell or source?" text="Publish products and buyer requests so the right businesses can find you." />
    </>
  )
}
