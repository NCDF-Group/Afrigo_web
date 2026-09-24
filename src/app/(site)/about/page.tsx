import type { Metadata } from 'next'
import Link from 'next/link'
import { IconBadge, type IconName } from '@/components/ui/Icon'
import { button, card } from '@/components/ui/styles'
import { CtaBand, PageHero, SectionHeading, revealDelay } from '@/components/site/Section'
import { BRAND } from '@/lib/brand'
import { getDictionary } from '@/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary()
  return t.meta.pages.about
}

const pillarIcons: IconName[] = ['search', 'clipboard', 'briefcase']
const principleIcons: IconName[] = ['book', 'lock', 'signal', 'globe']

export default async function AboutPage() {
  const { t } = await getDictionary()
  const copy = t.about

  return (
    <>
      <PageHero overline={copy.hero.overline} title={copy.hero.title} text={copy.hero.text} image="/images/hero-about.webp" position="75% center" />

      <section className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading overline={copy.what.overline} title={copy.what.title} text={copy.what.text} />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {copy.what.pillars.map((item, index) => (
            <div key={index} data-reveal style={revealDelay(index)} className={card.light}>
              <IconBadge name={pillarIcons[index]} />
              <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-6 text-ink-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-subtle">
        <div className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading overline={copy.principles.overline} title={copy.principles.title} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.principles.items.map((item, index) => (
              <div key={index} data-reveal style={revealDelay(index)} className={`${card.light} p-6`}>
                <IconBadge name={principleIcons[index]} />
                <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-6 text-ink-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ncdf-group" className="scroll-mt-20 bg-brand-900">
        <div className="mx-auto grid max-w-site gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8 lg:py-28">
          <div>
            <SectionHeading invert overline={BRAND.owner} title={copy.ncdf.title} text={copy.ncdf.text} />
            <Link href="/contact?topic=partnership" className={`${button.accent} mt-8`}>{copy.ncdf.partner}</Link>
          </div>
          <ol className="space-y-4">
            {copy.ncdf.roadmap.map((step, index) => (
              <li key={index} data-reveal style={revealDelay(index)} className={`${card.dark} flex gap-5`}>
                <span className="font-display text-2xl font-bold text-accent-300">0{index + 1}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-1 text-[15px] leading-6 text-white/70">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title={copy.cta.title} text={copy.cta.text} />
    </>
  )
}
