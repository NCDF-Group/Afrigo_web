'use client'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Icon from '@/components/ui/Icon'
import { button } from '@/components/ui/styles'
import { fmt } from '@/i18n/config'
import { useI18n } from '@/i18n/client'

const DONE = 'afrigo:tour-done'
const STEPS = ['welcome', 'nav', 'verification', 'stats', 'checklist', 'explore', 'account'] as const
const GAP = 16
const EDGE = 16

type StepKey = (typeof STEPS)[number]
type Placement = 'below' | 'above' | 'right'

export function tourSeen() {
  try {
    return localStorage.getItem(DONE) === '1'
  } catch {
    return true
  }
}

export function resetTour() {
  try {
    localStorage.removeItem(DONE)
  } catch {}
}

function markSeen() {
  try {
    localStorage.setItem(DONE, '1')
  } catch {}
}

function findTarget(key: StepKey) {
  if (key === 'welcome') return null
  return (
    Array.from(document.querySelectorAll<HTMLElement>(`[data-tour="${key}"]`)).find(element => {
      const rect = element.getBoundingClientRect()
      return rect.width > 0 && rect.height > 0
    }) ?? null
  )
}

function layout(rect: DOMRect, width: number, height: number) {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const clampX = (value: number) => Math.min(Math.max(value, EDGE), viewportWidth - width - EDGE)
  const clampY = (value: number) => Math.min(Math.max(value, EDGE), viewportHeight - height - EDGE)
  if (viewportWidth >= 1024 && rect.right < viewportWidth * 0.3 && rect.right + GAP + width < viewportWidth) {
    const top = clampY(rect.top + rect.height / 2 - height / 2)
    return { placement: 'right' as Placement, left: rect.right + GAP, top, arrow: Math.min(Math.max(rect.top + rect.height / 2 - top, 20), height - 20) }
  }
  const below = viewportHeight - rect.bottom >= height + GAP + EDGE || viewportHeight - rect.bottom > rect.top
  const left = clampX(rect.left + rect.width / 2 - width / 2)
  const top = below ? Math.min(rect.bottom + GAP, viewportHeight - height - EDGE) : Math.max(rect.top - GAP - height, EDGE)
  return { placement: (below ? 'below' : 'above') as Placement, left, top, arrow: Math.min(Math.max(rect.left + rect.width / 2 - left, 22), width - 22) }
}

export default function Tour({ onClose }: { onClose: () => void }) {
  const { t } = useI18n()
  const copy = t.workspace.tour
  const [index, setIndex] = useState(0)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const [size, setSize] = useState({ width: 340, height: 200 })
  const [mounted, setMounted] = useState(false)
  const card = useRef<HTMLDivElement>(null)
  const primary = useRef<HTMLButtonElement>(null)
  const available = STEPS.filter(key => key === 'welcome' || (mounted && findTarget(key)))
  const key = available[Math.min(index, available.length - 1)] ?? 'welcome'

  const finish = useCallback(() => {
    markSeen()
    onClose()
  }, [onClose])

  const next = useCallback(() => (index >= available.length - 1 ? finish() : setIndex(index + 1)), [index, available.length, finish])
  const back = useCallback(() => setIndex(Math.max(0, index - 1)), [index])

  useEffect(() => setMounted(true), [])

  useLayoutEffect(() => {
    if (!mounted) return
    const target = findTarget(key)
    if (!target) {
      setRect(null)
      return
    }
    target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    const measure = () => setRect(target.getBoundingClientRect())
    measure()
    const timers = [150, 400, 700].map(delay => setTimeout(measure, delay))
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, true)
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure, true)
    }
  }, [key, mounted])

  useLayoutEffect(() => {
    if (!card.current) return
    setSize({ width: card.current.offsetWidth, height: card.current.offsetHeight })
  }, [key, rect, mounted])

  useEffect(() => {
    primary.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finish()
      if (event.key === 'ArrowRight') next()
      if (event.key === 'ArrowLeft') back()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [key, next, back, finish])

  if (!mounted) return null

  const step = copy.steps[key]
  const width = Math.min(340, window.innerWidth - EDGE * 2)
  const position = rect ? layout(rect, width, size.height) : null
  const last = index >= available.length - 1

  const arrowStyle: React.CSSProperties | undefined = position
    ? position.placement === 'right'
      ? { left: -7, top: position.arrow - 7 }
      : position.placement === 'below'
        ? { top: -7, left: position.arrow - 7 }
        : { bottom: -7, left: position.arrow - 7 }
    : undefined

  return (
    <div className="fixed inset-0 z-[60]" role="presentation">
      {rect ? (
        <>
          <div className="absolute inset-0" onClick={event => event.stopPropagation()} />
          <div
            aria-hidden="true"
            className="spotlight pointer-events-none fixed rounded-[14px] transition-all duration-500 ease-out"
            style={{ top: rect.top - 6, left: rect.left - 6, width: rect.width + 12, height: rect.height + 12 }}
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-[rgb(1_15_11/.62)] backdrop-blur-[2px]" />
      )}

      <div className={position ? 'contents' : 'fixed inset-0 grid place-items-center p-4'}>
        <div
          ref={card}
          role="dialog"
          aria-modal="true"
          aria-labelledby="tour-title"
          aria-describedby="tour-text"
          key={key}
          className={`pop-in rounded-card border border-line bg-surface p-5 shadow-lg ${position ? 'fixed' : 'relative'}`}
          style={position ? { width, left: position.left, top: position.top } : { width }}
        >
          {arrowStyle && (
            <span
              aria-hidden="true"
              className="absolute h-3.5 w-3.5 border-l border-t border-line bg-surface"
              style={{ ...arrowStyle, transform: `rotate(${position!.placement === 'above' ? 225 : position!.placement === 'right' ? -45 : 45}deg)` }}
            />
          )}
          {key === 'welcome' && (
            <span className="mb-4 grid h-12 w-12 place-items-center rounded-input bg-brand-50 text-brand-600 dark:text-accent-400">
              <Icon name="target" />
            </span>
          )}
          <p className="text-xs font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400">{fmt(copy.progress, { current: index + 1, total: available.length })}</p>
          <h2 id="tour-title" className="mt-1.5 font-display text-lg font-bold text-ink-900">
            {step.title}
          </h2>
          <p id="tour-text" className="mt-1.5 text-sm leading-6 text-ink-500">
            {step.text}
          </p>
          <div className="mt-4 flex items-center gap-1.5" aria-hidden="true">
            {available.map((item, dot) => (
              <span key={item} className={`h-1.5 rounded-full transition-all duration-300 ${dot === index ? 'w-6 bg-brand-600 dark:bg-accent-500' : 'w-1.5 bg-line-strong'}`} />
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between gap-3">
            <button type="button" onClick={finish} className="min-h-10 text-sm font-semibold text-ink-500 hover:text-ink-900">
              {copy.skip}
            </button>
            <div className="flex gap-2">
              {index > 0 && (
                <button type="button" onClick={back} className={`${button.secondary} min-h-10 px-4`}>
                  {copy.back}
                </button>
              )}
              <button ref={primary} type="button" onClick={next} className={`${button.primary} min-h-10 px-4`}>
                {last ? copy.done : copy.next}
                {!last && <Icon name="arrowRight" className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
