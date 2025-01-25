import { Metadata } from 'next';
import ClientAddCurrency from './client-add-currency';

export const metadata: Metadata = {
  title: 'Add Currency'
};

export const revalidate = 0;

export default async function AddCurrencyPage() {
  return <ClientAddCurrency></ClientAddCurrency>;
}
