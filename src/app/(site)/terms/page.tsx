import type { Metadata } from 'next'
import LegalPage from '@/components/site/LegalPage'

export const metadata: Metadata = { title: 'Terms of use', description: 'The terms for using the Afrigo trade and market access platform.' }

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      intro="The terms that apply when businesses, their teams and service partners use Afrigo, operated by NCDF Group."
      updated="24 September 2026"
      sections={[
        {
          id: 'platform',
          title: 'The platform',
          body: <p>Afrigo helps independent businesses find trade opportunities, communicate, and manage trade cases with their partners. Afrigo is not a party to trades agreed between users unless it says so in writing.</p>
        },
        {
          id: 'accounts',
          title: 'Accounts and accurate information',
          body: <p>You must provide accurate business, identity and listing information and keep it up to date. Business administrators are responsible for the colleagues they invite and the access they grant.</p>
        },
        {
          id: 'guidance',
          title: 'Market-access guidance',
          body: <p>ETLS and AfCFTA guidance is provided for preparation only. Afrigo does not issue official certificates and does not promise or guarantee duty-free access. Eligibility, duties and approvals are decided by customs and the competent authorities.</p>
        },
        {
          id: 'services',
          title: 'Service partners',
          body: <p>Logistics, inspection and trade-readiness services are provided by independent partners under the terms of the quote you accept. Partners may only access the trade cases and requests assigned to them.</p>
        },
        {
          id: 'conduct',
          title: 'Acceptable use',
          body: <p>You may not misrepresent goods or businesses, try to access records you are not authorised to see, manipulate records, upload unlawful material, or use Afrigo communications outside a legitimate trade relationship. We may suspend accounts or remove content that breaks these terms.</p>
        },
        {
          id: 'liability',
          title: 'Availability and responsibility',
          body: <p>Customs requirements, carrier performance, taxes and regulations can affect any trade. You remain responsible for your own commercial, legal and regulatory decisions.</p>
        }
      ]}
    />
  )
}
