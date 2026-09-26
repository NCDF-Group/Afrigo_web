'use client'
import Icon, { type IconName } from '@/components/ui/Icon'
import { useTheme, type ThemePreference } from '@/lib/theme'
import { useI18n } from '@/i18n/client'

const OPTIONS: { value: ThemePreference; icon: IconName }[] = [
  { value: 'light', icon: 'sun' },
  { value: 'dark', icon: 'moon' },
  { value: 'system', icon: 'monitor' }
]

export default function ThemeSwitcher({ withLabels = false, className = '' }: { withLabels?: boolean; className?: string }) {
  const { t } = useI18n()
  const copy = t.workspace.shell.theme
  const { preference, choose } = useTheme()
  return (
    <div role="radiogroup" aria-label={copy.label} className={`inline-flex rounded-input border border-line bg-subtle p-1 ${className}`}>
      {OPTIONS.map(option => {
        const on = preference === option.value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={copy[option.value]}
            title={copy[option.value]}
            onClick={() => choose(option.value)}
            className={`flex min-h-9 flex-1 items-center justify-center gap-2 rounded-[9px] px-2.5 text-sm font-semibold transition-colors ${on ? 'bg-surface text-ink-900 shadow-sm ring-1 ring-line' : 'text-ink-500 hover:text-ink-900'}`}
          >
            <Icon name={option.icon} className="h-4 w-4" />
            {withLabels && <span>{copy[option.value]}</span>}
          </button>
        )
      })}
    </div>
  )
}
