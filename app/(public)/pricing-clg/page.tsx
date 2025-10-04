import ClientPricingClg from './client-pricing-clg';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing'
};
export const revalidate = 0;
export default async function PricingClgPage() {
  return <ClientPricingClg></ClientPricingClg>;
}
