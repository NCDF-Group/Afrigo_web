import type { Metadata } from 'next'
import Link from 'next/link'
import { IconBadge, type IconName } from '@/components/ui/Icon'
import { button, card } from '@/components/ui/styles'
import { CheckItem, CtaBand, PageHero, SectionHeading, revealDelay } from '@/components/site/Section'

export const metadata: Metadata = {
  title: 'How it works',
  description: 'Register, publish or search, enquire, open a trade case and track progress — the Afrigo trade journey.'
}

const steps: { title: string; text: string; icon: IconName; points: string[] }[] = [
  {
    title: 'Register your business',
    icon: 'building',
    text: 'Create an account with your work email or Google, then set up your business profile.',
    points: ['Business details, sector and the markets you trade in', 'Company documents for verification', 'Invite colleagues and choose who administers the account']
  },
  {
    title: 'Publish or search',
    icon: 'search',
    text: 'Tell the market what you sell or what you need — or find it yourself.',
    points: ['List products with specifications, quantities, locations and images', 'Post buyer requests with your purchasing requirements', 'Search products, buyer requests and supply opportunities']
  },
  {
    title: 'Enquire',
    icon: 'message',
    text: 'Contact businesses directly and work out the details.',
    points: ['Send and answer enquiries from one inbox', 'Request, send and compare quotations', 'Keep every message attached to its enquiry']
  },
  {
    title: 'Open a trade case',
    icon: 'briefcase',
    text: 'When both sides agree, turn the enquiry into a trade case — one workspace for the whole deal.',
    points: ['Accepted quotation, documents and tasks in one place', 'Add colleagues and assigned service partners', 'Request logistics, inspection and trade-readiness support']
  },
  {
    title: 'Track progress',
    icon: 'activity',
    text: 'See exactly where the trade stands and what is still outstanding.',
    points: ['Shipment milestones from pickup to delivery', 'Outstanding requirements and who owns them', 'Notifications and a dashboard of active trade cases']
  }
]

const roles: { title: string; text: string; icon: IconName }[] = [
  { title: 'Business administrator', text: 'Manages the organisation, its colleagues and its business records.', icon: 'building' },
  { title: 'Business team member', text: 'Works on the enquiries, documents and trade cases they are authorised for.', icon: 'users' },
  { title: 'Service partner', text: 'Views and updates only the service requests assigned to them.', icon: 'truck' },
  { title: 'Afrigo administrator', text: 'Reviews businesses and content, manages guidance and oversees operations.', icon: 'shield' }
]

const faqs = [
  { q: 'Who can register?', a: 'Exporters, importers, manufacturers, cooperatives, aggregators and trade-service providers operating in supported markets. Businesses are reviewed before their listings go live.' },
  { q: 'Can my business both buy and sell?', a: 'Yes. A business can publish products and post buyer requests from the same account — there is no need to pick one role.' },
  { q: 'Which countries are supported?', a: 'Afrigo launches with selected West African markets and is designed to add wider African coverage. See Market access for the current list.' },
  { q: 'Does Afrigo issue certificates of origin?', a: 'No. Afrigo provides traceable guidance and helps you prepare evidence, but official certificates are issued by the relevant authorities and duty-free access is never guaranteed.' },
  { q: 'Who can see my records?', a: 'Private records are only visible to people you explicitly give access to: your colleagues, your trading partner on a trade case, and service partners assigned to a request.' },
  { q: 'What does it cost?', a: 'See Services & pricing for current packages and how partner services are quoted.' }
]

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        overline="How it works"
        title="From registration to a tracked trade case"
        text="Afrigo brings every stage of cross-border trade into one connected journey, so nothing gets lost between the first enquiry and delivery."
        image="/images/hero-how-it-works.webp"
        position="70% center"
      >
        <Link href="/register" className={`${button.accent} min-h-12 px-7 text-[15px]`}>Register your business</Link>
        <Link href="/opportunities" className={`${button.ghostLight} min-h-12 px-7 text-[15px]`}>Explore opportunities</Link>
      </PageHero>

      <section className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading overline="The journey" title="Five steps, one platform" />
        <ol className="relative mt-14 space-y-6 before:absolute before:bottom-6 before:left-[27px] before:top-6 before:w-px before:bg-line md:before:left-[31px]">
          {steps.map((step, index) => (
            <li key={step.title} data-reveal style={revealDelay(index, 70)} className="relative grid gap-5 md:grid-cols-[64px_1fr]">
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-canvas bg-brand-600 font-display text-lg font-bold text-white md:h-16 md:w-16">{index + 1}</span>
              <div className={`${card.light} grid gap-6 lg:grid-cols-[1fr_1fr]`}>
                <div>
                  <IconBadge name={step.icon} />
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink-900">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-ink-500">{step.text}</p>
                </div>
                <ul className="space-y-3 self-center text-[15px] leading-6 text-ink-700">
                  {step.points.map(point => <CheckItem key={point}>{point}</CheckItem>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-brand-900">
        <div className="mx-auto grid max-w-site gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:px-8 lg:py-28">
          <SectionHeading invert overline="Buy, sell or both" title="One business, every side of the trade" text="Many African businesses buy inputs and sell finished goods. On Afrigo the same account can publish products, post buyer requests and run trade cases on either side." />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: 'Selling', text: 'Publish products and supply, answer buyer requests and send quotations.', icon: 'package' as const },
              { title: 'Buying', text: 'Post purchasing requirements, compare quotations and choose suppliers.', icon: 'target' as const }
            ].map((item, index) => (
              <div key={item.title} data-reveal style={revealDelay(index)} className={card.dark}>
                <IconBadge name={item.icon} tone="dark" />
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-6 text-white/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading overline="Access" title="The right access for every user" text="Private records require explicit access. Each person only sees what their role and assignments allow." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role, index) => (
            <div key={role.title} data-reveal style={revealDelay(index)} className={card.light}>
              <IconBadge name={role.icon} />
              <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">{role.title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-ink-500">{role.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="mx-auto grid max-w-site gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8 lg:py-28">
          <SectionHeading overline="Questions" title="Frequently asked" />
          <div className="divide-y divide-line border-y border-line">
            {faqs.map(item => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-subtle text-xl leading-none text-brand-600 transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-[15px] leading-7 text-ink-500">{item.a}</p>
              </details>
            ))}
            <p className="py-5 text-[15px] text-ink-500">
              Still have a question? <Link href="/contact" className={button.link}>Contact our team</Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
