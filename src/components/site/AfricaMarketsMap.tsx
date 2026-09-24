'use client'
import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { button } from '@/components/ui/styles'
import { MAP_COUNTRIES, MAP_HUBS, MAP_VIEWBOX, type MapCountry } from './africaMapData'

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
  dark: { base: 'rgba(255,255,255,.07)', member: '#1B7F4E', hover: '#3F9E6C', selected: '#C9971A', stroke: '#072E1D', route: '#EDC555', hub: '#FFFFFF' },
  light: { base: '#E4E2D9', member: '#1B7F4E', hover: '#0B5634', selected: '#C9971A', stroke: '#FAFAF7', route: '#A87A12', hub: '#072E1D' }
}

const inMode = (mode: Mode, id: string) => (mode === 'etls' ? ECOWAS.has(id) : !AFCFTA_NON_SIGNATORY.has(id))

// Gentle arc between two hubs: quadratic curve with the control point pushed perpendicular to the chord.
function arc(a: { x: number; y: number }, b: { x: number; y: number }, bend: number) {
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, dx = b.x - a.x, dy = b.y - a.y
  return `M${a.x} ${a.y}Q${mx - dy * bend} ${my + dx * bend} ${b.x} ${b.y}`
}

function describe(country: MapCountry) {
  const ecowas = ECOWAS.has(country.id)
  const signatory = !AFCFTA_NON_SIGNATORY.has(country.id)
  if (ecowas) return 'An ECOWAS member. Trade with other member states may qualify under ETLS where goods and producers meet the scheme’s rules, and AfCFTA preferences can apply for wider African trade.'
  if (signatory) return 'Outside ECOWAS, so ETLS does not apply. AfCFTA preferences may apply where both countries are trading under the agreement and goods meet its rules of origin.'
  return 'Not an AfCFTA signatory and outside ECOWAS. Standard customs requirements apply — confirm them with the relevant authorities.'
}

export default function AfricaMarketsMap({ tone = 'dark', children }: { tone?: Tone; children?: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>('etls')
  const [selected, setSelected] = useState<MapCountry | null>(() => MAP_COUNTRIES.find(country => country.id === '566') || null)
  const [hover, setHover] = useState<{ country: MapCountry; x: number; y: number } | null>(null)
  const frame = useRef<HTMLDivElement>(null)
  const colors = PALETTE[tone]
  const dark = tone === 'dark'

  const counts = useMemo(() => ({ etls: ECOWAS.size, afcfta: MAP_COUNTRIES.filter(country => !AFCFTA_NON_SIGNATORY.has(country.id)).length }), [])

  const fill = (country: MapCountry) => {
    if (selected?.id === country.id) return colors.selected
    if (hover?.country.id === country.id) return colors.hover
    return inMode(mode, country.id) ? colors.member : colors.base
  }

  const track = (country: MapCountry, event: React.PointerEvent) => {
    if (event.pointerType !== 'mouse' || !frame.current) return
    const rect = frame.current.getBoundingClientRect()
    setHover({ country, x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 })
  }

  const handlers = (country: MapCountry) => ({
    onPointerMove: (event: React.PointerEvent) => track(country, event),
    onPointerLeave: () => setHover(null),
    onClick: () => setSelected(current => (current?.id === country.id ? null : country))
  })

  const text = dark ? 'text-white' : 'text-ink-900'
  const muted = dark ? 'text-white/70' : 'text-ink-500'
  const panel = dark ? 'border-white/10 bg-white/5' : 'border-line bg-white'

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      <div>
        {children}

        <div role="group" aria-label="Trade scheme" className={`mt-8 inline-flex rounded-full border p-1 ${dark ? 'border-white/15 bg-white/5' : 'border-line bg-white'}`}>
          {(['etls', 'afcfta'] as const).map(value => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${mode === value ? (dark ? 'bg-gold-500 text-brand-950' : 'bg-brand-600 text-white') : muted}`}
            >
              {value === 'etls' ? 'ETLS · ECOWAS' : 'AfCFTA'}
            </button>
          ))}
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3">
          <div className={`rounded-card border p-4 ${panel}`}>
            <dt className={`text-xs font-semibold ${muted}`}>{mode === 'etls' ? 'ECOWAS member states' : 'AfCFTA signatories'}</dt>
            <dd className={`mt-1 font-display text-3xl font-bold ${dark ? 'text-gold-300' : 'text-brand-600'}`}>{mode === 'etls' ? counts.etls : counts.afcfta}</dd>
          </div>
          <div className={`rounded-card border p-4 ${panel}`}>
            <dt className={`text-xs font-semibold ${muted}`}>{mode === 'etls' ? 'Coverage' : 'Of AU members'}</dt>
            <dd className={`mt-1 font-display text-3xl font-bold ${dark ? 'text-gold-300' : 'text-brand-600'}`}>{mode === 'etls' ? 'West Africa' : `${counts.afcfta}/${MAP_COUNTRIES.length}`}</dd>
          </div>
        </dl>

        <label className="mt-6 block">
          <span className={`mb-1.5 block text-sm font-semibold ${text}`}>Explore a country</span>
          <select
            value={selected?.id || ''}
            onChange={event => setSelected(MAP_COUNTRIES.find(country => country.id === event.target.value) || null)}
            className={`block min-h-12 w-full rounded-input border px-4 text-[15px] focus:outline-none focus:ring-4 ${dark ? 'border-white/15 bg-brand-950/60 text-white focus:ring-gold-400/30' : 'border-line bg-white text-ink-900 focus:ring-brand-600/10'}`}
          >
            <option value="">Select a country…</option>
            {MAP_COUNTRIES.map(country => <option key={country.id} value={country.id}>{country.name}</option>)}
          </select>
        </label>

        <div aria-live="polite" className={`mt-4 min-h-[168px] rounded-card border p-5 ${panel}`}>
          {selected ? (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className={`font-display text-xl font-bold ${text}`}>{selected.name}</h3>
                {ECOWAS.has(selected.id) && <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${dark ? 'bg-brand-500/25 text-brand-200' : 'bg-brand-50 text-brand-700'}`}>ECOWAS · ETLS</span>}
                {!AFCFTA_NON_SIGNATORY.has(selected.id) && <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${dark ? 'bg-gold-400/15 text-gold-300' : 'bg-gold-50 text-gold-700'}`}>AfCFTA signatory</span>}
              </div>
              <p className={`mt-2 text-sm leading-6 ${muted}`}>{describe(selected)}</p>
              <Link href="/market-access" className={`${dark ? button.accent : button.primary} mt-4 min-h-10 px-4`}>Check requirements</Link>
            </>
          ) : (
            <p className={`text-sm leading-6 ${muted}`}>Select a country on the map or from the list to see which trade schemes may apply.</p>
          )}
        </div>
      </div>

      <div ref={frame} className="relative mx-auto w-full max-w-[560px]">
        <svg viewBox={MAP_VIEWBOX} className="h-auto w-full" role="img" aria-label={`Map of Africa highlighting ${mode === 'etls' ? `the ${counts.etls} ECOWAS member states where ETLS applies` : `the ${counts.afcfta} AfCFTA signatories`}.`}>
          <g aria-hidden="true">
            {MAP_COUNTRIES.map(country =>
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

        {hover && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[130%] whitespace-nowrap rounded-input bg-ink-900 px-3 py-2 text-xs font-semibold text-white shadow-lg"
            style={{ left: `${hover.x}%`, top: `${hover.y}%` }}
          >
            {hover.country.name}
            {ECOWAS.has(hover.country.id) && <span className="ml-2 text-gold-300">ECOWAS</span>}
          </div>
        )}

        <ul className={`mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold ${muted}`}>
          <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm" style={{ background: colors.member }} />{mode === 'etls' ? 'ECOWAS member' : 'AfCFTA signatory'}</li>
          <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm" style={{ background: colors.selected }} />Selected</li>
          <li className="flex items-center gap-2"><span className="h-0.5 w-5 rounded" style={{ background: colors.route }} />Trade corridor</li>
        </ul>
      </div>
    </div>
  )
}
