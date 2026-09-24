import Link from 'next/link'
import { button } from '@/components/ui/styles'

export type LegalSection = { id: string; title: string; body: React.ReactNode }

export default function LegalPage({ title, intro, updated, sections }: { title: string; intro: string; updated: string; sections: LegalSection[] }) {
  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-site px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[.08em] text-gold-700">Legal</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-.02em] text-ink-900">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-500">{intro}</p>
          <p className="mt-4 text-sm text-ink-500">Last updated {updated}</p>
        </div>
      </section>
      <div className="mx-auto grid max-w-site gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8 lg:py-20">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="sticky top-28 space-y-2 border-l border-line text-sm">
            {sections.map(section => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-ink-500 transition-colors hover:border-gold-500 hover:text-ink-900">{section.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        <article className="max-w-3xl">
          <div className="mb-10 rounded-card border border-info/20 bg-info-soft p-4 text-sm leading-6 text-info">
            This notice is being finalised with legal counsel ahead of public launch and may change.
          </div>
          {sections.map(section => (
            <section key={section.id} id={section.id} className="scroll-mt-24 border-b border-line py-8 first:pt-0 last:border-0">
              <h2 className="font-display text-xl font-semibold text-ink-900">{section.title}</h2>
              <div className="mt-3 space-y-4 text-[15px] leading-7 text-ink-700">{section.body}</div>
            </section>
          ))}
          <Link href="/contact?topic=support" className={`${button.secondary} mt-6`}>Questions? Contact us</Link>
        </article>
      </div>
    </>
  )
}
