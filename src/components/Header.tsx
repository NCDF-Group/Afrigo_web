'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth'

const MotionButton = motion.button as any

export default function Header() {
  const { user, isSignedIn, signOut } = useAuth()
  const router = useRouter()

  return (
    <header className="sticky top-0 z-30 bg-[var(--afrigo-surface)]/95 backdrop-blur-xl shadow-sm border-b border-[var(--afrigo-border)]">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 p-4">
        <Link href="/" className="flex items-center gap-3 text-xl font-semibold text-[var(--afrigo-primary-green)]">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-[var(--afrigo-primary-green-light)] text-2xl">A</span>
          Afrigo
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {isSignedIn ? (
            <>
              {(user?.operationalRole||user?.email?.toLowerCase()==='ukwun97@gmail.com')&&<Link href="/admin/operations" className="rounded-2xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5">Operations</Link>}
              <Link href={user?.role?'/dashboard':'/role-selection'} className="rounded-2xl bg-[var(--afrigo-primary-green)] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[var(--afrigo-primary-green-hover)]">{user?.role?'Dashboard':'Choose role'}</Link>
              <MotionButton
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Sign out ${user?.displayName||'account'}`}
                className="rounded-2xl border border-[var(--afrigo-border)] bg-white px-3 py-2 text-sm font-semibold text-[var(--afrigo-text)] transition hover:bg-[var(--afrigo-bg)] sm:px-4"
                onClick={() => {
                  void signOut().then(() => router.push('/'))
                }}
              >
                Sign out
              </MotionButton>
            </>
          ) : null}
        </div>
      </div>
    </header>
  )
}
