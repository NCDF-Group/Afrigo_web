import type { Metadata } from 'next'
import Link from 'next/link'
import { IconBadge, type IconName } from '@/components/ui/Icon'
import { button } from '@/components/ui/styles'
import { PageHero, revealDelay } from '@/components/site/Section'
import ContactForm from '@/components/site/ContactForm'
import { isContactTopic } from '@/lib/contactTopics'
import { getDictionary } from '@/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary()
  return t.meta.pages.contact
}

const reasonIcons: IconName[] = ['building', 'globe', 'truck', 'users']

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const [{ topic }, { t }] = await Promise.all([searchParams, getDictionary()])
  const copy = t.contact

  return (
    <>
      <PageHero overline={copy.hero.overline} title={copy.hero.title} text={copy.hero.text} image="/images/hero-contact.webp" position="65% center" />

      <section className="mx-auto grid max-w-site gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8 lg:py-24">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900">{copy.help.title}</h2>
          <ul className="mt-6 space-y-4">
            {copy.help.reasons.map((item, index) => (
              <li key={index} data-reveal style={revealDelay(index, 70)} className="flex gap-4">
                <IconBadge name={reasonIcons[index]} />
                <div>
                  <h3 className="font-display text-base font-semibold text-ink-900">{item.title}</h3>
                  <p className="mt-1 text-[15px] leading-6 text-ink-500">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-card border border-line bg-subtle p-6">
            <h3 className="font-display text-base font-semibold text-ink-900">{copy.registered.title}</h3>
            <p className="mt-1 text-[15px] leading-6 text-ink-500">{copy.registered.text}</p>
            <Link href="/sign-in" className={`${button.secondary} mt-4`}>{copy.registered.signIn}</Link>
          </div>
        </div>
        <ContactForm initialTopic={isContactTopic(topic) ? topic : 'general'} />
      </section>
    </>
  )
}
