import Icon, { type IconName } from '@/components/ui/Icon'

export function Panel({ icon, title, text, action, children, tone = 'default', delay = 0 }: { icon: IconName; title: string; text?: string; action?: React.ReactNode; children?: React.ReactNode; tone?: 'default' | 'danger'; delay?: number }) {
  return (
    <section style={{ animationDelay: `${delay * 70}ms` }} className={`animate-rise rounded-card border bg-surface p-5 sm:p-6 ${tone === 'danger' ? 'border-danger/30' : 'border-line'}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-4">
          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-input ${tone === 'danger' ? 'bg-danger-soft text-danger' : 'bg-brand-50 text-brand-600 dark:text-accent-400'}`}>
            <Icon name={icon} />
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-lg font-bold text-ink-900">{title}</h2>
            {text && <p className="mt-1 text-sm leading-6 text-ink-500">{text}</p>}
          </div>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children && <div className="mt-5">{children}</div>}
    </section>
  )
}

export function DetailList({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <dl className="divide-y divide-line rounded-input border border-line">
      {rows.map(([label, value]) => (
        <div key={label} className="grid gap-1 px-4 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
          <dt className="text-sm font-semibold text-ink-500">{label}</dt>
          <dd className="min-w-0 break-words text-[15px] text-ink-900">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
