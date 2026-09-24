export const siteNav = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/opportunities', label: 'Opportunities' },
  { href: '/market-access', label: 'Market access' },
  { href: '/services', label: 'Services & pricing' },
  { href: '/about', label: 'About' }
] as const

export const footerNav = [
  {
    title: 'Platform',
    links: [
      { href: '/how-it-works', label: 'How it works' },
      { href: '/opportunities', label: 'Trade opportunities' },
      { href: '/market-access', label: 'Market access' },
      { href: '/services', label: 'Services & pricing' }
    ]
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Afrigo' },
      { href: '/about#ncdf-group', label: 'NCDF Group' },
      { href: '/contact', label: 'Contact us' }
    ]
  },
  {
    title: 'Get started',
    links: [
      { href: '/register', label: 'Register your business' },
      { href: '/sign-in', label: 'Sign in' },
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' }
    ]
  }
] as const
