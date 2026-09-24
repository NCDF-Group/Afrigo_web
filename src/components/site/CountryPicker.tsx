'use client'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { MapCountry } from './africaMapData'
import { useI18n } from '@/i18n/client'
import { fmt } from '@/i18n/config'

type Group = { label: string; items: MapCountry[] }

type Props = {
  countries: MapCountry[]
  value: MapCountry | null
  onChange: (country: MapCountry | null) => void
  isMember: (id: string) => boolean
  memberLabel: string
  otherLabel: string
  quickPicks: string[]
  dark: boolean
}

// Accent-insensitive match so "cote" finds Côte d'Ivoire and "sao" finds São Tomé.
const normalise = (value: string) => value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

// Bold the matched part of a country name (accent-insensitive; indexes line up because NFD only strips combining marks per character).
function Highlight({ text, query }: { text: string; query: string }) {
  const q = normalise(query.trim())
  if (!q) return <>{text}</>
  const folded = Array.from(text).map(char => normalise(char)).join('')
  const start = folded.indexOf(q)
  if (start < 0 || folded.length !== text.length) return <>{text}</>
  return <>{text.slice(0, start)}<mark className="bg-transparent font-bold text-inherit underline decoration-accent-400 decoration-2 underline-offset-4">{text.slice(start, start + q.length)}</mark>{text.slice(start + q.length)}</>
}

// Searchable combobox (WAI-ARIA 1.2 pattern): type to filter, arrows to move, Enter to choose, Escape to close.
export default function CountryPicker({ countries, value, onChange, isMember, memberLabel, otherLabel, quickPicks, dark }: Props) {
  const id = useId()
  const copy = useI18n().t.map.picker
  const listId = `${id}-list`
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLUListElement>(null)

  const groups = useMemo<Group[]>(() => {
    const q = normalise(query.trim())
    // Rank: name starts with the query, then any word starts with it, then it appears anywhere.
    const rank = (name: string) => { const n = normalise(name); return n.startsWith(q) ? 0 : n.split(/[\s'-]+/).some(word => word.startsWith(q)) ? 1 : 2 }
    const matches = q
      ? countries.filter(country => normalise(country.name).includes(q)).sort((a, b) => rank(a.name) - rank(b.name) || a.name.localeCompare(b.name))
      : countries
    return [
      { label: memberLabel, items: matches.filter(country => isMember(country.id)) },
      { label: otherLabel, items: matches.filter(country => !isMember(country.id)) }
    ].filter(group => group.items.length)
  }, [countries, query, isMember, memberLabel, otherLabel])

  const flat = useMemo(() => groups.flatMap(group => group.items), [groups])

  useEffect(() => {
    if (!open) return
    const close = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false) }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])

  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active, open])

  const openList = () => {
    setOpen(true)
    const index = value ? flat.findIndex(country => country.id === value.id) : 0
    setActive(index < 0 ? 0 : index)
  }

  const choose = (country: MapCountry) => {
    onChange(country)
    setQuery('')
    setOpen(false)
    // Keep focus but select the shown name, so typing again starts a fresh search instead of appending.
    requestAnimationFrame(() => input.current?.select())
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') { event.preventDefault(); if (!open) return openList(); setActive(index => Math.min(index + 1, flat.length - 1)) }
    else if (event.key === 'ArrowUp') { event.preventDefault(); setActive(index => Math.max(index - 1, 0)) }
    else if (event.key === 'Home' && open) { event.preventDefault(); setActive(0) }
    else if (event.key === 'End' && open) { event.preventDefault(); setActive(flat.length - 1) }
    else if (event.key === 'Enter' && open && flat[active]) { event.preventDefault(); choose(flat[active]) }
    else if (event.key === 'Escape') { if (open) { setOpen(false); setQuery('') } else if (value) onChange(null) }
    else if (event.key === 'Tab') setOpen(false)
  }

  const field = dark
    ? 'border-white/15 bg-brand-950/60 text-white placeholder:text-white/40 focus:border-accent-400 focus:ring-accent-400/25'
    : 'border-line bg-white text-ink-900 placeholder:text-ink-400 focus:border-brand-600 focus:ring-brand-600/10'
  const popover = dark ? 'border-white/15 bg-brand-950 text-white shadow-[0_24px_48px_-12px_rgba(0,0,0,.6)]' : 'border-line bg-white text-ink-900 shadow-lg'
  const muted = dark ? 'text-white/50' : 'text-ink-500'
  const chip = dark ? 'border-white/15 text-white/80 hover:border-accent-400 hover:text-white' : 'border-line bg-white text-ink-700 hover:border-brand-300'
  const chipActive = dark ? 'border-accent-400 bg-accent-400/15 text-accent-200' : 'border-brand-600 bg-brand-50 text-brand-700'

  let index = -1

  return (
    <div ref={root}>
      <label htmlFor={`${id}-input`} className={`mb-1.5 block text-sm font-semibold ${dark ? 'text-white' : 'text-ink-900'}`}>{copy.label}</label>
      <div className="relative">
        <svg viewBox="0 0 24 24" className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 ${muted}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref={input}
          id={`${id}-input`}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && flat[active] ? `${id}-opt-${flat[active].id}` : undefined}
          autoComplete="off"
          spellCheck={false}
          value={open ? query : value?.name || ''}
          placeholder={value ? value.name : fmt(copy.placeholder, { count: countries.length })}
          onFocus={openList}
          onClick={() => !open && openList()}
          onChange={event => { setQuery(open ? event.target.value : event.target.value.replace(value?.name || '', '')); setActive(0); if (!open) setOpen(true) }}
          onKeyDown={onKeyDown}
          className={`block min-h-12 w-full rounded-input border pl-11 pr-20 text-[15px] transition-colors focus:outline-none focus:ring-4 ${field}`}
        />
        <div className="absolute inset-y-0 right-2 flex items-center gap-1">
          {value && (
            <button type="button" aria-label={copy.clear} onClick={() => { onChange(null); setQuery(''); input.current?.focus() }} className={`flex h-8 w-8 items-center justify-center rounded-full ${dark ? 'text-white/60 hover:bg-white/10 hover:text-white' : 'text-ink-500 hover:bg-subtle hover:text-ink-900'}`}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          )}
          <button type="button" tabIndex={-1} aria-hidden="true" onClick={() => (open ? setOpen(false) : (input.current?.focus(), openList()))} className={`flex h-8 w-8 items-center justify-center rounded-full ${muted}`}>
            <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
          </button>
        </div>

        {open && (
          <div className={`absolute inset-x-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-card border ${popover}`}>
            <ul ref={list} id={listId} role="listbox" aria-label={copy.list} data-lenis-prevent className="max-h-72 overflow-y-auto overscroll-contain pb-2">
              {groups.map(group => (
                <li key={group.label} role="presentation">
                  <p role="presentation" className={`sticky top-0 z-10 px-4 pb-1.5 pt-2 text-[11px] font-bold uppercase tracking-[.08em] ${dark ? 'bg-brand-950 text-accent-300' : 'bg-white text-accent-700'}`}>
                    {group.label} <span className={muted}>· {group.items.length}</span>
                  </p>
                  <ul role="group" aria-label={group.label}>
                    {group.items.map(country => {
                      index += 1
                      const current = index
                      const isActive = current === active
                      const isSelected = value?.id === country.id
                      return (
                        <li
                          key={country.id}
                          id={`${id}-opt-${country.id}`}
                          role="option"
                          aria-selected={isSelected}
                          data-index={current}
                          onPointerMove={() => setActive(current)}
                          onPointerDown={event => event.preventDefault()}
                          onClick={() => choose(country)}
                          className={`mx-2 flex cursor-pointer items-center gap-3 rounded-input px-3 py-2.5 text-[15px] ${isActive ? (dark ? 'bg-white/10' : 'bg-subtle') : ''}`}
                        >
                          <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 rounded-full ${isMember(country.id) ? 'bg-brand-500' : dark ? 'bg-white/20' : 'bg-line-strong'}`} />
                          <span className="flex-1 font-medium"><Highlight text={country.name} query={query} /></span>
                          {isSelected && (
                            <svg viewBox="0 0 24 24" className={`h-4 w-4 ${dark ? 'text-accent-300' : 'text-brand-600'}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </li>
              ))}
              {!flat.length && <li role="presentation" className={`px-4 py-6 text-center text-sm ${muted}`}>{fmt(copy.noMatch, { query })}</li>}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className={`text-xs font-semibold ${muted}`}>{copy.popular}</span>
        {quickPicks.map(pickId => {
          const country = countries.find(item => item.id === pickId)
          if (!country) return null
          const on = value?.id === country.id
          return (
            <button key={pickId} type="button" aria-pressed={on} onClick={() => onChange(on ? null : country)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${on ? chipActive : chip}`}>
              {country.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
