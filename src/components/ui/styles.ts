const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-input px-5 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60'

export const button = {
  primary: `${base} bg-brand-600 text-white hover:bg-brand-700`,
  accent: `${base} bg-accent-500 text-brand-950 hover:bg-accent-400`,
  secondary: `${base} border border-line bg-white text-ink-900 hover:border-line-strong hover:bg-subtle`,
  ghostLight: `${base} border border-white/30 text-white hover:border-white/60 hover:bg-white/10`,
  link: 'font-semibold text-brand-600 underline-offset-4 hover:underline'
} as const

export const input =
  'block w-full min-h-12 rounded-input border border-line bg-white px-4 text-[15px] text-ink-900 placeholder:text-ink-400 transition-colors hover:border-line-strong focus:border-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-600/10 aria-[invalid=true]:border-danger'

export const card = {
  light: 'card-interactive rounded-card border border-line bg-white p-7',
  dark: 'card-interactive card-dark rounded-card border border-white/10 bg-white/5 p-6'
} as const
