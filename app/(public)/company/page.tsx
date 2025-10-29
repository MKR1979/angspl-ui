'use client';
import { useSearchParams } from 'next/navigation';
import ClientCompany from './client-company-details';
import { Suspense } from 'react';
import { SnackbarProvider } from '@/app/custom-components/SnackbarProvider';

const CompanyContent = () => {
  const searchParams = useSearchParams();

  const company_type = searchParams.get('company_type') ?? '';
  const plan_type = searchParams.get('plan_type') ?? '';
  const payment_type = searchParams.get('payment_type') ?? '';
  const payment_amount = searchParams.get('payment_amount');
  const parsedAmount = payment_amount ? parseFloat(payment_amount) : 0;
  // const configString = searchParams.get('config') ?? '';
  // const newCompanyConfig = configString ? JSON.parse(decodeURIComponent(configString)) : [];
  // console.log('Received Config:', newCompanyConfig);

  return <ClientCompany company_type={company_type} plan_type={plan_type} payment_type={payment_type} payment_amount={parsedAmount} />;
};

export default function CompanyPage() {
  return (
    <SnackbarProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <CompanyContent />
      </Suspense>
    </SnackbarProvider>
  );
}
