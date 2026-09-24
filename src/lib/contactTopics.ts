export const CONTACT_TOPICS = [
  { value: 'general', label: 'General enquiry' },
  { value: 'register', label: 'Registering my business' },
  { value: 'market-access', label: 'Market access question' },
  { value: 'partner', label: 'Becoming a service partner' },
  { value: 'partnership', label: 'Partnership or association' },
  { value: 'support', label: 'Help with my account' }
] as const

export type ContactTopic = (typeof CONTACT_TOPICS)[number]['value']

export const isContactTopic = (value: unknown): value is ContactTopic => CONTACT_TOPICS.some(topic => topic.value === value)
