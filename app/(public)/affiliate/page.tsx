import ClientAffiliate from './client-affiliate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate Program'
};
export const revalidate = 0;
export default async function AffiliatePage() {
  return <ClientAffiliate></ClientAffiliate>;
}
