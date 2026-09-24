import Header from '@/components/Header'

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-app px-3 py-5 sm:px-6 lg:px-8">{children}</main>
    </>
  )
}
