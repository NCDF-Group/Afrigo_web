'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/components/brand/Logo'
import { button } from '@/components/ui/styles'
import { useAuth } from '@/lib/auth'
import { workspaceHref } from '@/lib/authRoutes'

// Interim workspace header — replaced by the business-app shell (sidebar + bottom tabs).
export default function Header() {
  const { user, isSignedIn, signOut } = useAuth()
  const router = useRouter()

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-app items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Logo href={isSignedIn ? workspaceHref(user) : '/'} />

        {isSignedIn ? (
          <div className="flex items-center gap-2">
            {(user?.operationalRole || user?.email?.toLowerCase() === 'ukwun97@gmail.com') && (
              <Link href="/admin/operations" className={`${button.secondary} hidden sm:inline-flex`}>Operations</Link>
            )}
            <Link href={workspaceHref(user)} className={button.primary}>{user?.role ? 'Dashboard' : 'Choose role'}</Link>
            <button
              type="button"
              aria-label={`Sign out ${user?.displayName || 'account'}`}
              className={button.secondary}
              onClick={() => void signOut().then(() => router.push('/'))}
            >
              Sign out
            </button>
          </div>
        ) : null}
      </div>
    </header>
  )
}
