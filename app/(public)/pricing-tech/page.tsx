import ClientPricingTech from './client-pricing-tech';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing'
};
export const revalidate = 0;
export default async function PricingTechPage() {
  return <ClientPricingTech></ClientPricingTech>;
}
