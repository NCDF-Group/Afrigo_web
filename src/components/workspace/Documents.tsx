'use client'

import { useEffect, useRef, useState } from 'react'
import Icon from '@/components/ui/Icon'
import { FormAlert } from '@/components/ui/Field'
import { BusyLabel } from '@/components/ui/Busy'
import Skeleton from '@/components/ui/Skeleton'
import { button, input } from '@/components/ui/styles'
import { apiBlob, authErrorMessage } from '@/lib/auth'
import { DOCUMENT_KINDS, deleteDocument, listDocuments, uploadDocument, type BusinessDocument, type DocumentKind } from '@/lib/workspace'
import { useI18n } from '@/i18n/client'

const ACCEPTED = ['application/pdf', 'image/png', 'image/jpeg']
const MAX_BYTES = 4 * 1024 * 1024

const size = (bytes: number) => (bytes >= 1_000_000 ? `${(bytes / 1_000_000).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1000))} KB`)

const TONES: Record<BusinessDocument['status'], string> = {
  pending: 'bg-warning-soft text-warning',
  approved: 'bg-success-soft text-success',
  rejected: 'bg-danger-soft text-danger'
}

export default function Documents({ organisationId, isAdmin, onCount }: { organisationId: string; isAdmin: boolean; onCount: (count: number) => void }) {
  const { t } = useI18n()
  const copy = t.workspace.business.documents
  const [items, setItems] = useState<BusinessDocument[] | null>(null)
  const [kind, setKind] = useState<DocumentKind>('registration_certificate')
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState('')
  const [confirming, setConfirming] = useState('')
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const picker = useRef<HTMLInputElement>(null)

  useEffect(() => {
    listDocuments(organisationId)
      .then(setItems)
      .catch(cause => {
        setItems([])
        setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
      })
  }, [organisationId])

  useEffect(() => {
    if (items) onCount(items.length)
  }, [items])

  const choose = (next: File | undefined) => {
    setNotice('')
    setError('')
    if (!next) return setFile(null)
    if (!ACCEPTED.includes(next.type)) return setError(copy.wrongType)
    if (next.size > MAX_BYTES) return setError(copy.tooLarge)
    setFile(next)
  }

  const upload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!file) return
    setBusy('upload')
    setError('')
    setNotice('')
    try {
      const document = await uploadDocument(organisationId, kind, file)
      setItems(current => [document, ...(current ?? [])])
      setFile(null)
      if (picker.current) picker.current.value = ''
      setNotice(copy.uploaded)
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
    } finally {
      setBusy('')
    }
  }

  const view = async (document: BusinessDocument) => {
    const tab = window.open('', '_blank')
    setBusy(`view:${document.id}`)
    try {
      const blob = await apiBlob(`/organisations/${organisationId}/documents/${document.id}/file`)
      const url = URL.createObjectURL(new Blob([blob], { type: document.mimeType }))
      if (tab) tab.location.href = url
      else window.location.href = url
      setTimeout(() => URL.revokeObjectURL(url), 60_000)
    } catch (cause) {
      tab?.close()
      setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
    } finally {
      setBusy('')
    }
  }

  const remove = async (document: BusinessDocument) => {
    setBusy(`remove:${document.id}`)
    setError('')
    setNotice('')
    try {
      await deleteDocument(organisationId, document.id)
      setItems(current => (current ?? []).filter(item => item.id !== document.id))
      setNotice(copy.removed)
    } catch (cause) {
      setError(authErrorMessage(cause, t.errors.auth, t.errors.generic))
    } finally {
      setBusy('')
      setConfirming('')
    }
  }

  return (
    <section className="rounded-card border border-line bg-surface p-5 sm:p-6">
      <div className="flex gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-input bg-brand-50 text-brand-600 dark:text-accent-400">
          <Icon name="file" />
        </span>
        <div>
          <h2 className="font-display text-lg font-bold text-ink-900">{copy.title}</h2>
          <p className="mt-1 text-sm leading-6 text-ink-500">{copy.text}</p>
        </div>
      </div>

      <form onSubmit={upload} className="mt-5 grid gap-3 sm:grid-cols-[220px_1fr_auto] sm:items-end">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink-700">{copy.kindLabel}</span>
          <select value={kind} onChange={event => setKind(event.target.value as DocumentKind)} disabled={busy === 'upload'} className={`${input} appearance-none`}>
            {DOCUMENT_KINDS.map(item => (
              <option key={item} value={item}>
                {copy.kinds[item]}
              </option>
            ))}
          </select>
        </label>
        <label className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-input border border-dashed px-4 transition-colors ${file ? 'border-brand-600 bg-brand-50/60 dark:border-accent-500' : 'border-line-strong hover:border-brand-600 hover:bg-subtle dark:hover:border-accent-500'}`}>
          <Icon name="upload" className="h-5 w-5 shrink-0 text-brand-600 dark:text-accent-400" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[15px] font-semibold text-ink-900">{file ? file.name : copy.choose}</span>
            <span className="block text-xs text-ink-500">{file ? size(file.size) : copy.hint}</span>
          </span>
          <input ref={picker} type="file" accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg" className="sr-only" onChange={event => choose(event.target.files?.[0])} disabled={busy === 'upload'} />
        </label>
        <button type="submit" disabled={!file || busy === 'upload'} className={`${button.primary} w-full sm:w-auto`}>
          <BusyLabel busy={busy === 'upload'} label={copy.upload} busyLabel={copy.uploading} />
        </button>
      </form>

      <div className="mt-4 space-y-3">
        {notice && <FormAlert tone="success">{notice}</FormAlert>}
        {error && <FormAlert>{error}</FormAlert>}
      </div>

      <div className="mt-5">
        {!items ? (
          <div className="space-y-2">
            <Skeleton className="h-16 rounded-input" />
            <Skeleton className="h-16 rounded-input" />
          </div>
        ) : !items.length ? (
          <p className="rounded-input border border-line bg-subtle/60 px-4 py-5 text-center text-sm text-ink-500">{copy.empty}</p>
        ) : (
          <ul className="divide-y divide-line rounded-input border border-line">
            {items.map(document => {
              const removable = document.status !== 'approved' || isAdmin
              return (
                <li key={document.id} className="animate-rise px-4 py-3.5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-input bg-subtle text-ink-500">
                        <Icon name="file" className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[15px] font-semibold text-ink-900">{copy.kinds[document.kind]}</p>
                        <p className="truncate text-xs text-ink-500">
                          {document.fileName} · {size(document.sizeBytes)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${TONES[document.status]}`}>{copy.status[document.status]}</span>
                      <button type="button" onClick={() => void view(document)} disabled={busy === `view:${document.id}`} className={`${button.secondary} min-h-10 px-3 text-sm`}>
                        <BusyLabel busy={busy === `view:${document.id}`} label={<><Icon name="eye" className="h-4 w-4" />{copy.view}</>} />
                      </button>
                      {removable ? (
                        confirming === document.id ? (
                          <button type="button" onClick={() => void remove(document)} disabled={busy === `remove:${document.id}`} className={`${button.secondary} min-h-10 border-danger/40 px-3 text-sm text-danger hover:bg-danger-soft`}>
                            <BusyLabel busy={busy === `remove:${document.id}`} label={copy.removeConfirm} busyLabel={copy.removing} />
                          </button>
                        ) : (
                          <button type="button" onClick={() => setConfirming(document.id)} className="grid h-10 w-10 place-items-center rounded-input text-ink-400 transition-colors hover:bg-danger-soft hover:text-danger" aria-label={copy.remove}>
                            <Icon name="trash" className="h-4 w-4" />
                          </button>
                        )
                      ) : null}
                    </div>
                  </div>
                  {document.status === 'rejected' && document.reviewNote ? <p className="mt-2.5 rounded-input bg-danger-soft px-3 py-2 text-sm text-danger sm:ml-[52px]">{document.reviewNote}</p> : null}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
