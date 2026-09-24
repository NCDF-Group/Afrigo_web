import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage from '@/components/site/LegalPage'

export const metadata: Metadata = { title: 'Privacy policy', description: 'How AfriGoOS collects, uses and protects business and personal information.' }

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="How AfriGoOS, operated by NCDF Group, collects, uses and protects information about businesses and the people who work with them."
      updated="24 September 2026"
      sections={[
        {
          id: 'information',
          title: 'Information we collect',
          body: (
            <>
              <p>Account details such as your name, work email and sign-in method; business details and verification documents you upload; listings, enquiries, quotations, trade-case documents and messages; and service requests.</p>
              <p>We also record security and activity information — such as sign-ins and changes to records — to protect accounts and keep an audit trail.</p>
            </>
          )
        },
        {
          id: 'use',
          title: 'How we use it',
          body: <p>To operate the platform: verifying businesses, showing listings, delivering enquiries, running trade cases, providing market-access guidance, connecting assigned service partners, preventing fraud, meeting legal obligations and supporting users.</p>
        },
        {
          id: 'access',
          title: 'Who can see your information',
          body: (
            <>
              <p>Private records are only visible to people with explicit access: colleagues in your business, your counterparty on a trade case, and service partners assigned to a specific request. AfriGoOS administrators can access records to review content, provide support and keep the platform safe.</p>
              <p>Listings you choose to make public show product information only — not your contact details.</p>
            </>
          )
        },
        {
          id: 'security',
          title: 'Documents and security',
          body: <p>Documents are kept in private storage and served only to authorised users. Access is protected by secure sign-in, role-based permissions and activity logs.</p>
        },
        {
          id: 'retention',
          title: 'Retention',
          body: <p>We keep trade and activity records for as long as needed for audit, dispute resolution, legal compliance and platform integrity, and delete or anonymise information that is no longer required.</p>
        },
        {
          id: 'rights',
          title: 'Your choices and rights',
          body: (
            <p>
              You can ask to access, correct or delete your information where applicable. <Link href="/contact?topic=support" className="font-semibold text-brand-600 hover:underline">Contact us</Link> and we will respond in line with the data-protection laws that apply to you.
            </p>
          )
        }
      ]}
    />
  )
}
