import type { Metadata, Viewport } from 'next'
import { Manrope, Montserrat } from 'next/font/google'
import './globals.css'
import { BRAND } from '@/lib/brand'

const manrope = Manrope({ subsets: ['latin', 'latin-ext'], variable: '--font-sans', display: 'swap' })
const montserrat = Montserrat({ subsets: ['latin', 'latin-ext'], weight: ['600', '700', '800'], variable: '--font-display', display: 'swap' })

export const metadata: Metadata = {
  title: { default: `${BRAND.name} | ${BRAND.tagline}`, template: `%s | ${BRAND.name}` },
  description: BRAND.description,
  applicationName: BRAND.name
}

export const viewport: Viewport = {
  themeColor: '#072E1D',
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-canvas font-sans text-ink-900">{children}</body>
    </html>
  )
}
