'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { smoothScroll } from '@/lib/smoothScroll'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Site-wide motion: Lenis smooth scrolling, scroll-reveal for [data-reveal] and the card spotlight.
export default function MotionRoot() {
  const pathname = usePathname()

  useEffect(() => {
    if (reducedMotion()) return
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: { offset: -88 } })
    smoothScroll.set(lenis)
    return () => {
      lenis.destroy()
      smoothScroll.set(null)
    }
  }, [])

  useEffect(() => {
    const reveal = (element: Element) => element.classList.add('is-visible')
    if (reducedMotion() || !('IntersectionObserver' in window)) return
    // Content stays visible until this class is set, so it never depends on JS to appear.
    document.documentElement.classList.add('motion-ready')
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return
        reveal(entry.target)
        observer.unobserve(entry.target)
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    )
    const scan = () => document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach(element => observer.observe(element))
    scan()
    const mutations = new MutationObserver(records => {
      if (records.some(record => Array.from(record.addedNodes).some(node => node.nodeType === Node.ELEMENT_NODE))) scan()
    })
    mutations.observe(document.body, { childList: true, subtree: true })
    return () => {
      observer.disconnect()
      mutations.disconnect()
    }
  }, [pathname])

  useEffect(() => {
    const move = (event: PointerEvent) => {
      const card = (event.target as HTMLElement | null)?.closest<HTMLElement>('.card-interactive')
      if (!card) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      card.style.setProperty('--my', `${event.clientY - rect.top}px`)
    }
    document.addEventListener('pointermove', move, { passive: true })
    return () => document.removeEventListener('pointermove', move)
  }, [])

  return null
}
