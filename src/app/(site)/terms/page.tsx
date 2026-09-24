import type { Metadata } from 'next'
import LegalPage from '@/components/site/LegalPage'
import { getDictionary } from '@/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary()
  return t.meta.pages.terms
}

export default async function TermsPage() {
  const { t } = await getDictionary()
  const copy = t.legal.terms
  return (
    <LegalPage
      title={copy.title}
      intro={copy.intro}
      updated={copy.updated}
      sections={copy.sections.map(section => ({ id: section.id, title: section.title, body: section.paragraphs.map(text => <p key={text}>{text}</p>) }))}
    />
  )
}
