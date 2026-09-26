'use client'
import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/i18n/client'

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''
const SCRIPT = 'https://accounts.google.com/gsi/client'

type Google = { accounts: { id: { initialize: (options: object) => void; renderButton: (element: HTMLElement, options: object) => void } } }

let loading: Promise<Google> | null = null

function loadGoogle() {
  loading ??= new Promise((resolve, reject) => {
    const existing = (window as unknown as { google?: Google }).google
    if (existing?.accounts) return resolve(existing)
    const script = document.createElement('script')
    script.src = SCRIPT
    script.async = true
    script.onload = () => resolve((window as unknown as { google: Google }).google)
    script.onerror = () => {
      loading = null
      reject(new Error('Google sign in could not load'))
    }
    document.head.appendChild(script)
  })
  return loading
}

export const googleEnabled = Boolean(CLIENT_ID)

export default function GoogleSignIn({ onCredential, mode = 'signin' }: { onCredential: (idToken: string) => void; mode?: 'signin' | 'signup' }) {
  const { locale } = useI18n()
  const target = useRef<HTMLDivElement>(null)
  const callback = useRef(onCredential)
  const [failed, setFailed] = useState(false)
  callback.current = onCredential

  useEffect(() => {
    if (!CLIENT_ID || !target.current) return
    let cancelled = false
    loadGoogle()
      .then(google => {
        if (cancelled || !target.current) return
        google.accounts.id.initialize({ client_id: CLIENT_ID, callback: (response: { credential: string }) => callback.current(response.credential), ux_mode: 'popup' })
        google.accounts.id.renderButton(target.current, { type: 'standard', theme: 'outline', size: 'large', shape: 'pill', text: mode === 'signup' ? 'signup_with' : 'continue_with', width: target.current.offsetWidth || 360, locale })
      })
      .catch(() => setFailed(true))
    return () => {
      cancelled = true
    }
  }, [mode, locale])

  if (!CLIENT_ID || failed) return null
  return <div ref={target} className="flex min-h-12 w-full justify-center" />
}
