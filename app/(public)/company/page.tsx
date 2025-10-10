// import ClientCompany from './client-company-details';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Company'
// };
// export const revalidate = 0;
// export default async function CompanyPage() {
//   return <ClientCompany></ClientCompany>;
// }

'use client';
import { useSearchParams } from 'next/navigation';
import ClientCompany from './client-company-details';
import { Suspense } from 'react';

const CompanyContent = () => {
  const searchParams = useSearchParams();

  const company_type = searchParams.get('company_type') ?? '';
  const plan_type = searchParams.get('plan_type') ?? '';
  const payment_type = searchParams.get('payment_type') ?? '';
  const payment_amount = searchParams.get('payment_amount');
  const parsedAmount = payment_amount ? parseFloat(payment_amount) : 0;

  return (
    <ClientCompany
      company_type={company_type}
      plan_type={plan_type}
      payment_type={payment_type}
      payment_amount={parsedAmount}
    />
  );
};

export default function CompanyPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CompanyContent />
    </Suspense>
  );
}

// import ClientCompany from './client-company-details';
// import { Metadata } from 'next';
// export const metadata: Metadata = {
//   title: 'Company',
// };
// export const revalidate = 0;
// interface CompanyPageProps {
//   searchParams: {
//     company_type?: string;
//     plan_type?: string;
//     payment_type?: string;
//     payment_amount?: string;
//   };
// }

// export default async function CompanyPage({ searchParams }: CompanyPageProps) {
//   const { company_type, plan_type, payment_type, payment_amount } = searchParams;
//  const parsedAmount = payment_amount ? parseFloat(payment_amount) : 0;
//   // ✅ Pass them to your ClientCompany component as props
//   return (
//     <ClientCompany
//       company_type={company_type}
//       plan_type={plan_type}
//       payment_type={payment_type}
//       payment_amount={parsedAmount}
//     />
//   );
// }
