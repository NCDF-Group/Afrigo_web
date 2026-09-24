import Link from 'next/link'
import Icon, { IconBadge, type IconName } from '@/components/ui/Icon'
import { button, card } from '@/components/ui/styles'
import { CheckItem, CtaBand, HeroBackdrop, SectionHeading, revealDelay } from '@/components/site/Section'
import Typewriter from '@/components/site/Typewriter'
import AfricaMarketsMap from '@/components/site/AfricaMarketsMap'
import { getDictionary } from '@/i18n/server'

const stepIcons: IconName[] = ['building', 'search', 'message', 'briefcase', 'activity']
const opportunityLinks: { href: string; icon: IconName }[] = [
  { href: '/opportunities?type=products', icon: 'package' },
  { href: '/opportunities?type=requests', icon: 'target' },
  { href: '/opportunities?type=supply', icon: 'layers' }
]
const serviceIcons: IconName[] = ['truck', 'clipboard', 'file']

export default async function HomePage() {
  const { locale, t } = await getDictionary()
  const copy = t.home
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-brand-900">
        <HeroBackdrop image="/images/hero-home.webp" position="68% center" />
        <div className="mx-auto flex min-h-[calc(100svh-64px)] max-w-site flex-col justify-center px-4 py-20 sm:px-6 lg:min-h-[640px] lg:px-8 lg:py-28">
          <p className="text-xs font-bold uppercase tracking-[.08em] text-accent-300">{copy.hero.overline}</p>
          <h1 className={`mt-5 font-display font-extrabold leading-[1.08] tracking-[-.02em] text-white ${locale === 'en' ? 'max-w-4xl text-[clamp(2.25rem,5.5vw,4.25rem)]' : 'max-w-5xl text-[clamp(2rem,4.6vw,3.6rem)]'}`}>
            <span className="sr-only">{copy.hero.srTitle}</span>
            <span aria-hidden="true" className="block text-balance">{copy.hero.lead}</span>
            <span className={`block min-h-[2.16em] text-accent-400 ${locale === 'en' ? 'sm:min-h-[1.08em]' : 'xl:min-h-[1.08em]'}`}>
              <Typewriter key={locale} phrases={copy.hero.phrases} />
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
            {copy.hero.text}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/register" className={`${button.accent} min-h-12 px-7 text-[15px]`}>{t.common.registerYourBusiness}</Link>
            <Link href="/opportunities" className={`${button.ghostLight} min-h-12 px-7 text-[15px]`}>{t.common.exploreOpportunities}</Link>
          </div>
          <p className="mt-10 max-w-xl text-sm text-white/60">{copy.hero.note}</p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-site flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:gap-8 lg:px-8">
          <p className="shrink-0 text-sm font-semibold text-ink-500">{copy.builtFor}</p>
          <ul className="flex flex-wrap gap-2">
            {copy.audiences.map((item, index) => (
              <li key={item} data-reveal style={revealDelay(index, 60)} className="rounded-full border border-line bg-canvas px-4 py-1.5 text-sm font-semibold text-ink-700">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading overline={copy.how.overline} title={copy.how.title} text={copy.how.text} />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {copy.how.steps.map((step, index) => (
            <li key={index} data-reveal style={revealDelay(index)} className={`${card.light} p-6`}>
              <div className="flex items-center justify-between">
                <IconBadge name={stepIcons[index]} />
                <span className="font-display text-sm font-bold text-ink-400">0{index + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-ink-500">{step.text}</p>
            </li>
          ))}
        </ol>
        <Link href="/how-it-works" className={`${button.link} mt-8 inline-block`}>{copy.how.more}</Link>
      </section>

      {/* Opportunities */}
      <section className="bg-subtle">
        <div className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading overline={copy.opportunities.overline} title={copy.opportunities.title} />
            <Link href="/opportunities" className={button.primary}>{t.common.exploreOpportunities}</Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {copy.opportunities.types.map((item, index) => (
              <Link key={index} href={opportunityLinks[index].href} data-reveal style={revealDelay(index)} className={`${card.light} block`}>
                <IconBadge name={opportunityLinks[index].icon} />
                <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-6 text-ink-500">{item.text}</p>
                <span className="mt-6 inline-block text-sm font-bold text-brand-600">{item.browse}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Market access */}
      <section className="bg-brand-900">
        <div className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <AfricaMarketsMap tone="dark">
            <SectionHeading invert overline={copy.market.overline} title={copy.market.title} text={copy.market.text} />
          </AfricaMarketsMap>
          <p data-reveal className="mt-10 flex gap-3 rounded-card border border-accent-400/30 bg-accent-400/10 p-4 text-sm leading-6 text-accent-100">
            <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-accent-300" />
            {copy.market.disclaimer}
          </p>
        </div>
      </section>

      {/* Trade workspace */}
      <section className="mx-auto grid max-w-site gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
        <SectionHeading overline={copy.workspace.overline} title={copy.workspace.title} text={copy.workspace.text} />
        <ul className="grid gap-3">
          {copy.workspace.items.map((item, index) => (
            <CheckItem key={index} reveal style={revealDelay(index)} className={`${card.light} p-5 text-[15px] font-medium leading-6 text-ink-700`}>{item}</CheckItem>
          ))}
        </ul>
      </section>

      {/* Services */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading overline={copy.services.overline} title={copy.services.title} text={copy.services.text} />
            <Link href="/services" className={button.secondary}>{copy.services.cta}</Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {copy.services.items.map((item, index) => (
              <div key={index} data-reveal style={revealDelay(index)} className={card.light}>
                <IconBadge name={serviceIcons[index]} />
                <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-6 text-ink-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
