import type { Metadata } from 'next'
import Link from 'next/link'
import { IconBadge, type IconName } from '@/components/ui/Icon'
import { button, card } from '@/components/ui/styles'
import { CtaBand, PageHero, SectionHeading, revealDelay } from '@/components/site/Section'
import { BRAND } from '@/lib/brand'

export const metadata: Metadata = {
  title: 'About',
  description: 'Afrigo is an Africa-wide trade and market access platform developed by NCDF Group.'
}

const pillars: { title: string; text: string; icon: IconName }[] = [
  { title: 'Find opportunities', text: 'Help businesses discover markets, buyers and supply they would not otherwise reach.', icon: 'search' },
  { title: 'Prepare for trade', text: 'Make requirements, documents and evidence clear before goods move.', icon: 'clipboard' },
  { title: 'Manage execution', text: 'Keep quotations, tasks, partners and shipments in one shared trade case.', icon: 'briefcase' }
]

const principles: { title: string; text: string; icon: IconName }[] = [
  { title: 'Traceable guidance', text: 'Every requirement shows its official reference and last-review date. We never promise what only authorities can grant.', icon: 'book' },
  { title: 'Private by default', text: 'Business records are only visible to the people and partners explicitly given access.', icon: 'lock' },
  { title: 'Built for low data', text: 'Mobile-first pages that load quickly on the connections our users actually have.', icon: 'signal' },
  { title: 'Africa-wide by design', text: 'Countries, currencies, products and requirements are configurable, so the platform grows market by market.', icon: 'globe' }
]

const roadmap = [
  { title: 'Confirm & design', text: 'Agree pilot markets, user journeys and screen designs.' },
  { title: 'Build', text: 'Deliver the website, business profiles, listings, enquiries, trade workspace and administration.' },
  { title: 'Pilot', text: 'Test real enquiries and supervised transactions, and resolve usability and operating issues.' },
  { title: 'Launch & expand', text: 'Release approved coverage, then add markets and integrations as demand grows.' }
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        overline="About Afrigo"
        title="Making trade preparation and execution easy"
        text="Afrigo is an Africa-wide trade and market access platform that helps businesses find markets, connect with trading partners and manage cross-border trade."
        image="/images/hero-about.webp"
        position="75% center"
      />

      <section className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading overline="What we do" title="One platform for the whole trade journey" text="Cross-border trade in Africa often depends on scattered contacts, unclear requirements and paperwork spread across chats and inboxes. Afrigo brings it together." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {pillars.map((item, index) => (
            <div key={item.title} data-reveal style={revealDelay(index)} className={card.light}>
              <IconBadge name={item.icon} />
              <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-6 text-ink-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-subtle">
        <div className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading overline="Principles" title="How we build" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((item, index) => (
              <div key={item.title} data-reveal style={revealDelay(index)} className={`${card.light} p-6`}>
                <IconBadge name={item.icon} />
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
            <SectionHeading invert overline={BRAND.owner} title="Developed by NCDF Group" text="Afrigo is developed and operated by NCDF Group. The platform starts with selected West African markets and is designed for wider African coverage as pilot partners, markets and integrations are added." />
            <Link href="/contact?topic=partnership" className={`${button.accent} mt-8`}>Partner with us</Link>
          </div>
          <ol className="space-y-4">
            {roadmap.map((step, index) => (
              <li key={step.title} data-reveal style={revealDelay(index)} className={`${card.dark} flex gap-5`}>
                <span className="font-display text-2xl font-bold text-gold-300">0{index + 1}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-1 text-[15px] leading-6 text-white/70">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="Join the first businesses on Afrigo" text="Register for the pilot, or talk to us about bringing your members or services onto the platform." />
    </>
  )
}
