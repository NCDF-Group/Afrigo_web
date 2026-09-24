import { rateLimit } from '@/lib/rateLimit'
import { filterOpportunities, getPublicOpportunities } from '@/lib/opportunities'

export async function GET(request: Request) {
  try {
    rateLimit(request, 'opportunities', 60)
    const params = new URL(request.url).searchParams
    const { items, available } = await getPublicOpportunities()
    const data = filterOpportunities(items, { q: params.get('q') || '', type: params.get('type') || '', location: params.get('location') || '' })
    return Response.json({ ok: true, available, data }, { headers: { 'cache-control': 'public, s-maxage=60, stale-while-revalidate=300' } })
  } catch (error) {
    if (error instanceof Response) return error
    return Response.json({ ok: false, error: 'Unable to load opportunities' }, { status: 500 })
  }
}
