import ClientPricingSch from './client-pricing-sch';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing'
};
export const revalidate = 0;
export default async function PricingSchPage() {
  return <ClientPricingSch></ClientPricingSch>;
}
