import type { Metadata, Viewport } from 'next'
import { Manrope, Montserrat } from 'next/font/google'
import './globals.css'
import { BRAND } from '@/lib/brand'
import { I18nProvider } from '@/i18n/client'
import { clientDictionary, getDictionary } from '@/i18n/server'

const manrope = Manrope({ subsets: ['latin', 'latin-ext'], variable: '--font-sans', display: 'swap' })
const montserrat = Montserrat({ subsets: ['latin', 'latin-ext'], weight: ['600', '700', '800'], variable: '--font-display', display: 'swap' })

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary()
  return {
    title: { default: t.meta.siteTitle, template: `%s | ${BRAND.name}` },
    description: t.meta.description,
    applicationName: BRAND.name
  }
}

export const viewport: Viewport = {
  themeColor: '#012A22',
  width: 'device-width',
  initialScale: 1
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { locale, t } = await getDictionary()
  return (
    <html lang={locale} className={`${manrope.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-canvas font-sans text-ink-900">
        <I18nProvider locale={locale} t={clientDictionary(t)}>{children}</I18nProvider>
      </body>
    </html>
  )
}
