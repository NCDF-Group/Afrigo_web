import './globals.css'
import Header from '../components/Header'

export const metadata = {
  title: 'Afrigo | African trade without the friction',
  description: 'Controlled trade infrastructure connecting verified Buyers, inventory-backed Sellers and accountable Exporters from RFQ to settlement.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-full bg-[var(--afrigo-bg)] text-[var(--afrigo-text)]">
        <Header />
        <main className="mx-auto w-full max-w-[1600px] px-3 py-5 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  )
}
