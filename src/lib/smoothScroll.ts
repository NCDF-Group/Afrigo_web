import type Lenis from 'lenis'

// Shared handle so overlays (e.g. the mobile menu) can pause smooth scrolling.
let instance: Lenis | null = null

export const smoothScroll = {
  set(value: Lenis | null) {
    instance = value
  },
  stop() {
    instance?.stop()
  },
  start() {
    instance?.start()
  },
  toTop() {
    if (instance) instance.scrollTo(0, { duration: 1.2 })
    else window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }
}
