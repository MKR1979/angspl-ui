import ClientPricingMsme from './client-pricing-msme';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing'
};
export const revalidate = 0;
export default async function PricingTechPage() {
  return <ClientPricingMsme></ClientPricingMsme>;
}
