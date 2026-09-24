import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage from '@/components/site/LegalPage'
import { getDictionary } from '@/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary()
  return t.meta.pages.privacy
}

export default async function PrivacyPage() {
  const { t } = await getDictionary()
  const copy = t.legal.privacy
  return (
    <LegalPage
      title={copy.title}
      intro={copy.intro}
      updated={copy.updated}
      sections={[
        ...copy.sections.map(section => ({ id: section.id, title: section.title, body: section.paragraphs.map(text => <p key={text}>{text}</p>) })),
        {
          id: 'rights',
          title: copy.rights.title,
          body: (
            <p>
              {copy.rights.before} <Link href="/contact?topic=support" className="font-semibold text-brand-600 hover:underline">{copy.rights.link}</Link> {copy.rights.after}
            </p>
          )
        }
      ]}
    />
  )
}
