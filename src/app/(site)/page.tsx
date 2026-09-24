import Link from 'next/link'
import Icon, { IconBadge, type IconName } from '@/components/ui/Icon'
import { button, card } from '@/components/ui/styles'
import { CheckItem, CtaBand, HeroBackdrop, SectionHeading, revealDelay } from '@/components/site/Section'
import Typewriter from '@/components/site/Typewriter'
import AfricaMarketsMap from '@/components/site/AfricaMarketsMap'

const heroPhrases = ['find new markets.', 'prepare for trade.', 'manage execution.', 'grow across Africa.'] as const

const steps: { title: string; text: string; icon: IconName }[] = [
  { title: 'Register', text: 'Create your business profile, upload company documents and invite colleagues.', icon: 'building' },
  { title: 'Publish or search', text: 'List products and buyer requests, or search supply and demand across supported markets.', icon: 'search' },
  { title: 'Enquire', text: 'Contact businesses directly, ask questions and exchange quotations.', icon: 'message' },
  { title: 'Open a trade case', text: 'Move an agreed enquiry into one workspace for documents, tasks and partners.', icon: 'briefcase' },
  { title: 'Track progress', text: 'Follow shipment milestones and outstanding requirements until delivery.', icon: 'activity' }
]

const audiences = ['Exporters', 'Importers', 'Manufacturers', 'Cooperatives', 'Aggregators', 'Trade-service providers']

const opportunityTypes: { title: string; text: string; href: string; icon: IconName }[] = [
  { title: 'Products', text: 'Goods offered by verified African businesses, with specifications, quantities, locations and images.', href: '/opportunities?type=products', icon: 'package' },
  { title: 'Buyer requests', text: 'Purchasing requirements posted by businesses looking for reliable supply.', href: '/opportunities?type=requests', icon: 'target' },
  { title: 'Supply opportunities', text: 'Aggregated and seasonal supply from cooperatives, aggregators and manufacturers.', href: '/opportunities?type=supply', icon: 'layers' }
]

const workspace = [
  'Quotations, documents and tasks in one trade case',
  'Shipment milestones and outstanding requirements',
  'Logistics, inspection and trade-readiness requests',
  'Access for colleagues and assigned service partners only'
]

const services: { title: string; text: string; icon: IconName }[] = [
  { title: 'Logistics', text: 'Request freight, haulage and cross-border movement support from vetted partners.', icon: 'truck' },
  { title: 'Inspection', text: 'Arrange quality, quantity and pre-shipment inspection for your goods.', icon: 'clipboard' },
  { title: 'Trade readiness', text: 'Get help preparing documents, origin evidence and market requirements.', icon: 'file' }
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-brand-900">
        <HeroBackdrop image="/images/hero-home.webp" position="68% center" />
        <div className="mx-auto flex min-h-[calc(100svh-64px)] max-w-site flex-col justify-center px-4 py-20 sm:px-6 lg:min-h-[640px] lg:px-8 lg:py-28">
          <p className="text-xs font-bold uppercase tracking-[.08em] text-gold-300">Africa-wide trade & market access</p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-extrabold leading-[1.08] tracking-[-.02em] text-white">
            <span className="sr-only">The easier way to find new markets, prepare for trade and manage execution across Africa.</span>
            <span aria-hidden="true" className="block text-balance">The easier way to</span>
            <span className="block min-h-[2.16em] text-gold-400 sm:min-h-[1.08em]">
              <Typewriter phrases={heroPhrases} />
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
            Afrigo helps African businesses find markets, connect with trading partners and manage cross-border trade — from first enquiry to a tracked trade case.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/register" className={`${button.accent} min-h-12 px-7 text-[15px]`}>Register your business</Link>
            <Link href="/opportunities" className={`${button.ghostLight} min-h-12 px-7 text-[15px]`}>Explore opportunities</Link>
          </div>
          <p className="mt-10 max-w-xl text-sm text-white/60">Launching with selected West African markets, with ETLS and AfCFTA guidance built in.</p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-site flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:gap-8 lg:px-8">
          <p className="shrink-0 text-sm font-semibold text-ink-500">Built for</p>
          <ul className="flex flex-wrap gap-2">
            {audiences.map((item, index) => (
              <li key={item} data-reveal style={revealDelay(index, 60)} className="rounded-full border border-line bg-canvas px-4 py-1.5 text-sm font-semibold text-ink-700">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading overline="How it works" title="One connected trade journey" text="Everything from your first listing to delivery happens on one platform, with each step building on the last." />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <li key={step.title} data-reveal style={revealDelay(index)} className={`${card.light} p-6`}>
              <div className="flex items-center justify-between">
                <IconBadge name={step.icon} />
                <span className="font-display text-sm font-bold text-ink-400">0{index + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-ink-500">{step.text}</p>
            </li>
          ))}
        </ol>
        <Link href="/how-it-works" className={`${button.link} mt-8 inline-block`}>See how it works in detail</Link>
      </section>

      {/* Opportunities */}
      <section className="bg-subtle">
        <div className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading overline="Trade opportunities" title="Search supply and demand across Africa" />
            <Link href="/opportunities" className={button.primary}>Explore opportunities</Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {opportunityTypes.map((item, index) => (
              <Link key={item.title} href={item.href} data-reveal style={revealDelay(index)} className={`${card.light} block`}>
                <IconBadge name={item.icon} />
                <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-6 text-ink-500">{item.text}</p>
                <span className="mt-6 inline-block text-sm font-bold text-brand-600">Browse {item.title.toLowerCase()}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Market access */}
      <section className="bg-brand-900">
        <div className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <AfricaMarketsMap tone="dark">
            <SectionHeading invert overline="Market access" title="Know the requirements before you ship" text="Launching in selected West African markets and built for the whole continent. Explore where ETLS and AfCFTA may apply, then check the detailed requirements." />
          </AfricaMarketsMap>
          <p data-reveal className="mt-10 flex gap-3 rounded-card border border-gold-400/30 bg-gold-400/10 p-4 text-sm leading-6 text-gold-100">
            <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" />
            Guidance only. Afrigo does not issue official certificates or guarantee duty-free access — final decisions rest with the relevant authorities.
          </p>
        </div>
      </section>

      {/* Trade workspace */}
      <section className="mx-auto grid max-w-site gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
        <SectionHeading overline="Trade workspace" title="Keep execution in one place" text="When an enquiry becomes a deal, open a trade case. Your team, your trading partner and any assigned service partner work from the same record." />
        <ul className="grid gap-3">
          {workspace.map((item, index) => (
            <CheckItem key={item} reveal style={revealDelay(index)} className={`${card.light} p-5 text-[15px] font-medium leading-6 text-ink-700`}>{item}</CheckItem>
          ))}
        </ul>
      </section>

      {/* Services */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading overline="Services" title="Support from trusted partners" text="Request help directly from a trade case and track it alongside your other tasks." />
            <Link href="/services" className={button.secondary}>View services & pricing</Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {services.map((item, index) => (
              <div key={item.title} data-reveal style={revealDelay(index)} className={card.light}>
                <IconBadge name={item.icon} />
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
