'use client'
import { useState } from 'react'
import { Field, FormAlert } from '@/components/ui/Field'
import { button, input } from '@/components/ui/styles'
import { CONTACT_TOPICS, type ContactTopic } from '@/lib/contactTopics'

export default function ContactForm({ initialTopic }: { initialTopic: ContactTopic }) {
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
      if (!response.ok || !result.ok) throw new Error(result.error || 'We could not send your message. Please try again.')
      setStatus('sent')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'We could not send your message. Please try again.')
      setStatus('idle')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-card border border-line bg-white p-8 text-center shadow-sm">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success-soft text-success">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
        </span>
        <h2 className="mt-5 font-display text-2xl font-bold text-ink-900">Message received</h2>
        <p className="mx-auto mt-2 max-w-sm text-[15px] leading-6 text-ink-500">Thank you for getting in touch. A member of the Afrigo team will reply to your email.</p>
        <button type="button" onClick={() => setStatus('idle')} className={`${button.secondary} mt-6`}>Send another message</button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-5 rounded-card border border-line bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" autoComplete="name" required maxLength={120} />
        <Field label="Work email" name="email" type="email" autoComplete="email" required maxLength={200} />
        <Field label="Company" name="company" autoComplete="organization" maxLength={160} hint="Optional" />
        <Field label="Country" name="country" autoComplete="country-name" maxLength={80} hint="Optional" />
      </div>
      <div>
        <label htmlFor="contact-topic" className="mb-1.5 block text-sm font-semibold text-ink-900">What can we help with?</label>
        <select id="contact-topic" name="topic" defaultValue={initialTopic} className={input}>
          {CONTACT_TOPICS.map(topic => <option key={topic.value} value={topic.value}>{topic.label}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-ink-900">Message</label>
        <textarea id="contact-message" name="message" required minLength={10} maxLength={4000} rows={6} className={`${input} py-3`} placeholder="Tell us about your business and what you trade." />
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {error && <FormAlert>{error}</FormAlert>}
      <button type="submit" disabled={status === 'sending'} className={`${button.primary} min-h-12 w-full text-[15px] sm:w-auto sm:px-8`}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
