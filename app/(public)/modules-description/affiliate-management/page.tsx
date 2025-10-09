import ClientAffiliateMgmt from './client-affiliate-mgmt';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate Management'
};
export const revalidate = 0;
export default async function AcademicsMgmtPage() {
  return <ClientAffiliateMgmt></ClientAffiliateMgmt>;
}
