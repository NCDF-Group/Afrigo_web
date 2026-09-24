import { firebaseAdmin } from './firebaseAdmin'

export type OpportunityType = 'products' | 'requests' | 'supply'

export type Opportunity = {
  id: string
  type: OpportunityType
  title: string
  quantity: number | null
  unit: string
  location: string
  grade: string
  summary: string
  postedAt: string | null
}

const clip = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '')
const toIso = (value: any) => (value?.toDate ? value.toDate().toISOString() : typeof value === 'string' ? value : null)

// Only records a business has explicitly marked `visibility: 'public'` are ever returned,
// and only non-identifying fields — no owner, buyer name, price or budget.
export async function getPublicOpportunities(): Promise<{ items: Opportunity[]; available: boolean }> {
  try {
    const { db } = firebaseAdmin()
    const [lots, requests] = await Promise.all([
      db.collection('lots').where('visibility', '==', 'public').where('status', '==', 'active').limit(100).get(),
      db.collection('rfqs').where('visibility', '==', 'public').where('status', '==', 'Open').limit(100).get()
    ])
    const items: Opportunity[] = [
      ...lots.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          type: (data.listingType === 'supply' ? 'supply' : 'products') as OpportunityType,
          title: clip(data.title, 120),
          quantity: Number(data.quantity) || null,
          unit: clip(data.unit, 24) || 'kg',
          location: clip(data.origin, 80),
          grade: clip(data.grade, 80),
          summary: clip(data.description, 220),
          postedAt: toIso(data.createdAt)
        }
      }),
      ...requests.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          type: 'requests' as OpportunityType,
          title: clip(data.title, 120),
          quantity: Number(data.quantity) || null,
          unit: clip(data.unit, 24) || 'units',
          location: clip(data.destination_country, 80),
          grade: '',
          summary: clip(data.description, 220),
          postedAt: toIso(data.createdAt)
        }
      })
    ]
    items.sort((a, b) => (b.postedAt || '').localeCompare(a.postedAt || ''))
    return { items: items.filter(item => item.title), available: true }
  } catch (error) {
    console.error('Public opportunities unavailable', error instanceof Error ? error.message : error)
    return { items: [], available: false }
  }
}

export function filterOpportunities(items: Opportunity[], { q, type, location }: { q?: string; type?: string; location?: string }) {
  const query = (q || '').trim().toLowerCase()
  const place = (location || '').trim().toLowerCase()
  return items.filter(item =>
    (!type || type === 'all' || item.type === type) &&
    (!query || `${item.title} ${item.summary} ${item.grade}`.toLowerCase().includes(query)) &&
    (!place || item.location.toLowerCase().includes(place))
  )
}
