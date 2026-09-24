'use client'
import { useId, useState } from 'react'
import { input } from './styles'
import { useI18n } from '@/i18n/client'

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string; error?: string; action?: React.ReactNode }

export function Field({ label, hint, error, action, id, className, ...props }: FieldProps) {
  const autoId = useId()
  const fieldId = id || autoId
  const describedBy = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label htmlFor={fieldId} className="text-sm font-semibold text-ink-900">{label}</label>
        {action}
      </div>
      <input id={fieldId} aria-invalid={error ? true : undefined} aria-describedby={describedBy} className={input} {...props} />
      {error ? (
        <p id={`${fieldId}-error`} className="mt-1.5 text-sm text-danger">{error}</p>
      ) : hint ? (
        <p id={`${fieldId}-hint`} className="mt-1.5 text-sm text-ink-500">{hint}</p>
      ) : null}
    </div>
  )
}

export function PasswordField(props: Omit<FieldProps, 'type'>) {
  const { t } = useI18n()
  const [visible, setVisible] = useState(false)
  const autoId = useId()
  const fieldId = props.id || autoId
  const describedBy = props.error ? `${fieldId}-error` : props.hint ? `${fieldId}-hint` : undefined
  const { label, hint, error, action, className, ...rest } = props
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label htmlFor={fieldId} className="text-sm font-semibold text-ink-900">{label}</label>
        {action}
      </div>
      <div className="relative">
        <input id={fieldId} type={visible ? 'text' : 'password'} aria-invalid={error ? true : undefined} aria-describedby={describedBy} className={`${input} pr-20`} {...rest} />
        <button
          type="button"
          onClick={() => setVisible(value => !value)}
          aria-controls={fieldId}
          aria-pressed={visible}
          className="absolute inset-y-1 right-1 rounded-[9px] px-3 text-sm font-semibold text-ink-500 hover:bg-subtle hover:text-ink-900"
        >
          {visible ? t.auth.hide : t.auth.show}
        </button>
      </div>
      {error ? (
        <p id={`${fieldId}-error`} className="mt-1.5 text-sm text-danger">{error}</p>
      ) : hint ? (
        <p id={`${fieldId}-hint`} className="mt-1.5 text-sm text-ink-500">{hint}</p>
      ) : null}
    </div>
  )
}

export function FormAlert({ tone = 'danger', children }: { tone?: 'danger' | 'success' | 'info'; children: React.ReactNode }) {
  const styles = { danger: 'border-danger/20 bg-danger-soft text-danger', success: 'border-success/20 bg-success-soft text-success', info: 'border-info/20 bg-info-soft text-info' }
  return (
    <div role={tone === 'danger' ? 'alert' : 'status'} className={`rounded-input border px-4 py-3 text-sm font-medium ${styles[tone]}`}>
      {children}
    </div>
  )
}

export function OrDivider() {
  const { t } = useI18n()
  return (
    <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.08em] text-ink-400">
      <span className="h-px flex-1 bg-line" />{t.auth.or}<span className="h-px flex-1 bg-line" />
    </div>
  )
}
