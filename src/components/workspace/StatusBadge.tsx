'use client'
import Icon from '@/components/ui/Icon'
import { useI18n } from '@/i18n/client'
import type { Organisation } from '@/lib/workspace'

const TONE: Record<Organisation['verificationStatus'], string> = {
  unverified: 'bg-subtle text-ink-700 ring-line',
  pending: 'bg-warning-soft text-warning ring-warning/20',
  verified: 'bg-success-soft text-success ring-success/20',
  rejected: 'bg-danger-soft text-danger ring-danger/20'
}

const INVERSE_DOT: Record<Organisation['verificationStatus'], string> = {
  unverified: 'bg-white',
  pending: 'bg-amber-300',
  verified: 'bg-accent-300',
  rejected: 'bg-red-300'
}

export default function StatusBadge({ status, inverse = false }: { status: Organisation['verificationStatus']; inverse?: boolean }) {
  const { t } = useI18n()
  const tone = inverse ? 'bg-white/15 text-white ring-white/30 backdrop-blur' : TONE[status]
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${tone}`}>
      {status === 'verified' ? <Icon name="shield" className="h-3.5 w-3.5" /> : <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${inverse ? INVERSE_DOT[status] : 'bg-current'}`} />}
      {t.workspace.verification[status]}
    </span>
  )
}
