'use client'
import Icon, { type IconName } from '@/components/ui/Icon'
import type { BusinessType, Organisation } from '@/lib/workspace'
import { useI18n } from '@/i18n/client'

const KIND_ICON: Record<Organisation['kind'], IconName> = { business: 'building', service_partner: 'truck' }
const TYPE_ICON: Record<BusinessType, IconName> = { exporter: 'globe', importer: 'package', manufacturer: 'layers', cooperative: 'users', aggregator: 'target', trade_service_provider: 'briefcase' }

export const TRADING_TYPES: BusinessType[] = ['exporter', 'importer', 'manufacturer', 'cooperative', 'aggregator']

function Tick({ on }: { on: boolean }) {
  return (
    <span aria-hidden="true" className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors ${on ? 'border-brand-600 bg-brand-600 text-white dark:border-accent-500 dark:bg-accent-500 dark:text-brand-950' : 'border-line-strong bg-surface'}`}>
      {on && <Icon name="check" className="h-3 w-3" />}
    </span>
  )
}

export function KindPicker({ value, onChange }: { value: Organisation['kind'] | null; onChange: (value: Organisation['kind']) => void }) {
  const { t } = useI18n()
  return (
    <div role="radiogroup" className="grid gap-3 sm:grid-cols-2">
      {(['business', 'service_partner'] as const).map(kind => {
        const on = value === kind
        return (
          <button
            key={kind}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={t.workspace.kinds[kind].title}
            aria-description={t.workspace.kinds[kind].text}
            onClick={() => onChange(kind)}
            className={`flex flex-col gap-3 rounded-card border p-5 text-left transition-colors ${on ? 'border-brand-600 bg-brand-50 ring-4 ring-brand-600/10 dark:border-accent-500 dark:ring-accent-500/15' : 'border-line bg-surface hover:border-line-strong hover:bg-subtle'}`}
          >
            <span className="flex items-center justify-between">
              <span className={`grid h-11 w-11 place-items-center rounded-input ${on ? 'bg-brand-600 text-white dark:bg-accent-500 dark:text-brand-950' : 'bg-brand-50 text-brand-600 dark:text-accent-400'}`}><Icon name={KIND_ICON[kind]} /></span>
              <Tick on={on} />
            </span>
            <span className="font-display text-lg font-bold text-ink-900">{t.workspace.kinds[kind].title}</span>
            <span className="text-sm leading-6 text-ink-500">{t.workspace.kinds[kind].text}</span>
          </button>
        )
      })}
    </div>
  )
}

export function TypesPicker({ value, onChange }: { value: BusinessType[]; onChange: (value: BusinessType[]) => void }) {
  const { t } = useI18n()
  const toggle = (type: BusinessType) => onChange(value.includes(type) ? value.filter(item => item !== type) : [...value, type])
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {TRADING_TYPES.map(type => {
        const on = value.includes(type)
        return (
          <button
            key={type}
            type="button"
            role="checkbox"
            aria-checked={on}
            aria-label={t.workspace.types[type].title}
            aria-description={t.workspace.types[type].text}
            onClick={() => toggle(type)}
            className={`flex items-center gap-3 rounded-input border p-4 text-left transition-colors ${on ? 'border-brand-600 bg-brand-50 dark:border-accent-500' : 'border-line bg-surface hover:border-line-strong hover:bg-subtle'}`}
          >
            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-input ${on ? 'bg-brand-600 text-white dark:bg-accent-500 dark:text-brand-950' : 'bg-subtle text-brand-600 dark:text-accent-400'}`}><Icon name={TYPE_ICON[type]} className="h-[18px] w-[18px]" /></span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-bold text-ink-900">{t.workspace.types[type].title}</span>
              <span className="block text-[13px] leading-5 text-ink-500">{t.workspace.types[type].text}</span>
            </span>
            <Tick on={on} />
          </button>
        )
      })}
    </div>
  )
}
