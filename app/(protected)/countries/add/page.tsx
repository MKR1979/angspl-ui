import { Metadata } from 'next';
import ClientAddCountry from './client-add-country';

export const metadata: Metadata = {
  title: 'Add Country'
};

export const revalidate = 0;

export default async function AddCountryPage() {
  return <ClientAddCountry></ClientAddCountry>;
}
