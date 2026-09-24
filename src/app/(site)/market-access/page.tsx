import type { Metadata } from 'next'
import Link from 'next/link'
import Icon, { IconBadge, type IconName } from '@/components/ui/Icon'
import { button, card } from '@/components/ui/styles'
import { CheckItem, CtaBand, PageHero, SectionHeading, revealDelay } from '@/components/site/Section'
import AfricaMarketsMap from '@/components/site/AfricaMarketsMap'
import { fmt } from '@/i18n/config'
import { getDictionary } from '@/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary()
  return t.meta.pages.marketAccess
}

const flowIcons: IconName[] = ['pin', 'book', 'clipboard']
const schemeLinks = [
  { id: 'etls', href: 'https://etls.ecowas.int' },
  { id: 'afcfta', href: 'https://au-afcfta.org' }
]

export default async function MarketAccessPage() {
  const { t } = await getDictionary()
  const copy = t.marketAccess

  return (
    <>
      <PageHero overline={copy.hero.overline} title={copy.hero.title} text={copy.hero.text} image="/images/hero-market-access.webp" position="60% center">
        <Link href="/register" className={`${button.accent} min-h-12 px-7 text-[15px]`}>{copy.hero.register}</Link>
        <Link href="/contact?topic=market-access" className={`${button.ghostLight} min-h-12 px-7 text-[15px]`}>{copy.hero.ask}</Link>
      </PageHero>

      <section className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading overline={copy.how.overline} title={copy.how.title} />
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {copy.how.steps.map((item, index) => (
            <li key={index} data-reveal style={revealDelay(index)} className={card.light}>
              <div className="flex items-center justify-between">
                <IconBadge name={flowIcons[index]} />
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
          <SectionHeading invert overline={copy.schemes.overline} title={copy.schemes.title} text={copy.schemes.text} />
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {copy.schemes.items.map((scheme, index) => (
              <article key={schemeLinks[index].id} id={schemeLinks[index].id} data-reveal style={revealDelay(index)} className={`${card.dark} p-7 lg:p-8`}>
                <div className="flex items-start gap-4">
                  <IconBadge name="globe" tone="dark" />
                  <div>
                    <h3 className="font-display text-2xl font-bold text-accent-300">{scheme.name}</h3>
                    <p className="text-sm font-semibold text-white/60">{scheme.full}</p>
                  </div>
                </div>
                <p className="mt-5 text-[15px] leading-6 text-white/80">{scheme.text}</p>
                <ul className="mt-5 space-y-3 text-[15px] leading-6 text-white/75">
                  {scheme.points.map((point, pointIndex) => <CheckItem key={pointIndex} invert>{point}</CheckItem>)}
                </ul>
                <a href={schemeLinks[index].href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm font-bold text-accent-300 underline-offset-4 hover:underline">
                  {fmt(copy.schemes.officialSource, { label: scheme.sourceLabel })}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <AfricaMarketsMap tone="light">
          <SectionHeading overline={copy.markets.overline} title={copy.markets.title} text={copy.markets.text} />
        </AfricaMarketsMap>
        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div data-reveal className="rounded-card border-2 border-accent-400 bg-accent-50 p-7">
            <div className="flex items-center gap-3">
              <Icon name="shield" className="h-6 w-6 text-accent-700" />
              <h3 className="font-display text-lg font-bold text-ink-900">{copy.notDo.title}</h3>
            </div>
            <ul className="mt-5 space-y-3 text-[15px] leading-6 text-ink-700">
              {copy.notDo.items.map((item, index) => <CheckItem key={index}>{item}</CheckItem>)}
            </ul>
            <p className="mt-5 text-sm leading-6 text-ink-500">{copy.notDo.note}</p>
          </div>
          <Link href="/contact?topic=market-access" className={`${button.secondary} lg:mt-2`}>{copy.askMarket}</Link>
        </div>
      </section>

      <CtaBand title={copy.cta.title} text={copy.cta.text} />
    </>
  )
}
