'use client'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

export type ThemePreference = 'light' | 'dark' | 'system'

const KEY = 'afrigo:theme'
const EVENT = 'afrigo-theme-change'
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export function readPreference(): ThemePreference {
  try {
    const value = localStorage.getItem(KEY)
    return value === 'light' || value === 'dark' ? value : 'system'
  } catch {
    return 'system'
  }
}

const systemDark = () => typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches

export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>('system')
  const [dark, setDark] = useState(false)

  useIsomorphicLayoutEffect(() => {
    const sync = () => {
      const next = readPreference()
      setPreference(next)
      setDark(next === 'dark' || (next === 'system' && systemDark()))
    }
    sync()
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', sync)
    window.addEventListener(EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      media.removeEventListener('change', sync)
      window.removeEventListener(EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const choose = useCallback((next: ThemePreference) => {
    try {
      if (next === 'system') localStorage.removeItem(KEY)
      else localStorage.setItem(KEY, next)
    } catch {}
    window.dispatchEvent(new Event(EVENT))
  }, [])

  return { preference, dark, choose }
}

export function ThemeScope() {
  const { dark } = useTheme()
  useIsomorphicLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    return () => document.documentElement.classList.remove('dark')
  }, [dark])
  return null
}
