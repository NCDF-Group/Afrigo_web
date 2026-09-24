import type { Metadata } from 'next'
import Link from 'next/link'
import Icon, { IconBadge, type IconName } from '@/components/ui/Icon'
import { button, card } from '@/components/ui/styles'
import { CheckItem, CtaBand, PageHero, SectionHeading, revealDelay } from '@/components/site/Section'
import AfricaMarketsMap from '@/components/site/AfricaMarketsMap'

export const metadata: Metadata = {
  title: 'Market access',
  description: 'Traceable ETLS and AfCFTA guidance: requirements, official references and preparation tasks for trade across Africa.'
}

const flow: { title: string; text: string; icon: IconName }[] = [
  { title: 'Tell us the trade', text: 'Choose the product, the country of origin and the destination country.', icon: 'pin' },
  { title: 'Get traceable guidance', text: 'See the applicable ETLS or AfCFTA requirements, each with its official reference and the date it was last reviewed.', icon: 'book' },
  { title: 'Prepare and escalate', text: 'Upload origin evidence, track preparation tasks and escalate unresolved questions to the Afrigo team.', icon: 'clipboard' }
]

const schemes = [
  {
    id: 'etls',
    name: 'ETLS',
    full: 'ECOWAS Trade Liberalisation Scheme',
    text: 'The scheme for duty-free movement of qualifying goods between ECOWAS member states.',
    points: [
      'Covers unprocessed goods, livestock and traditional handicrafts',
      'Industrial products need the product and manufacturer to be approved under the scheme',
      'Qualifying industrial goods travel with an ECOWAS certificate of origin',
      'Approval runs through national authorities in each member state'
    ],
    source: { label: 'ECOWAS ETLS portal', href: 'https://etls.ecowas.int' }
  },
  {
    id: 'afcfta',
    name: 'AfCFTA',
    full: 'African Continental Free Trade Area',
    text: 'The continental agreement for preferential trade between State Parties that are trading under it.',
    points: [
      'Goods must meet AfCFTA rules of origin — wholly obtained or sufficiently transformed',
      'Product-specific rules decide what counts as sufficient transformation',
      'Preferences depend on both countries’ published tariff schedules',
      'Claims are supported by an AfCFTA certificate of origin from a competent authority'
    ],
    source: { label: 'AfCFTA Secretariat', href: 'https://au-afcfta.org' }
  }
]

export default function MarketAccessPage() {
  return (
    <>
      <PageHero
        overline="Market access"
        title="Know what it takes to trade across borders"
        text="Clear, referenced guidance for ETLS and AfCFTA — so you can prepare the right evidence before goods move."
        image="/images/hero-market-access.webp"
        position="60% center"
      >
        <Link href="/register" className={`${button.accent} min-h-12 px-7 text-[15px]`}>Register to use guidance</Link>
        <Link href="/contact?topic=market-access" className={`${button.ghostLight} min-h-12 px-7 text-[15px]`}>Ask a question</Link>
      </PageHero>

      <section className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading overline="How guidance works" title="Guidance you can trace back to the source" />
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {flow.map((item, index) => (
            <li key={item.title} data-reveal style={revealDelay(index)} className={card.light}>
              <div className="flex items-center justify-between">
                <IconBadge name={item.icon} />
                <span className="font-display text-sm font-bold text-ink-400">0{index + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-6 text-ink-500">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-brand-900">
        <div className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading invert overline="Trade schemes" title="Separate workflows for ETLS and AfCFTA" text="The two schemes have different eligibility, evidence and approval steps, so Afrigo keeps them apart." />
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {schemes.map((scheme, index) => (
              <article key={scheme.id} id={scheme.id} data-reveal style={revealDelay(index)} className={`${card.dark} p-7 lg:p-8`}>
                <div className="flex items-start gap-4">
                  <IconBadge name="globe" tone="dark" />
                  <div>
                    <h3 className="font-display text-2xl font-bold text-gold-300">{scheme.name}</h3>
                    <p className="text-sm font-semibold text-white/60">{scheme.full}</p>
                  </div>
                </div>
                <p className="mt-5 text-[15px] leading-6 text-white/80">{scheme.text}</p>
                <ul className="mt-5 space-y-3 text-[15px] leading-6 text-white/75">
                  {scheme.points.map(point => <CheckItem key={point} invert>{point}</CheckItem>)}
                </ul>
                <a href={scheme.source.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm font-bold text-gold-300 underline-offset-4 hover:underline">
                  Official source: {scheme.source.label}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <AfricaMarketsMap tone="light">
          <SectionHeading overline="Supported markets" title="Starting in West Africa, built for the continent" text="The pilot covers selected West African markets. Countries, currencies, products and trade requirements are configurable, so new markets can be added as demand grows." />
        </AfricaMarketsMap>
        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div data-reveal className="rounded-card border-2 border-gold-400 bg-gold-50 p-7">
          <div className="flex items-center gap-3">
            <Icon name="shield" className="h-6 w-6 text-gold-700" />
            <h3 className="font-display text-lg font-bold text-ink-900">What Afrigo does not do</h3>
          </div>
          <ul className="mt-5 space-y-3 text-[15px] leading-6 text-ink-700">
            <CheckItem>Afrigo does not issue certificates of origin or any other official certificate.</CheckItem>
            <CheckItem>Afrigo never promises or guarantees duty-free access.</CheckItem>
            <CheckItem>Eligibility and duties are decided by customs and the competent authorities in each country.</CheckItem>
          </ul>
          <p className="mt-5 text-sm leading-6 text-ink-500">Guidance shows its official reference and last-review date. Always confirm requirements with the relevant authority before shipping.</p>
        </div>
          <Link href="/contact?topic=market-access" className={`${button.secondary} lg:mt-2`}>Ask about your market</Link>
        </div>
      </section>

      <CtaBand title="Prepare your next shipment with confidence" text="Register to check requirements, upload origin evidence and track preparation tasks." />
    </>
  )
}
