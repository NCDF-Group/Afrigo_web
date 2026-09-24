import Link from 'next/link'
import { BRAND } from '@/lib/brand'

// Official Afrigo artwork, traced to SVG from the supplied logo files (public/brand).
// lockup = mark + wordmark (headers), full = with tagline (footer), mark = the "A" symbol alone.
const ART = {
  lockup: { src: 'afrigo-lockup', width: 4099, height: 831 },
  full: { src: 'afrigo-full', width: 4099, height: 859 },
  mark: { src: 'afrigo-mark', width: 3782, height: 3115 }
} as const

type Props = {
  variant?: keyof typeof ART
  tone?: 'dark' | 'light'
  href?: string
  className?: string
}

export default function Logo({ variant = 'lockup', tone = 'dark', href = '/', className = 'h-9' }: Props) {
  const art = ART[variant]
  const file = variant === 'mark' || tone === 'dark' ? art.src : `${art.src}-light`
  return (
    <Link href={href} className="inline-flex shrink-0 items-center rounded-input" aria-label={`${BRAND.name} home`}>
      <img src={`/brand/${file}.svg`} alt={BRAND.name} width={art.width} height={art.height} className={`w-auto ${className}`} />
    </Link>
  )
}
