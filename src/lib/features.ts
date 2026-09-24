// Release-one feature switches. Payments are outside the brief's first release,
// so they stay hidden unless NEXT_PUBLIC_FEATURE_PAYMENTS=true is set at build time.
export const features = {
  payments: process.env.NEXT_PUBLIC_FEATURE_PAYMENTS === 'true'
} as const

export function featureDisabled() {
  return Response.json({ ok: false, error: 'This feature is not available in the current release.' }, { status: 404 })
}
