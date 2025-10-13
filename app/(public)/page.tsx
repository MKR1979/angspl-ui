import { Metadata } from 'next';
import ClientPricingSch from '../(public)/pricing/pricing-sch/page';

export const metadata: Metadata = {
  title: 'Home'
};

export const revalidate = 0;

export default async function HomePage() {
  return <ClientPricingSch></ClientPricingSch>;
}

