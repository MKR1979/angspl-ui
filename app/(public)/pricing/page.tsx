import ClientPricing from './client-pricing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing'
};
export const revalidate = 0;
export default async function LoginPage() {
  return <ClientPricing></ClientPricing>;
}
