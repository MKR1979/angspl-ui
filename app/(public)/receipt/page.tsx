import ClientReceipt from './client-receipt';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Receipt'
};
export const revalidate = 0;
export default async function ReceiptPage() {
  return <ClientReceipt></ClientReceipt>;
}

