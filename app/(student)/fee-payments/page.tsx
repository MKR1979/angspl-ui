import { Metadata } from 'next';
import ClientViewPayment from './client-view-payment';

export const metadata: Metadata = {
  title: 'View Fee Plan',
};

export const revalidate = 0;

export default function ViewPaymentPage() {
  return <ClientViewPayment />;
}
