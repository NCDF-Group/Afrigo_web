'use client'
import { useCallback, useEffect, useState } from 'react'
import { api, reloadAccount, useAuth, type Membership } from './auth'

export const BUSINESS_TYPES = ['exporter', 'importer', 'manufacturer', 'cooperative', 'aggregator', 'trade_service_provider'] as const

export type BusinessType = (typeof BUSINESS_TYPES)[number]

export type Organisation = {
  id: string
  kind: 'business' | 'service_partner'
  name: string
  tradingName: string | null
  types: BusinessType[]
  registrationNumber: string | null
  taxId: string | null
  country: string
  city: string | null
  address: string | null
  description: string | null
  website: string | null
  email: string | null
  phone: string | null
  logoUrl: string | null
  verificationStatus: 'unverified' | 'pending' | 'verified' | 'rejected'
  verificationNote: string | null
  verifiedAt: string | null
  status: 'active' | 'suspended'
}

export type OrganisationInput = Partial<Omit<Organisation, 'id' | 'verificationStatus' | 'verificationNote' | 'verifiedAt' | 'status'>>

export type Member = { userId: string; email: string; firstName: string; lastName: string; avatarUrl: string | null; role: 'administrator' | 'member'; joinedAt: string }

export type Invitation = { id: string; email: string; role: 'administrator' | 'member'; expiresAt: string; createdAt: string }

export type Country = { iso2: string; name: string; region: string; currency: string; ecowas: boolean; afcfta: boolean; enabled: boolean; pilot: boolean }

const SELECTED = 'afrigo:organisation'

export function readSelected() {
  try {
    return localStorage.getItem(SELECTED)
  } catch {
    return null
  }
}

export function rememberSelected(id: string) {
  try {
    localStorage.setItem(SELECTED, id)
  } catch {}
}

export function useCurrentMembership() {
  const { organisations } = useAuth()
  const [selected, setSelected] = useState<string | null>(null)
  useEffect(() => setSelected(readSelected()), [])
  const membership: Membership | undefined = organisations.find(item => item.organisationId === selected) ?? organisations[0]
  const select = (id: string) => {
    rememberSelected(id)
    setSelected(id)
  }
  return { membership, organisations, select }
}

export function useResource<T>(path: string | null) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<unknown>(null)
  const load = useCallback(async () => {
    if (!path) return
    try {
      setData(await api<T>(path))
      setError(null)
    } catch (cause) {
      setError(cause)
    }
  }, [path])
  useEffect(() => {
    setData(null)
    void load()
  }, [load])
  return { data, error, reload: load, setData }
}

export const countriesOpen = () => api<{ items: Country[] }>('/config/countries?enabled=true').then(result => result.items)

export async function createOrganisation(input: OrganisationInput & { name: string; country: string; types: BusinessType[]; kind: Organisation['kind'] }) {
  const result = await api<{ organisation: Organisation }>('/organisations', { method: 'POST', body: input })
  rememberSelected(result.organisation.id)
  await reloadAccount()
  return result.organisation
}

export async function updateOrganisation(id: string, input: OrganisationInput) {
  const result = await api<{ organisation: Organisation }>(`/organisations/${id}`, { method: 'PATCH', body: input })
  await reloadAccount()
  return result.organisation
}

export async function submitVerification(id: string) {
  const result = await api<{ organisation: Organisation }>(`/organisations/${id}/verification`, { method: 'POST' })
  await reloadAccount()
  return result.organisation
}

export const inviteColleague = (id: string, email: string, role: Member['role']) => api(`/organisations/${id}/invitations`, { method: 'POST', body: { email, role } })

export const cancelInvitation = (id: string, invitationId: string) => api(`/organisations/${id}/invitations/${invitationId}`, { method: 'DELETE' })

export const changeMemberRole = (id: string, userId: string, role: Member['role']) => api(`/organisations/${id}/members/${userId}`, { method: 'PATCH', body: { role } })

export const removeMember = (id: string, userId: string) => api(`/organisations/${id}/members/${userId}`, { method: 'DELETE' }).then(() => reloadAccount())

export function clean<T extends Record<string, unknown>>(input: T) {
  return Object.fromEntries(Object.entries(input).map(([key, value]) => [key, typeof value === 'string' ? value.trim() || null : value])) as T
}
