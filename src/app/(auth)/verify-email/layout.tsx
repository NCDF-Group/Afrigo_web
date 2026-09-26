import type { Metadata } from 'next'
import { getDictionary } from '@/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary()
  return { ...t.meta.pages.verifyEmail, robots: { index: false, follow: false } }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
