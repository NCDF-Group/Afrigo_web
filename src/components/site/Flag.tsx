import { COUNTRY_META } from './africaCountryMeta'

// Country flag from /public/flags (3:2 SVGs, country-flag-icons, MIT). Decorative: the country name is always shown beside it.
export default function Flag({ id, className = 'h-4 w-6' }: { id: string; className?: string }) {
  const meta = COUNTRY_META[id]
  if (!meta) return null
  return (
    <img
      src={`/flags/${meta.iso2}.svg`}
      alt=""
      width={24}
      height={16}
      loading="lazy"
      decoding="async"
      className={`shrink-0 rounded-[3px] object-cover shadow-[0_0_0_1px_rgba(0,0,0,.12)] ${className}`}
    />
  )
}
