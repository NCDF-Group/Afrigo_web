'use client'
import { useState } from 'react'
import { Field, FormAlert } from '@/components/ui/Field'
import { button, input } from '@/components/ui/styles'
import { CONTACT_TOPICS, type ContactTopic } from '@/lib/contactTopics'
import { useI18n } from '@/i18n/client'

export default function ContactForm({ initialTopic }: { initialTopic: ContactTopic }) {
  const copy = useI18n().t.contactForm
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')
    setError('')
    const form = new FormData(event.currentTarget)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(form.entries()))
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.ok) {
        // Messages come from the dictionary so they match the page language.
        setError(response.status === 400 ? copy.errors.invalid : response.status === 429 ? copy.errors.tooMany : copy.errors.failed)
        setStatus('idle')
        return
      }
      setStatus('sent')
    } catch {
      setError(copy.errors.failed)
      setStatus('idle')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-card border border-line bg-white p-8 text-center shadow-sm">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success-soft text-success">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
        </span>
        <h2 className="mt-5 font-display text-2xl font-bold text-ink-900">{copy.sentTitle}</h2>
        <p className="mx-auto mt-2 max-w-sm text-[15px] leading-6 text-ink-500">{copy.sentText}</p>
        <button type="button" onClick={() => setStatus('idle')} className={`${button.secondary} mt-6`}>{copy.sendAnother}</button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-5 rounded-card border border-line bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={copy.name} name="name" autoComplete="name" required maxLength={120} />
        <Field label={copy.email} name="email" type="email" autoComplete="email" required maxLength={200} />
        <Field label={copy.company} name="company" autoComplete="organization" maxLength={160} hint={copy.optional} />
        <Field label={copy.country} name="country" autoComplete="country-name" maxLength={80} hint={copy.optional} />
      </div>
      <div>
        <label htmlFor="contact-topic" className="mb-1.5 block text-sm font-semibold text-ink-900">{copy.topic}</label>
        <select id="contact-topic" name="topic" defaultValue={initialTopic} className={input}>
          {CONTACT_TOPICS.map(topic => <option key={topic.value} value={topic.value}>{copy.topics[topic.value]}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-ink-900">{copy.message}</label>
        <textarea id="contact-message" name="message" required minLength={10} maxLength={4000} rows={6} className={`${input} py-3`} placeholder={copy.messagePlaceholder} />
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {error && <FormAlert>{error}</FormAlert>}
      <button type="submit" disabled={status === 'sending'} className={`${button.primary} min-h-12 w-full text-[15px] sm:w-auto sm:px-8`}>
        {status === 'sending' ? copy.sending : copy.send}
      </button>
    </form>
  )
}
