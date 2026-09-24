import { firebaseAdmin } from '@/lib/firebaseAdmin'
import { rateLimit } from '@/lib/rateLimit'
import { sendTransactionalEmail } from '@/lib/transactionalEmail'
import { CONTACT_TOPICS, isContactTopic } from '@/lib/contactTopics'

const text = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '')
const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function POST(request: Request) {
  try {
    rateLimit(request, 'contact', 5, 10 * 60_000)
    const input = await request.json().catch(() => ({}))

    // Honeypot: real users never see or fill this field.
    if (text(input.website, 200)) return Response.json({ ok: true })

    const name = text(input.name, 120), email = text(input.email, 200).toLowerCase(), company = text(input.company, 160), country = text(input.country, 80), message = text(input.message, 4000)
    const topic = isContactTopic(input.topic) ? input.topic : 'general'
    if (!name || !EMAIL.test(email) || message.length < 10) {
      return Response.json({ ok: false, error: 'Enter your name, a valid email and a message of at least 10 characters.' }, { status: 400 })
    }

    const { db } = firebaseAdmin()
    const record = { name, email, company, country, topic, message, status: 'new', createdAt: new Date(), source: 'website' }
    const ref = await db.collection('contactSubmissions').add(record)

    const inbox = process.env.CONTACT_INBOX_EMAIL
    if (inbox) {
      const topicLabel = CONTACT_TOPICS.find(item => item.value === topic)?.label || topic
      const rows = [['Name', name], ['Email', email], ['Company', company || '—'], ['Country', country || '—'], ['Topic', topicLabel]]
      const html = `<h2>New Afrigo contact enquiry</h2><table>${rows.map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${escape(value)}</td></tr>`).join('')}</table><p style="white-space:pre-wrap">${escape(message)}</p><p>Reference: ${ref.id}</p>`
      await sendTransactionalEmail([inbox], `Contact: ${topicLabel} — ${name}`, html).catch(error => console.error('Contact email failed', error))
    }

    return Response.json({ ok: true, reference: ref.id })
  } catch (error) {
    if (error instanceof Response) return error
    console.error('Contact submission failed', error)
    return Response.json({ ok: false, error: 'We could not send your message. Please try again or email us directly.' }, { status: 500 })
  }
}
