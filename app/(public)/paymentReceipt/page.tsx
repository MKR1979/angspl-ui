'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ClientReceipt from './client-payment-receipt';

const ReceiptContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const parsedId = id ? parseInt(id, 10) : NaN;
  const userName = searchParams.get('userName') ?? '';
  const isDataExist = searchParams.get('isDataExist') ?? '';
  if (isNaN(parsedId)) {
    return <p>Invalid payment request.</p>;
  }
  return <ClientReceipt id={parsedId} userName={userName} isDataExist={isDataExist} />;
};

const ReceiptPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ReceiptContent />
    </Suspense>
  );
};

export default ReceiptPage;
