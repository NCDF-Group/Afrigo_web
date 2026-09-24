'use client'
import { useEffect, useState } from 'react'

type Props = { phrases: readonly string[]; typeMs?: number; deleteMs?: number; holdMs?: number }

// Server-renders the first phrase in full (no blank headline, no layout shift), then cycles:
// hold → delete → type the next phrase. Reduced-motion users keep the static first phrase.
export default function Typewriter({ phrases, typeMs = 70, deleteMs = 35, holdMs = 2200 }: Props) {
  const [index, setIndex] = useState(0)
  const [length, setLength] = useState(phrases[0].length)
  const [phase, setPhase] = useState<'hold' | 'delete' | 'type'>('hold')
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const phrase = phrases[index]
    let timer: number
    if (phase === 'hold') {
      timer = window.setTimeout(() => setPhase('delete'), holdMs)
    } else if (phase === 'delete') {
      if (length === 0) {
        setIndex(value => (value + 1) % phrases.length)
        setPhase('type')
        return
      }
      timer = window.setTimeout(() => setLength(value => value - 1), deleteMs)
    } else {
      if (length === phrase.length) {
        setPhase('hold')
        return
      }
      timer = window.setTimeout(() => setLength(value => value + 1), typeMs + Math.random() * 40)
    }
    return () => window.clearTimeout(timer)
  }, [enabled, phase, length, index, phrases, typeMs, deleteMs, holdMs])

  return (
    <span aria-hidden="true">
      {phrases[index].slice(0, length)}
      <span className="caret ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.08em] rounded-full bg-accent-400 align-baseline" />
    </span>
  )
}
