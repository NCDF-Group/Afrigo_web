// Labels live in the i18n dictionaries (nav.items / footer.groups); only routes are defined here.
export const siteNav = [
  { href: '/how-it-works', key: 'howItWorks' },
  { href: '/opportunities', key: 'opportunities' },
  { href: '/market-access', key: 'marketAccess' },
  { href: '/services', key: 'services' },
  { href: '/about', key: 'about' }
] as const

export const footerNav = [
  {
    key: 'platform',
    links: [
      { href: '/how-it-works', key: 'howItWorks' },
      { href: '/opportunities', key: 'opportunities' },
      { href: '/market-access', key: 'marketAccess' },
      { href: '/services', key: 'services' }
    ]
  },
  {
    key: 'company',
    links: [
      { href: '/about', key: 'about' },
      { href: '/about#ncdf-group', key: 'ncdf' },
      { href: '/contact', key: 'contact' }
    ]
  },
  {
    key: 'getStarted',
    links: [
      { href: '/register', key: 'register' },
      { href: '/sign-in', key: 'signIn' },
      { href: '/privacy', key: 'privacy' },
      { href: '/terms', key: 'terms' }
    ]
  }
] as const
