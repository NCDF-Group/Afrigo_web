import type { Metadata } from 'next'
import Link from 'next/link'
import { IconBadge, type IconName } from '@/components/ui/Icon'
import { button } from '@/components/ui/styles'
import { PageHero, revealDelay } from '@/components/site/Section'
import ContactForm from '@/components/site/ContactForm'
import { isContactTopic } from '@/lib/contactTopics'

export const metadata: Metadata = {
  title: 'Contact us',
  description: 'Talk to the Afrigo team about registering your business, market access, partnerships or support.'
}

const reasons: { title: string; text: string; icon: IconName }[] = [
  { title: 'Registering your business', text: 'Questions about joining the pilot, verification or team access.', icon: 'building' },
  { title: 'Market access', text: 'Unsure how ETLS or AfCFTA applies to your product and route.', icon: 'globe' },
  { title: 'Service partners', text: 'Logistics, inspection and trade-readiness providers who want to join.', icon: 'truck' },
  { title: 'Partnerships', text: 'Associations, cooperatives and organisations supporting African trade.', icon: 'users' }
]

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams

  return (
    <>
      <PageHero
        overline="Contact us"
        title="Talk to the Afrigo team"
        text="Tell us about your business and what you trade. We'll point you to the right next step."
        image="/images/hero-contact.webp"
        position="65% center"
      />

      <section className="mx-auto grid max-w-site gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8 lg:py-24">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900">How we can help</h2>
          <ul className="mt-6 space-y-4">
            {reasons.map((item, index) => (
              <li key={item.title} data-reveal style={revealDelay(index, 70)} className="flex gap-4">
                <IconBadge name={item.icon} />
                <div>
                  <h3 className="font-display text-base font-semibold text-ink-900">{item.title}</h3>
                  <p className="mt-1 text-[15px] leading-6 text-ink-500">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-card border border-line bg-subtle p-6">
            <h3 className="font-display text-base font-semibold text-ink-900">Already registered?</h3>
            <p className="mt-1 text-[15px] leading-6 text-ink-500">Sign in to manage your enquiries and trade cases.</p>
            <Link href="/sign-in" className={`${button.secondary} mt-4`}>Sign in</Link>
          </div>
        </div>
        <ContactForm initialTopic={isContactTopic(topic) ? topic : 'general'} />
      </section>
    </>
  )
}
