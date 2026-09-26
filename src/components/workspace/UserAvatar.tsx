'use client'
import { useState } from 'react'

const SIZES = { sm: 'h-9 w-9', md: 'h-10 w-10', lg: 'h-20 w-20' } as const

export default function UserAvatar({ src, name, size = 'sm', className = '' }: { src?: string | null; name: string; size?: keyof typeof SIZES; className?: string }) {
  const [failed, setFailed] = useState(false)
  const box = `${SIZES[size]} shrink-0 overflow-hidden rounded-full ${className}`
  if (src && !failed) {
    return <img src={src} alt={name} referrerPolicy="no-referrer" onError={() => setFailed(true)} className={`${box} object-cover`} />
  }
  return (
    <span role="img" aria-label={name} className={`${box} relative grid place-items-end justify-center bg-gradient-to-br from-brand-100 to-brand-50 ring-1 ring-inset ring-brand-600/10 dark:from-brand-100 dark:to-brand-50`}>
      <svg viewBox="0 0 40 40" className="h-[88%] w-[88%] text-brand-600 dark:text-accent-400" aria-hidden="true">
        <circle cx="20" cy="15" r="7.5" fill="currentColor" opacity=".9" />
        <path d="M5 40c0-8.8 6.7-14 15-14s15 5.2 15 14" fill="currentColor" opacity=".75" />
      </svg>
    </span>
  )
}
