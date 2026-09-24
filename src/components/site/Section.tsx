import Image from 'next/image'
import Link from 'next/link'
import { button } from '@/components/ui/styles'
import { getDictionary } from '@/i18n/server'

export const revealDelay = (index: number, step = 90) => ({ '--reveal-delay': `${index * step}ms` }) as React.CSSProperties

export function SectionHeading({ overline, title, text, invert = false, center = false }: { overline: string; title: string; text?: string; invert?: boolean; center?: boolean }) {
  return (
    <div data-reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className={`text-xs font-bold uppercase tracking-[.08em] ${invert ? 'text-accent-300' : 'text-accent-700'}`}>{overline}</p>
      <h2 className={`mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight tracking-[-.02em] ${invert ? 'text-white' : 'text-ink-900'}`}>{title}</h2>
      {text && <p className={`mt-4 text-lg leading-8 ${invert ? 'text-white/75' : 'text-ink-500'}`}>{text}</p>}
    </div>
  )
}

// Hero photo via next/image (responsive srcset, lazy decode, AVIF/WebP) under a left-to-right scrim for text contrast.
// Pages without a photo yet fall back to the brand gradient.
export function HeroBackdrop({ image, position = 'center', priority = true }: { image?: string; position?: string; priority?: boolean }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_30%,rgba(124,176,65,.28),transparent_40%),linear-gradient(135deg,#024437,#011A15)]">
      {image && <Image src={image} alt="" fill priority={priority} sizes="100vw" quality={70} className="object-cover" style={{ objectPosition: position }} />}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,26,21,.94)_0%,rgba(1,26,21,.8)_42%,rgba(1,26,21,.25)_80%)] max-lg:bg-[linear-gradient(180deg,rgba(1,26,21,.55)_0%,rgba(1,26,21,.88)_55%,rgba(1,26,21,.95)_100%)]" />
    </div>
  )
}

export function PageHero({ overline, title, text, image, position, children }: { overline: string; title: string; text: string; image?: string; position?: string; children?: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-900">
      <HeroBackdrop image={image} position={position} />
      <div className="mx-auto max-w-site px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <p className="text-xs font-bold uppercase tracking-[.08em] text-accent-300">{overline}</p>
        <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-extrabold leading-[1.08] tracking-[-.02em] text-white">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{text}</p>
        {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
      </div>
    </section>
  )
}

export async function CtaBand({ title, text }: { title?: string; text?: string }) {
  const { t } = await getDictionary()
  return (
    <section className="bg-brand-600">
      <div data-reveal className="mx-auto flex max-w-site flex-col gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-xl">
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-tight text-white">{title ?? t.cta.title}</h2>
          <p className="mt-3 text-lg text-white/80">{text ?? t.cta.text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/register" className={`${button.accent} min-h-12 px-7 text-[15px]`}>{t.common.registerYourBusiness}</Link>
          <Link href="/contact" className={`${button.ghostLight} min-h-12 px-7 text-[15px]`}>{t.common.contactUs}</Link>
        </div>
      </div>
    </section>
  )
}

export function CheckItem({ children, invert = false, className = '', style, reveal = false }: { children: React.ReactNode; invert?: boolean; className?: string; style?: React.CSSProperties; reveal?: boolean }) {
  return (
    <li data-reveal={reveal || undefined} style={style} className={`flex items-start gap-3 ${className}`}>
      <svg viewBox="0 0 20 20" className={`mt-1 h-4 w-4 shrink-0 ${invert ? 'text-accent-300' : 'text-brand-600'}`} fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
      </svg>
      <span>{children}</span>
    </li>
  )
}
