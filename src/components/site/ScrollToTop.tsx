'use client'
import { useEffect, useState } from 'react'
import { smoothScroll } from '@/lib/smoothScroll'
import { useI18n } from '@/i18n/client'

const RADIUS = 21
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// Floating back-to-top control with a ring that fills as the reader scrolls down the page.
export default function ScrollToTop() {
  const { t } = useI18n()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
      setVisible(window.scrollY > 480)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <button
      type="button"
      onClick={() => smoothScroll.toTop()}
      aria-label={t.common.backToTop}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`group fixed bottom-5 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-brand-900 text-white shadow-lg transition-all duration-300 hover:bg-brand-700 sm:bottom-8 sm:right-8 sm:h-14 sm:w-14 ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="2.5" />
        <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="#8FC155" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={CIRCUMFERENCE} strokeDashoffset={CIRCUMFERENCE * (1 - progress)} className="scroll-ring" />
      </svg>
      <svg viewBox="0 0 24 24" className="relative h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}
