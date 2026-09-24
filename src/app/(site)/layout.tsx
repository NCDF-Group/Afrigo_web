import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import MotionRoot from '@/components/site/MotionRoot'
import ScrollToTop from '@/components/site/ScrollToTop'
import { getDictionary } from '@/i18n/server'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { t } = await getDictionary()
  return (
    <>
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-input focus:bg-white focus:px-4 focus:py-2 focus:font-bold">
        {t.common.skipToContent}
      </a>
      <SiteHeader />
      <main id="content">{children}</main>
      <SiteFooter />
      <MotionRoot />
      <ScrollToTop />
    </>
  )
}
