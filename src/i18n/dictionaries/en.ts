// English (default) copy for the public site, auth screens and shared components.
// fr.ts must match this shape exactly — TypeScript enforces it through the Dictionary type.
export const en = {
  meta: {
    siteTitle: 'Afrigo | Africa-wide trade & market access platform',
    description: 'Afrigo helps African businesses find markets, connect with trading partners and manage cross-border trade — from registration to a tracked trade case.',
    pages: {
      howItWorks: { title: 'How it works', description: 'Register, publish or search, enquire, open a trade case and track progress — the Afrigo trade journey.' },
      opportunities: { title: 'Trade opportunities', description: 'Search products, buyer requests and supply opportunities from African businesses.' },
      marketAccess: { title: 'Market access', description: 'Traceable ETLS and AfCFTA guidance: requirements, official references and preparation tasks for trade across Africa.' },
      services: { title: 'Services & pricing', description: 'Logistics, inspection and trade-readiness support from vetted partners, requested directly from your trade case.' },
      about: { title: 'About', description: 'Afrigo is an Africa-wide trade and market access platform developed by NCDF Group.' },
      contact: { title: 'Contact us', description: 'Talk to the Afrigo team about registering your business, market access, partnerships or support.' },
      privacy: { title: 'Privacy policy', description: 'How Afrigo collects, uses and protects business and personal information.' },
      terms: { title: 'Terms of use', description: 'The terms for using the Afrigo trade and market access platform.' },
      signIn: { title: 'Sign in', description: 'Sign in to Afrigo.' },
      register: { title: 'Register your business', description: 'Create your Afrigo account.' },
      forgotPassword: { title: 'Reset your password', description: 'Reset your Afrigo password.' }
    }
  },

  common: {
    skipToContent: 'Skip to content',
    backToTop: 'Back to top',
    registerYourBusiness: 'Register your business',
    exploreOpportunities: 'Explore opportunities',
    signIn: 'Sign in',
    contactUs: 'Contact us',
    language: 'Language',
    english: 'English',
    french: 'Français'
  },

  nav: {
    main: 'Main',
    mobile: 'Mobile',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    items: { howItWorks: 'How it works', opportunities: 'Opportunities', marketAccess: 'Market access', services: 'Services & pricing', about: 'About' },
    contact: 'Contact us',
    signIn: 'Sign in',
    register: 'Register your business',
    openDashboard: 'Open dashboard'
  },

  footer: {
    blurb: 'Find opportunities. Prepare for trade. Manage execution. Built for exporters, importers, manufacturers, cooperatives, aggregators and trade-service providers.',
    groups: {
      platform: { title: 'Platform', links: { howItWorks: 'How it works', opportunities: 'Trade opportunities', marketAccess: 'Market access', services: 'Services & pricing' } },
      company: { title: 'Company', links: { about: 'About Afrigo', ncdf: 'NCDF Group', contact: 'Contact us' } },
      getStarted: { title: 'Get started', links: { register: 'Register your business', signIn: 'Sign in', privacy: 'Privacy', terms: 'Terms' } }
    },
    rights: '© {year} NCDF Group. Afrigo — all rights reserved.'
  },

  cta: {
    title: 'Ready to reach new African markets?',
    text: 'Register your business in minutes, or talk to our team about your trade.'
  },

  home: {
    hero: {
      overline: 'Africa-wide trade & market access',
      lead: 'The easier way to',
      phrases: ['find new markets.', 'prepare for trade.', 'manage execution.', 'grow across Africa.'],
      srTitle: 'The easier way to find new markets, prepare for trade and manage execution across Africa.',
      text: 'Afrigo helps African businesses find markets, connect with trading partners and manage cross-border trade — from first enquiry to a tracked trade case.',
      note: 'Launching with selected West African markets, with ETLS and AfCFTA guidance built in.'
    },
    builtFor: 'Built for',
    audiences: ['Exporters', 'Importers', 'Manufacturers', 'Cooperatives', 'Aggregators', 'Trade-service providers'],
    how: {
      overline: 'How it works',
      title: 'One connected trade journey',
      text: 'Everything from your first listing to delivery happens on one platform, with each step building on the last.',
      steps: [
        { title: 'Register', text: 'Create your business profile, upload company documents and invite colleagues.' },
        { title: 'Publish or search', text: 'List products and buyer requests, or search supply and demand across supported markets.' },
        { title: 'Enquire', text: 'Contact businesses directly, ask questions and exchange quotations.' },
        { title: 'Open a trade case', text: 'Move an agreed enquiry into one workspace for documents, tasks and partners.' },
        { title: 'Track progress', text: 'Follow shipment milestones and outstanding requirements until delivery.' }
      ],
      more: 'See how it works in detail'
    },
    opportunities: {
      overline: 'Trade opportunities',
      title: 'Search supply and demand across Africa',
      types: [
        { title: 'Products', text: 'Goods offered by verified African businesses, with specifications, quantities, locations and images.', browse: 'Browse products' },
        { title: 'Buyer requests', text: 'Purchasing requirements posted by businesses looking for reliable supply.', browse: 'Browse buyer requests' },
        { title: 'Supply opportunities', text: 'Aggregated and seasonal supply from cooperatives, aggregators and manufacturers.', browse: 'Browse supply opportunities' }
      ]
    },
    market: {
      overline: 'Market access',
      title: 'Know the requirements before you ship',
      text: 'Launching in selected West African markets and built for the whole continent. Explore where ETLS and AfCFTA may apply, then check the detailed requirements.',
      disclaimer: 'Guidance only. Afrigo does not issue official certificates or guarantee duty-free access — final decisions rest with the relevant authorities.'
    },
    workspace: {
      overline: 'Trade workspace',
      title: 'Keep execution in one place',
      text: 'When an enquiry becomes a deal, open a trade case. Your team, your trading partner and any assigned service partner work from the same record.',
      items: ['Quotations, documents and tasks in one trade case', 'Shipment milestones and outstanding requirements', 'Logistics, inspection and trade-readiness requests', 'Access for colleagues and assigned service partners only']
    },
    services: {
      overline: 'Services',
      title: 'Support from trusted partners',
      text: 'Request help directly from a trade case and track it alongside your other tasks.',
      cta: 'View services & pricing',
      items: [
        { title: 'Logistics', text: 'Request freight, haulage and cross-border movement support from vetted partners.' },
        { title: 'Inspection', text: 'Arrange quality, quantity and pre-shipment inspection for your goods.' },
        { title: 'Trade readiness', text: 'Get help preparing documents, origin evidence and market requirements.' }
      ]
    }
  },

  howItWorks: {
    hero: { overline: 'How it works', title: 'From registration to a tracked trade case', text: 'Afrigo brings every stage of cross-border trade into one connected journey, so nothing gets lost between the first enquiry and delivery.' },
    journey: { overline: 'The journey', title: 'Five steps, one platform' },
    steps: [
      { title: 'Register your business', text: 'Create an account with your work email or Google, then set up your business profile.', points: ['Business details, sector and the markets you trade in', 'Company documents for verification', 'Invite colleagues and choose who administers the account'] },
      { title: 'Publish or search', text: 'Tell the market what you sell or what you need — or find it yourself.', points: ['List products with specifications, quantities, locations and images', 'Post buyer requests with your purchasing requirements', 'Search products, buyer requests and supply opportunities'] },
      { title: 'Enquire', text: 'Contact businesses directly and work out the details.', points: ['Send and answer enquiries from one inbox', 'Request, send and compare quotations', 'Keep every message attached to its enquiry'] },
      { title: 'Open a trade case', text: 'When both sides agree, turn the enquiry into a trade case — one workspace for the whole deal.', points: ['Accepted quotation, documents and tasks in one place', 'Add colleagues and assigned service partners', 'Request logistics, inspection and trade-readiness support'] },
      { title: 'Track progress', text: 'See exactly where the trade stands and what is still outstanding.', points: ['Shipment milestones from pickup to delivery', 'Outstanding requirements and who owns them', 'Notifications and a dashboard of active trade cases'] }
    ],
    both: {
      overline: 'Buy, sell or both',
      title: 'One business, every side of the trade',
      text: 'Many African businesses buy inputs and sell finished goods. On Afrigo the same account can publish products, post buyer requests and run trade cases on either side.',
      selling: { title: 'Selling', text: 'Publish products and supply, answer buyer requests and send quotations.' },
      buying: { title: 'Buying', text: 'Post purchasing requirements, compare quotations and choose suppliers.' }
    },
    access: {
      overline: 'Access',
      title: 'The right access for every user',
      text: 'Private records require explicit access. Each person only sees what their role and assignments allow.',
      roles: [
        { title: 'Business administrator', text: 'Manages the organisation, its colleagues and its business records.' },
        { title: 'Business team member', text: 'Works on the enquiries, documents and trade cases they are authorised for.' },
        { title: 'Service partner', text: 'Views and updates only the service requests assigned to them.' },
        { title: 'Afrigo administrator', text: 'Reviews businesses and content, manages guidance and oversees operations.' }
      ]
    },
    faq: {
      overline: 'Questions',
      title: 'Frequently asked',
      items: [
        { q: 'Who can register?', a: 'Exporters, importers, manufacturers, cooperatives, aggregators and trade-service providers operating in supported markets. Businesses are reviewed before their listings go live.' },
        { q: 'Can my business both buy and sell?', a: 'Yes. A business can publish products and post buyer requests from the same account — there is no need to pick one role.' },
        { q: 'Which countries are supported?', a: 'Afrigo launches with selected West African markets and is designed to add wider African coverage. See Market access for the current list.' },
        { q: 'Does Afrigo issue certificates of origin?', a: 'No. Afrigo provides traceable guidance and helps you prepare evidence, but official certificates are issued by the relevant authorities and duty-free access is never guaranteed.' },
        { q: 'Who can see my records?', a: 'Private records are only visible to people you explicitly give access to: your colleagues, your trading partner on a trade case, and service partners assigned to a request.' },
        { q: 'What does it cost?', a: 'See Services & pricing for current packages and how partner services are quoted.' }
      ],
      still: 'Still have a question?',
      contactLink: 'Contact our team'
    }
  },

  opportunities: {
    hero: { overline: 'Trade opportunities', title: 'Find products, buyers and supply across Africa', text: 'Browse what African businesses are offering and looking for. Register to publish your own listings and contact businesses directly.' },
    form: { search: 'Search', searchPlaceholder: 'Product, e.g. cashew, sesame, shea', location: 'Country or location', locationPlaceholder: 'Country or city', type: 'Opportunity type', submit: 'Search' },
    typesNav: 'Opportunity types',
    types: { all: 'All opportunities', products: 'Products', requests: 'Buyer requests', supply: 'Supply opportunities' },
    typeLabel: { products: 'Product', requests: 'Buyer request', supply: 'Supply' },
    countOne: '{count} opportunity',
    countOther: '{count} opportunities',
    quantity: 'Quantity',
    destination: 'Destination',
    origin: 'Origin',
    grade: 'Grade',
    signInToEnquire: 'Sign in to enquire',
    empty: {
      unavailableTitle: 'Opportunities are temporarily unavailable',
      unavailableText: 'We could not load listings right now. Please try again in a few minutes.',
      noMatchTitle: 'No opportunities match your search',
      noMatchText: 'Try a different product or country, or clear your filters.',
      comingTitle: 'Public opportunities are coming soon',
      comingText: 'Businesses in our pilot markets are publishing their first products and buyer requests. Register to be among the first to list.',
      clear: 'Clear filters',
      register: 'Register to publish'
    },
    cta: { title: 'Have something to sell or source?', text: 'Publish products and buyer requests so the right businesses can find you.' }
  },

  marketAccess: {
    hero: { overline: 'Market access', title: 'Know what it takes to trade across borders', text: 'Clear, referenced guidance for ETLS and AfCFTA — so you can prepare the right evidence before goods move.', register: 'Register to use guidance', ask: 'Ask a question' },
    how: {
      overline: 'How guidance works',
      title: 'Guidance you can trace back to the source',
      steps: [
        { title: 'Tell us the trade', text: 'Choose the product, the country of origin and the destination country.' },
        { title: 'Get traceable guidance', text: 'See the applicable ETLS or AfCFTA requirements, each with its official reference and the date it was last reviewed.' },
        { title: 'Prepare and escalate', text: 'Upload origin evidence, track preparation tasks and escalate unresolved questions to the Afrigo team.' }
      ]
    },
    schemes: {
      overline: 'Trade schemes',
      title: 'Separate workflows for ETLS and AfCFTA',
      text: 'The two schemes have different eligibility, evidence and approval steps, so Afrigo keeps them apart.',
      officialSource: 'Official source: {label}',
      items: [
        {
          name: 'ETLS',
          full: 'ECOWAS Trade Liberalisation Scheme',
          text: 'The scheme for duty-free movement of qualifying goods between ECOWAS member states.',
          points: ['Covers unprocessed goods, livestock and traditional handicrafts', 'Industrial products need the product and manufacturer to be approved under the scheme', 'Qualifying industrial goods travel with an ECOWAS certificate of origin', 'Approval runs through national authorities in each member state'],
          sourceLabel: 'ECOWAS ETLS portal'
        },
        {
          name: 'AfCFTA',
          full: 'African Continental Free Trade Area',
          text: 'The continental agreement for preferential trade between State Parties that are trading under it.',
          points: ['Goods must meet AfCFTA rules of origin — wholly obtained or sufficiently transformed', 'Product-specific rules decide what counts as sufficient transformation', 'Preferences depend on both countries’ published tariff schedules', 'Claims are supported by an AfCFTA certificate of origin from a competent authority'],
          sourceLabel: 'AfCFTA Secretariat'
        }
      ]
    },
    markets: { overline: 'Supported markets', title: 'Starting in West Africa, built for the continent', text: 'The pilot covers selected West African markets. Countries, currencies, products and trade requirements are configurable, so new markets can be added as demand grows.' },
    notDo: {
      title: 'What Afrigo does not do',
      items: ['Afrigo does not issue certificates of origin or any other official certificate.', 'Afrigo never promises or guarantees duty-free access.', 'Eligibility and duties are decided by customs and the competent authorities in each country.'],
      note: 'Guidance shows its official reference and last-review date. Always confirm requirements with the relevant authority before shipping.'
    },
    askMarket: 'Ask about your market',
    cta: { title: 'Prepare your next shipment with confidence', text: 'Register to check requirements, upload origin evidence and track preparation tasks.' }
  },

  services: {
    hero: { overline: 'Services & pricing', title: 'Support for every stage of the trade', text: 'Request logistics, inspection and trade-readiness help from vetted partners — right from the trade case you’re already working in.', partner: 'Become a service partner' },
    what: {
      overline: 'Services',
      title: 'What you can request',
      items: [
        { title: 'Logistics', text: 'Move goods across borders with vetted logistics partners.', includes: ['Freight and haulage quotes', 'Cross-border movement support', 'Pickup and delivery milestones in your trade case'] },
        { title: 'Inspection', text: 'Independent checks that give both sides confidence.', includes: ['Quality and grade inspection', 'Quantity and packaging checks', 'Pre-shipment inspection reports attached to the case'] },
        { title: 'Trade readiness', text: 'Get your business and documents ready for a new market.', includes: ['Document preparation support', 'Origin evidence for ETLS and AfCFTA', 'Market requirement checks before you ship'] }
      ]
    },
    flow: {
      overline: 'How it works',
      title: 'Requesting a service',
      text: 'Partners only see the trade cases and requests they are assigned to.',
      steps: [
        { title: 'Request', text: 'Ask for a service from inside a trade case.' },
        { title: 'Quote', text: 'An assigned partner reviews the case and sends a quote.' },
        { title: 'Accept', text: 'Nothing starts until you accept the quote.' },
        { title: 'Track', text: 'Follow progress and reports alongside your other tasks.' }
      ]
    },
    pricing: {
      overline: 'Pricing',
      title: 'Simple ways to get started',
      text: 'Approved packages for the first release are shared with pilot participants. Partner services are always quoted before you commit.',
      nowOpen: 'Now open',
      plans: [
        { title: 'Pilot access', text: 'For businesses in our pilot markets joining during the first release.', points: ['Business profile and team access', 'Publish products and buyer requests', 'Enquiries, quotations and trade cases', 'ETLS and AfCFTA guidance'], cta: 'Register your business' },
        { title: 'Partner services', text: 'Logistics, inspection and readiness support, priced for each request.', points: ['Quoted per request by the assigned partner', 'You accept before any work begins', 'Reports and milestones in the trade case'], cta: 'See how services work' },
        { title: 'Associations & groups', text: 'For cooperatives, associations and trade bodies onboarding many members.', points: ['Onboarding support for member businesses', 'Guidance tailored to your sector', 'A dedicated contact at Afrigo'], cta: 'Talk to us' }
      ]
    },
    partners: { overline: 'Service partners', title: 'Offer your services on Afrigo', text: 'Logistics companies, inspection agencies and trade advisers can join as service partners and receive requests from active trade cases.', apply: 'Apply as a partner' }
  },

  about: {
    hero: { overline: 'About Afrigo', title: 'Making trade preparation and execution easy', text: 'Afrigo is an Africa-wide trade and market access platform that helps businesses find markets, connect with trading partners and manage cross-border trade.' },
    what: {
      overline: 'What we do',
      title: 'One platform for the whole trade journey',
      text: 'Cross-border trade in Africa often depends on scattered contacts, unclear requirements and paperwork spread across chats and inboxes. Afrigo brings it together.',
      pillars: [
        { title: 'Find opportunities', text: 'Help businesses discover markets, buyers and supply they would not otherwise reach.' },
        { title: 'Prepare for trade', text: 'Make requirements, documents and evidence clear before goods move.' },
        { title: 'Manage execution', text: 'Keep quotations, tasks, partners and shipments in one shared trade case.' }
      ]
    },
    principles: {
      overline: 'Principles',
      title: 'How we build',
      items: [
        { title: 'Traceable guidance', text: 'Every requirement shows its official reference and last-review date. We never promise what only authorities can grant.' },
        { title: 'Private by default', text: 'Business records are only visible to the people and partners explicitly given access.' },
        { title: 'Built for low data', text: 'Mobile-first pages that load quickly on the connections our users actually have.' },
        { title: 'Africa-wide by design', text: 'Countries, currencies, products and requirements are configurable, so the platform grows market by market.' }
      ]
    },
    ncdf: {
      title: 'Developed by NCDF Group',
      text: 'Afrigo is developed and operated by NCDF Group. The platform starts with selected West African markets and is designed for wider African coverage as pilot partners, markets and integrations are added.',
      partner: 'Partner with us',
      roadmap: [
        { title: 'Confirm & design', text: 'Agree pilot markets, user journeys and screen designs.' },
        { title: 'Build', text: 'Deliver the website, business profiles, listings, enquiries, trade workspace and administration.' },
        { title: 'Pilot', text: 'Test real enquiries and supervised transactions, and resolve usability and operating issues.' },
        { title: 'Launch & expand', text: 'Release approved coverage, then add markets and integrations as demand grows.' }
      ]
    },
    cta: { title: 'Join the first businesses on Afrigo', text: 'Register for the pilot, or talk to us about bringing your members or services onto the platform.' }
  },

  contact: {
    hero: { overline: 'Contact us', title: 'Talk to the Afrigo team', text: 'Tell us about your business and what you trade. We’ll point you to the right next step.' },
    help: {
      title: 'How we can help',
      reasons: [
        { title: 'Registering your business', text: 'Questions about joining the pilot, verification or team access.' },
        { title: 'Market access', text: 'Unsure how ETLS or AfCFTA applies to your product and route.' },
        { title: 'Service partners', text: 'Logistics, inspection and trade-readiness providers who want to join.' },
        { title: 'Partnerships', text: 'Associations, cooperatives and organisations supporting African trade.' }
      ]
    },
    registered: { title: 'Already registered?', text: 'Sign in to manage your enquiries and trade cases.', signIn: 'Sign in' }
  },

  contactForm: {
    name: 'Full name',
    email: 'Work email',
    company: 'Company',
    country: 'Country',
    optional: 'Optional',
    topic: 'What can we help with?',
    message: 'Message',
    messagePlaceholder: 'Tell us about your business and what you trade.',
    send: 'Send message',
    sending: 'Sending…',
    sentTitle: 'Message received',
    sentText: 'Thank you for getting in touch. A member of the Afrigo team will reply to your email.',
    sendAnother: 'Send another message',
    topics: { general: 'General enquiry', register: 'Registering my business', 'market-access': 'Market access question', partner: 'Becoming a service partner', partnership: 'Partnership or association', support: 'Help with my account' },
    errors: {
      invalid: 'Enter your name, a valid email and a message of at least 10 characters.',
      tooMany: 'Too many messages. Please try again in a few minutes.',
      failed: 'We could not send your message. Please try again.'
    }
  },

  legal: {
    label: 'Legal',
    lastUpdated: 'Last updated {date}',
    onThisPage: 'On this page',
    draftNotice: 'This notice is being finalised with legal counsel ahead of public launch and may change.',
    questions: 'Questions? Contact us',
    privacy: {
      title: 'Privacy policy',
      intro: 'How Afrigo, operated by NCDF Group, collects, uses and protects information about businesses and the people who work with them.',
      updated: '24 September 2026',
      sections: [
        { id: 'information', title: 'Information we collect', paragraphs: ['Account details such as your name, work email and sign-in method; business details and verification documents you upload; listings, enquiries, quotations, trade-case documents and messages; and service requests.', 'We also record security and activity information — such as sign-ins and changes to records — to protect accounts and keep an audit trail.'] },
        { id: 'use', title: 'How we use it', paragraphs: ['To operate the platform: verifying businesses, showing listings, delivering enquiries, running trade cases, providing market-access guidance, connecting assigned service partners, preventing fraud, meeting legal obligations and supporting users.'] },
        { id: 'access', title: 'Who can see your information', paragraphs: ['Private records are only visible to people with explicit access: colleagues in your business, your counterparty on a trade case, and service partners assigned to a specific request. Afrigo administrators can access records to review content, provide support and keep the platform safe.', 'Listings you choose to make public show product information only — not your contact details.'] },
        { id: 'security', title: 'Documents and security', paragraphs: ['Documents are kept in private storage and served only to authorised users. Access is protected by secure sign-in, role-based permissions and activity logs.'] },
        { id: 'retention', title: 'Retention', paragraphs: ['We keep trade and activity records for as long as needed for audit, dispute resolution, legal compliance and platform integrity, and delete or anonymise information that is no longer required.'] }
      ],
      rights: { title: 'Your choices and rights', before: 'You can ask to access, correct or delete your information where applicable.', link: 'Contact us', after: 'and we will respond in line with the data-protection laws that apply to you.' }
    },
    terms: {
      title: 'Terms of use',
      intro: 'The terms that apply when businesses, their teams and service partners use Afrigo, operated by NCDF Group.',
      updated: '24 September 2026',
      sections: [
        { id: 'platform', title: 'The platform', paragraphs: ['Afrigo helps independent businesses find trade opportunities, communicate, and manage trade cases with their partners. Afrigo is not a party to trades agreed between users unless it says so in writing.'] },
        { id: 'accounts', title: 'Accounts and accurate information', paragraphs: ['You must provide accurate business, identity and listing information and keep it up to date. Business administrators are responsible for the colleagues they invite and the access they grant.'] },
        { id: 'guidance', title: 'Market-access guidance', paragraphs: ['ETLS and AfCFTA guidance is provided for preparation only. Afrigo does not issue official certificates and does not promise or guarantee duty-free access. Eligibility, duties and approvals are decided by customs and the competent authorities.'] },
        { id: 'services', title: 'Service partners', paragraphs: ['Logistics, inspection and trade-readiness services are provided by independent partners under the terms of the quote you accept. Partners may only access the trade cases and requests assigned to them.'] },
        { id: 'conduct', title: 'Acceptable use', paragraphs: ['You may not misrepresent goods or businesses, try to access records you are not authorised to see, manipulate records, upload unlawful material, or use Afrigo communications outside a legitimate trade relationship. We may suspend accounts or remove content that breaks these terms.'] },
        { id: 'liability', title: 'Availability and responsibility', paragraphs: ['Customs requirements, carrier performance, taxes and regulations can affect any trade. You remain responsible for your own commercial, legal and regulatory decisions.'] }
      ]
    }
  },

  map: {
    scheme: 'Trade scheme',
    tabs: { etls: 'ETLS · ECOWAS', afcfta: 'AfCFTA' },
    stats: { etls: 'ECOWAS member states', afcfta: 'AfCFTA signatories', coverage: 'Coverage', westAfrica: 'West Africa', ofAu: 'Of AU members' },
    badges: { ecowas: 'ECOWAS · ETLS', signatory: 'AfCFTA signatory', tooltipEcowas: 'ECOWAS' },
    describe: {
      ecowas: 'An ECOWAS member. Trade with other member states may qualify under ETLS where goods and producers meet the scheme’s rules, and AfCFTA preferences can apply for wider African trade.',
      signatory: 'Outside ECOWAS, so ETLS does not apply. AfCFTA preferences may apply where both countries are trading under the agreement and goods meet its rules of origin.',
      other: 'Not an AfCFTA signatory and outside ECOWAS. Standard customs requirements apply — confirm them with the relevant authorities.'
    },
    check: 'Check requirements',
    empty: 'Select a country on the map or from the list to see which trade schemes may apply.',
    aria: { etls: 'Map of Africa highlighting the {count} ECOWAS member states where ETLS applies.', afcfta: 'Map of Africa highlighting the {count} AfCFTA signatories.' },
    legend: { etls: 'ECOWAS member', afcfta: 'AfCFTA signatory', selected: 'Selected', corridor: 'Trade corridor' },
    picker: {
      label: 'Explore a country',
      placeholder: 'Search {count} countries…',
      clear: 'Clear country',
      list: 'Countries',
      groups: { etlsMember: 'ECOWAS members', etlsOther: 'Other African countries', afcftaMember: 'AfCFTA signatories', afcftaOther: 'Not a signatory' },
      noMatch: 'No country matches “{query}”.',
      popular: 'Popular:'
    }
  },

  // English names come from the map data; only overrides live here.
  countries: {} as Record<string, string>,

  auth: {
    shell: { privacy: 'Privacy', terms: 'Terms', help: 'Help' },
    or: 'or',
    show: 'Show',
    hide: 'Hide',
    emailPlaceholder: 'you@company.com',
    google: { continue: 'Continue with Google', signUp: 'Sign up with Google', connecting: 'Connecting to Google…' },
    signIn: {
      caption: 'Trade across Africa with every step in one place.',
      captionDetail: 'Enquiries, quotations, documents and shipment milestones — tracked in one trade workspace.',
      title: 'Welcome back',
      subtitle: 'Sign in to manage your enquiries, trade cases and business profile.',
      email: 'Work email',
      password: 'Password',
      forgot: 'Forgot password?',
      submit: 'Sign in',
      submitting: 'Signing in…',
      newHere: 'New to Afrigo?',
      register: 'Register your business',
      failed: 'Unable to sign in. Check your email and password.'
    },
    register: {
      caption: 'Put your business in front of new African markets.',
      captionDetail: 'Publish products and buyer requests, receive enquiries and prepare for cross-border trade.',
      title: 'Register your business',
      subtitle: 'Create your account first — you’ll add your business details in the next step.',
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Work email',
      password: 'Password',
      passwordHint: 'At least 8 characters.',
      agreeBefore: 'I agree to the',
      terms: 'Terms',
      and: 'and',
      privacy: 'Privacy policy',
      submit: 'Create account',
      submitting: 'Creating account…',
      already: 'Already registered?',
      signIn: 'Sign in',
      passwordShort: 'Use a password of at least 8 characters.',
      mustAgree: 'Accept the terms and privacy policy to continue.',
      failed: 'Unable to create your account. Please try again.'
    },
    forgot: {
      caption: 'Your trade records stay protected.',
      captionDetail: 'Recovery links are time-limited and sent only to the account’s email address.',
      title: 'Reset your password',
      subtitle: 'Enter the email you registered with and we’ll send you a secure reset link.',
      email: 'Work email',
      submit: 'Send reset link',
      submitting: 'Sending link…',
      remembered: 'Remembered it?',
      signIn: 'Sign in',
      sentTitle: 'Check your email',
      sentBefore: 'If an account exists for',
      sentAfter: ', you’ll receive a link to reset your password. It may take a few minutes — check your spam folder too.',
      back: 'Back to sign in',
      different: 'Use a different email',
      notConfigured: 'Sign-in is not available right now. Please try again later.'
    }
  },

  errors: {
    generic: 'Something went wrong. Please try again.',
    auth: {
      'auth/invalid-credential': 'That email and password combination is not correct.',
      'auth/wrong-password': 'That email and password combination is not correct.',
      'auth/user-not-found': 'That email and password combination is not correct.',
      'auth/invalid-email': 'Enter a valid email address.',
      'auth/email-already-in-use': 'An account already exists for this email. Sign in instead.',
      'auth/weak-password': 'Choose a stronger password of at least 8 characters.',
      'auth/too-many-requests': 'Too many attempts. Wait a few minutes, then try again.',
      'auth/network-request-failed': 'Network problem. Check your connection and try again.',
      'auth/account-exists-with-different-credential': 'This email is registered with a password. Sign in with email and password.',
      'auth/unauthorized-domain': 'Google sign-in is not enabled for this domain yet.',
      'auth/user-disabled': 'This account has been disabled. Contact support.'
    } as Record<string, string>
  }
}

export type Dictionary = typeof en
