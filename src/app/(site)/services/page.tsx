import type { Metadata } from 'next'
import Link from 'next/link'
import { IconBadge, type IconName } from '@/components/ui/Icon'
import { button, card } from '@/components/ui/styles'
import { CheckItem, CtaBand, PageHero, SectionHeading, revealDelay } from '@/components/site/Section'
import { getDictionary } from '@/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary()
  return t.meta.pages.services
}

const serviceIcons: IconName[] = ['truck', 'clipboard', 'file']
const planLinks = ['/register', '#how-services-work', '/contact?topic=partnership']

export default async function ServicesPage() {
  const { t } = await getDictionary()
  const copy = t.services

  return (
    <>
      <PageHero overline={copy.hero.overline} title={copy.hero.title} text={copy.hero.text} image="/images/hero-services.webp" position="70% center">
        <Link href="/register" className={`${button.accent} min-h-12 px-7 text-[15px]`}>{t.common.registerYourBusiness}</Link>
        <Link href="/contact?topic=partner" className={`${button.ghostLight} min-h-12 px-7 text-[15px]`}>{copy.hero.partner}</Link>
      </PageHero>

      <section className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading overline={copy.what.overline} title={copy.what.title} />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {copy.what.items.map((item, index) => (
            <article key={index} data-reveal style={revealDelay(index)} className={card.light}>
              <IconBadge name={serviceIcons[index]} />
              <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-ink-500">{item.text}</p>
              <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-[15px] leading-6 text-ink-700">
                {item.includes.map((point, pointIndex) => <CheckItem key={pointIndex}>{point}</CheckItem>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="how-services-work" className="scroll-mt-20 bg-subtle">
        <div className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading overline={copy.flow.overline} title={copy.flow.title} text={copy.flow.text} />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.flow.steps.map((step, index) => (
              <li key={index} data-reveal style={revealDelay(index)} className={`${card.light} p-6`}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-display font-bold text-white">{index + 1}</span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-6 text-ink-500">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading center overline={copy.pricing.overline} title={copy.pricing.title} text={copy.pricing.text} />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {copy.pricing.plans.map((plan, index) => {
            const featured = index === 0
            return (
              <article key={index} data-reveal style={revealDelay(index)} className={`${card.light} flex flex-col ${featured ? 'outline outline-2 -outline-offset-1 outline-brand-600' : ''}`}>
                {featured && <span className="mb-4 self-start rounded-full bg-accent-50 px-3 py-1 text-xs font-bold text-accent-700">{copy.pricing.nowOpen}</span>}
                <h3 className="font-display text-2xl font-bold text-ink-900">{plan.title}</h3>
                <p className="mt-2 text-[15px] leading-6 text-ink-500">{plan.text}</p>
                <ul className="mt-6 space-y-3 text-[15px] leading-6 text-ink-700">
                  {plan.points.map((point, pointIndex) => <CheckItem key={pointIndex}>{point}</CheckItem>)}
                </ul>
                <div className="mt-auto pt-8">
                  <Link href={planLinks[index]} className={`${featured ? button.primary : button.secondary} w-full`}>{plan.cta}</Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="bg-brand-900">
        <div className="mx-auto grid max-w-site gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
          <SectionHeading invert overline={copy.partners.overline} title={copy.partners.title} text={copy.partners.text} />
          <div data-reveal className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link href="/contact?topic=partner" className={`${button.accent} min-h-12 px-7 text-[15px]`}>{copy.partners.apply}</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
