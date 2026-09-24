import type { Metadata } from 'next'
import Link from 'next/link'
import { IconBadge, type IconName } from '@/components/ui/Icon'
import { button, card } from '@/components/ui/styles'
import { CheckItem, CtaBand, PageHero, SectionHeading, revealDelay } from '@/components/site/Section'
import { getDictionary } from '@/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary()
  return t.meta.pages.howItWorks
}

const stepIcons: IconName[] = ['building', 'search', 'message', 'briefcase', 'activity']
const roleIcons: IconName[] = ['building', 'users', 'truck', 'shield']

export default async function HowItWorksPage() {
  const { t } = await getDictionary()
  const copy = t.howItWorks
  const sides = [
    { ...copy.both.selling, icon: 'package' as const },
    { ...copy.both.buying, icon: 'target' as const }
  ]

  return (
    <>
      <PageHero overline={copy.hero.overline} title={copy.hero.title} text={copy.hero.text} image="/images/hero-how-it-works.webp" position="70% center">
        <Link href="/register" className={`${button.accent} min-h-12 px-7 text-[15px]`}>{t.common.registerYourBusiness}</Link>
        <Link href="/opportunities" className={`${button.ghostLight} min-h-12 px-7 text-[15px]`}>{t.common.exploreOpportunities}</Link>
      </PageHero>

      <section className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading overline={copy.journey.overline} title={copy.journey.title} />
        <ol className="relative mt-14 space-y-6 before:absolute before:bottom-6 before:left-[27px] before:top-6 before:w-px before:bg-line md:before:left-[31px]">
          {copy.steps.map((step, index) => (
            <li key={index} data-reveal style={revealDelay(index, 70)} className="relative grid gap-5 md:grid-cols-[64px_1fr]">
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-canvas bg-brand-600 font-display text-lg font-bold text-white md:h-16 md:w-16">{index + 1}</span>
              <div className={`${card.light} grid gap-6 lg:grid-cols-[1fr_1fr]`}>
                <div>
                  <IconBadge name={stepIcons[index]} />
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink-900">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-ink-500">{step.text}</p>
                </div>
                <ul className="space-y-3 self-center text-[15px] leading-6 text-ink-700">
                  {step.points.map((point, pointIndex) => <CheckItem key={pointIndex}>{point}</CheckItem>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-brand-900">
        <div className="mx-auto grid max-w-site gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:px-8 lg:py-28">
          <SectionHeading invert overline={copy.both.overline} title={copy.both.title} text={copy.both.text} />
          <div className="grid gap-4 sm:grid-cols-2">
            {sides.map((item, index) => (
              <div key={index} data-reveal style={revealDelay(index)} className={card.dark}>
                <IconBadge name={item.icon} tone="dark" />
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-6 text-white/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading overline={copy.access.overline} title={copy.access.title} text={copy.access.text} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.access.roles.map((role, index) => (
            <div key={index} data-reveal style={revealDelay(index)} className={card.light}>
              <IconBadge name={roleIcons[index]} />
              <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">{role.title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-ink-500">{role.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="mx-auto grid max-w-site gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8 lg:py-28">
          <SectionHeading overline={copy.faq.overline} title={copy.faq.title} />
          <div className="divide-y divide-line border-y border-line">
            {copy.faq.items.map((item, index) => (
              <details key={index} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-subtle text-xl leading-none text-brand-600 transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-[15px] leading-7 text-ink-500">{item.a}</p>
              </details>
            ))}
            <p className="py-5 text-[15px] text-ink-500">
              {copy.faq.still} <Link href="/contact" className={button.link}>{copy.faq.contactLink}</Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
