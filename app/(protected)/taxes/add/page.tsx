import { Metadata } from 'next';
import ClientAddTax from './client-add-tax';

export const metadata: Metadata = {
  title: 'Add Tax'
};

export const revalidate = 0;

export default async function AddTaxPage() {
  return <ClientAddTax></ClientAddTax>;
}
