import Link from 'next/link'
import { BRAND } from '@/lib/brand'

// Placeholder mark until the final Afrigo logo is supplied — swap the <svg> for the real asset.
export default function Logo({ tone = 'dark', href = '/', compact = false }: { tone?: 'dark' | 'light'; href?: string; compact?: boolean }) {
  const text = tone === 'light' ? 'text-white' : 'text-brand-900'
  return (
    <Link href={href} className={`inline-flex items-center gap-2.5 rounded-input ${text}`} aria-label={`${BRAND.name} home`}>
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true">
        <rect width="40" height="40" rx="11" fill={tone === 'light' ? '#FFFFFF' : '#0E6A3F'} />
        <path fillRule="evenodd" d="M11 29 19.2 11h1.6L29 29h-4.3l-1.7-4h-6l-1.7 4H11Zm7.4-7.4h3.2L20 17.5l-1.6 4.1Z" fill={tone === 'light' ? '#0E6A3F' : '#FFFFFF'} />
        <circle cx="30" cy="11" r="3" fill="#C9971A" />
      </svg>
      {!compact && (
        <span className="font-display text-xl font-extrabold tracking-tight">
          Afri<span className={tone === 'light' ? 'text-gold-400' : 'text-gold-600'}>go</span>
        </span>
      )}
    </Link>
  )
}
