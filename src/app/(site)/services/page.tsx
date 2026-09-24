import type { Metadata } from 'next'
import Link from 'next/link'
import { IconBadge, type IconName } from '@/components/ui/Icon'
import { button, card } from '@/components/ui/styles'
import { CheckItem, CtaBand, PageHero, SectionHeading, revealDelay } from '@/components/site/Section'

export const metadata: Metadata = {
  title: 'Services & pricing',
  description: 'Logistics, inspection and trade-readiness support from vetted partners, requested directly from your trade case.'
}

const services: { title: string; text: string; icon: IconName; includes: string[] }[] = [
  {
    title: 'Logistics',
    icon: 'truck',
    text: 'Move goods across borders with vetted logistics partners.',
    includes: ['Freight and haulage quotes', 'Cross-border movement support', 'Pickup and delivery milestones in your trade case']
  },
  {
    title: 'Inspection',
    icon: 'clipboard',
    text: 'Independent checks that give both sides confidence.',
    includes: ['Quality and grade inspection', 'Quantity and packaging checks', 'Pre-shipment inspection reports attached to the case']
  },
  {
    title: 'Trade readiness',
    icon: 'file',
    text: 'Get your business and documents ready for a new market.',
    includes: ['Document preparation support', 'Origin evidence for ETLS and AfCFTA', 'Market requirement checks before you ship']
  }
]

const requestFlow = [
  { title: 'Request', text: 'Ask for a service from inside a trade case.' },
  { title: 'Quote', text: 'An assigned partner reviews the case and sends a quote.' },
  { title: 'Accept', text: 'Nothing starts until you accept the quote.' },
  { title: 'Track', text: 'Follow progress and reports alongside your other tasks.' }
]

const plans: { title: string; text: string; points: string[]; cta: { label: string; href: string }; featured?: boolean }[] = [
  {
    title: 'Pilot access',
    text: 'For businesses in our pilot markets joining during the first release.',
    points: ['Business profile and team access', 'Publish products and buyer requests', 'Enquiries, quotations and trade cases', 'ETLS and AfCFTA guidance'],
    cta: { label: 'Register your business', href: '/register' },
    featured: true
  },
  {
    title: 'Partner services',
    text: 'Logistics, inspection and readiness support, priced for each request.',
    points: ['Quoted per request by the assigned partner', 'You accept before any work begins', 'Reports and milestones in the trade case'],
    cta: { label: 'See how services work', href: '#how-services-work' }
  },
  {
    title: 'Associations & groups',
    text: 'For cooperatives, associations and trade bodies onboarding many members.',
    points: ['Onboarding support for member businesses', 'Guidance tailored to your sector', 'A dedicated contact at AfriGoOS'],
    cta: { label: 'Talk to us', href: '/contact?topic=partnership' }
  }
]

export default function ServicesPage() {
  return (
    <>
      <PageHero
        overline="Services & pricing"
        title="Support for every stage of the trade"
        text="Request logistics, inspection and trade-readiness help from vetted partners — right from the trade case you're already working in."
        image="/images/hero-services.webp"
        position="70% center"
      >
        <Link href="/register" className={`${button.accent} min-h-12 px-7 text-[15px]`}>Register your business</Link>
        <Link href="/contact?topic=partner" className={`${button.ghostLight} min-h-12 px-7 text-[15px]`}>Become a service partner</Link>
      </PageHero>

      <section className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading overline="Services" title="What you can request" />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {services.map((item, index) => (
            <article key={item.title} data-reveal style={revealDelay(index)} className={card.light}>
              <IconBadge name={item.icon} />
              <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-ink-500">{item.text}</p>
              <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-[15px] leading-6 text-ink-700">
                {item.includes.map(point => <CheckItem key={point}>{point}</CheckItem>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="how-services-work" className="scroll-mt-20 bg-subtle">
        <div className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading overline="How it works" title="Requesting a service" text="Partners only see the trade cases and requests they are assigned to." />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {requestFlow.map((step, index) => (
              <li key={step.title} data-reveal style={revealDelay(index)} className={`${card.light} p-6`}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-display font-bold text-white">{index + 1}</span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-6 text-ink-500">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading center overline="Pricing" title="Simple ways to get started" text="Approved packages for the first release are shared with pilot participants. Partner services are always quoted before you commit." />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <article
              key={plan.title}
              data-reveal
              style={revealDelay(index)}
              className={`${card.light} flex flex-col ${plan.featured ? 'outline outline-2 -outline-offset-1 outline-brand-600' : ''}`}
            >
              {plan.featured && <span className="mb-4 self-start rounded-full bg-gold-50 px-3 py-1 text-xs font-bold text-gold-700">Now open</span>}
              <h3 className="font-display text-2xl font-bold text-ink-900">{plan.title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-ink-500">{plan.text}</p>
              <ul className="mt-6 space-y-3 text-[15px] leading-6 text-ink-700">
                {plan.points.map(point => <CheckItem key={point}>{point}</CheckItem>)}
              </ul>
              <div className="mt-auto pt-8">
                <Link href={plan.cta.href} className={`${plan.featured ? button.primary : button.secondary} w-full`}>{plan.cta.label}</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-900">
        <div className="mx-auto grid max-w-site gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
          <SectionHeading invert overline="Service partners" title="Offer your services on AfriGoOS" text="Logistics companies, inspection agencies and trade advisers can join as service partners and receive requests from active trade cases." />
          <div data-reveal className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link href="/contact?topic=partner" className={`${button.accent} min-h-12 px-7 text-[15px]`}>Apply as a partner</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
