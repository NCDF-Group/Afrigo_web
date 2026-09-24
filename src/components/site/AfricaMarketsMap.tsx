'use client'
import { useCallback, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { button } from '@/components/ui/styles'
import { MAP_COUNTRIES, MAP_HUBS, MAP_VIEWBOX, type MapCountry } from './africaMapData'
import CountryPicker from './CountryPicker'
import { useI18n } from '@/i18n/client'
import { fmt, INTL_LOCALE } from '@/i18n/config'

type Mode = 'etls' | 'afcfta'
type Tone = 'dark' | 'light'

// ECOWAS member states (ETLS applies between these). Mali, Burkina Faso and Niger left ECOWAS in January 2025.
const ECOWAS = new Set(['204', '132', '384', '270', '288', '324', '624', '430', '566', '686', '694', '768'])
// Every African Union member has signed the AfCFTA agreement except Eritrea.
const AFCFTA_NON_SIGNATORY = new Set(['232'])

const ROUTES: Record<Mode, [keyof typeof MAP_HUBS, keyof typeof MAP_HUBS][]> = {
  etls: [['dakar', 'banjul'], ['banjul', 'bissau'], ['bissau', 'conakry'], ['conakry', 'freetown'], ['freetown', 'monrovia'], ['monrovia', 'abidjan'], ['abidjan', 'accra'], ['accra', 'lome'], ['lome', 'cotonou'], ['cotonou', 'lagos'], ['lagos', 'kano']],
  afcfta: [['lagos', 'casablanca'], ['lagos', 'cairo'], ['lagos', 'addis'], ['lagos', 'nairobi'], ['lagos', 'kinshasa'], ['lagos', 'johannesburg'], ['accra', 'douala'], ['dakar', 'casablanca']]
}

const HUBS_BY_MODE: Record<Mode, (keyof typeof MAP_HUBS)[]> = {
  etls: ['dakar', 'banjul', 'bissau', 'conakry', 'freetown', 'monrovia', 'abidjan', 'accra', 'lome', 'cotonou', 'lagos', 'kano'],
  afcfta: ['lagos', 'accra', 'dakar', 'casablanca', 'cairo', 'addis', 'nairobi', 'kinshasa', 'johannesburg', 'douala']
}

const PALETTE: Record<Tone, { base: string; member: string; hover: string; selected: string; stroke: string; route: string; hub: string }> = {
  dark: { base: 'rgba(255,255,255,.07)', member: '#0B7259', hover: '#2E9278', selected: '#7CB041', stroke: '#012A22', route: '#A8D176', hub: '#FFFFFF' },
  light: { base: '#E4E2D9', member: '#0B7259', hover: '#024437', selected: '#7CB041', stroke: '#FAFAF7', route: '#649233', hub: '#012A22' }
}

// Nigeria, Ghana, Côte d'Ivoire, Senegal, Kenya, South Africa
const QUICK_PICKS = ['566', '288', '384', '686', '404', '710']

const inMode = (mode: Mode, id: string) => (mode === 'etls' ? ECOWAS.has(id) : !AFCFTA_NON_SIGNATORY.has(id))

// Gentle arc between two hubs: quadratic curve with the control point pushed perpendicular to the chord.
function arc(a: { x: number; y: number }, b: { x: number; y: number }, bend: number) {
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, dx = b.x - a.x, dy = b.y - a.y
  return `M${a.x} ${a.y}Q${mx - dy * bend} ${my + dx * bend} ${b.x} ${b.y}`
}

const describeKey = (id: string) => (ECOWAS.has(id) ? 'ecowas' : !AFCFTA_NON_SIGNATORY.has(id) ? 'signatory' : 'other') as 'ecowas' | 'signatory' | 'other'

export default function AfricaMarketsMap({ tone = 'dark', children }: { tone?: Tone; children?: React.ReactNode }) {
  const { locale, t } = useI18n()
  const copy = t.map
  const [mode, setMode] = useState<Mode>('etls')
  // Selection is stored by id so the visible name follows the active language.
  const [selectedId, setSelectedId] = useState<string | null>('566')
  const [hover, setHover] = useState<{ id: string; x: number; y: number } | null>(null)

  const countries = useMemo(
    () => MAP_COUNTRIES.map(country => ({ ...country, name: t.countries[country.id] || country.name })).sort((a, b) => a.name.localeCompare(b.name, INTL_LOCALE[locale])),
    [locale, t.countries]
  )
  const byId = useMemo(() => new Map(countries.map(country => [country.id, country])), [countries])
  const selected = selectedId ? byId.get(selectedId) || null : null
  const hovered = hover ? byId.get(hover.id) : undefined
  const frame = useRef<HTMLDivElement>(null)
  const colors = PALETTE[tone]
  const dark = tone === 'dark'

  const isMember = useCallback((id: string) => inMode(mode, id), [mode])
  const counts = useMemo(() => ({ etls: ECOWAS.size, afcfta: MAP_COUNTRIES.filter(country => !AFCFTA_NON_SIGNATORY.has(country.id)).length }), [])
  const number = new Intl.NumberFormat(INTL_LOCALE[locale])

  const fill = (country: MapCountry) => {
    if (selectedId === country.id) return colors.selected
    if (hover?.id === country.id) return colors.hover
    return inMode(mode, country.id) ? colors.member : colors.base
  }

  const track = (country: MapCountry, event: React.PointerEvent) => {
    if (event.pointerType !== 'mouse' || !frame.current) return
    const rect = frame.current.getBoundingClientRect()
    setHover({ id: country.id, x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 })
  }

  const handlers = (country: MapCountry) => ({
    onPointerMove: (event: React.PointerEvent) => track(country, event),
    onPointerLeave: () => setHover(null),
    onClick: () => setSelectedId(current => (current === country.id ? null : country.id))
  })

  const text = dark ? 'text-white' : 'text-ink-900'
  const muted = dark ? 'text-white/70' : 'text-ink-500'
  const panel = dark ? 'border-white/10 bg-white/5' : 'border-line bg-white'

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      <div>
        {children}

        <div role="group" aria-label={copy.scheme} className={`mt-8 inline-flex rounded-full border p-1 ${dark ? 'border-white/15 bg-white/5' : 'border-line bg-white'}`}>
          {(['etls', 'afcfta'] as const).map(value => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${mode === value ? (dark ? 'bg-accent-500 text-brand-950' : 'bg-brand-600 text-white') : muted}`}
            >
              {copy.tabs[value]}
            </button>
          ))}
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3">
          <div className={`rounded-card border p-4 ${panel}`}>
            <dt className={`text-xs font-semibold ${muted}`}>{copy.stats[mode]}</dt>
            <dd className={`mt-1 font-display text-3xl font-bold ${dark ? 'text-accent-300' : 'text-brand-600'}`}>{number.format(mode === 'etls' ? counts.etls : counts.afcfta)}</dd>
          </div>
          <div className={`rounded-card border p-4 ${panel}`}>
            <dt className={`text-xs font-semibold ${muted}`}>{mode === 'etls' ? copy.stats.coverage : copy.stats.ofAu}</dt>
            <dd className={`mt-1 font-display text-3xl font-bold ${dark ? 'text-accent-300' : 'text-brand-600'}`}>{mode === 'etls' ? copy.stats.westAfrica : `${counts.afcfta}/${MAP_COUNTRIES.length}`}</dd>
          </div>
        </dl>

        <div className="mt-6">
          <CountryPicker
            countries={countries}
            value={selected}
            onChange={country => setSelectedId(country?.id || null)}
            isMember={isMember}
            memberLabel={mode === 'etls' ? copy.picker.groups.etlsMember : copy.picker.groups.afcftaMember}
            otherLabel={mode === 'etls' ? copy.picker.groups.etlsOther : copy.picker.groups.afcftaOther}
            quickPicks={QUICK_PICKS}
            dark={dark}
          />
        </div>

        <div aria-live="polite" className={`mt-4 min-h-[168px] rounded-card border p-5 ${panel}`}>
          {selected ? (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className={`font-display text-xl font-bold ${text}`}>{selected.name}</h3>
                {ECOWAS.has(selected.id) && <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${dark ? 'bg-brand-500/25 text-brand-200' : 'bg-brand-50 text-brand-700'}`}>{copy.badges.ecowas}</span>}
                {!AFCFTA_NON_SIGNATORY.has(selected.id) && <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${dark ? 'bg-accent-400/15 text-accent-300' : 'bg-accent-50 text-accent-700'}`}>{copy.badges.signatory}</span>}
              </div>
              <p className={`mt-2 text-sm leading-6 ${muted}`}>{copy.describe[describeKey(selected.id)]}</p>
              <Link href="/market-access" className={`${dark ? button.accent : button.primary} mt-4 min-h-10 px-4`}>{copy.check}</Link>
            </>
          ) : (
            <p className={`text-sm leading-6 ${muted}`}>{copy.empty}</p>
          )}
        </div>
      </div>

      <div ref={frame} className="relative mx-auto w-full max-w-[560px]">
        <svg viewBox={MAP_VIEWBOX} className="h-auto w-full" role="img" aria-label={fmt(copy.aria[mode], { count: mode === 'etls' ? counts.etls : counts.afcfta })}>
          <g aria-hidden="true">
            {countries.map(country =>
              country.d ? (
                <path key={country.id} d={country.d} fill={fill(country)} stroke={colors.stroke} strokeWidth={1} className="cursor-pointer transition-[fill] duration-300" {...handlers(country)} />
              ) : (
                <g key={country.id} className="cursor-pointer" {...handlers(country)}>
                  <circle cx={country.x} cy={country.y} r={14} fill="transparent" />
                  <circle cx={country.x} cy={country.y} r={6} fill={fill(country)} stroke={colors.stroke} strokeWidth={1.5} className="transition-[fill] duration-300" />
                </g>
              )
            )}

            <g key={mode} className="pointer-events-none">
              {ROUTES[mode].map(([from, to], index) => (
                <path
                  key={`${from}-${to}`}
                  d={arc(MAP_HUBS[from], MAP_HUBS[to], mode === 'etls' ? 0.12 : 0.18)}
                  fill="none"
                  stroke={colors.route}
                  strokeWidth={2}
                  strokeLinecap="round"
                  className="map-route"
                  style={{ animationDelay: `${index * 120}ms` }}
                />
              ))}
              {HUBS_BY_MODE[mode].map(key => (
                <g key={key}>
                  <circle cx={MAP_HUBS[key].x} cy={MAP_HUBS[key].y} r={9} fill={colors.route} className="map-pulse" />
                  <circle cx={MAP_HUBS[key].x} cy={MAP_HUBS[key].y} r={4} fill={colors.hub} stroke={colors.route} strokeWidth={2} />
                </g>
              ))}
            </g>

            {selected && (
              <g className="pointer-events-none">
                <circle cx={selected.x} cy={selected.y} r={16} fill="none" stroke={colors.selected} strokeWidth={2} className="map-pulse" />
              </g>
            )}
          </g>
        </svg>

        {hover && hovered && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[130%] whitespace-nowrap rounded-input bg-ink-900 px-3 py-2 text-xs font-semibold text-white shadow-lg"
            style={{ left: `${hover.x}%`, top: `${hover.y}%` }}
          >
            {hovered.name}
            {ECOWAS.has(hovered.id) && <span className="ml-2 text-accent-300">{copy.badges.tooltipEcowas}</span>}
          </div>
        )}

        <ul className={`mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold ${muted}`}>
          <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm" style={{ background: colors.member }} />{copy.legend[mode]}</li>
          <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm" style={{ background: colors.selected }} />{copy.legend.selected}</li>
          <li className="flex items-center gap-2"><span className="h-0.5 w-5 rounded" style={{ background: colors.route }} />{copy.legend.corridor}</li>
        </ul>
      </div>
    </div>
  )
}
