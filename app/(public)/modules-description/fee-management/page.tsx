import ClientFeeMgmt from './client-fee-mgmt';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fee Management'
};
export const revalidate = 0;
export default async function FeeMgmtPage() {
  return <ClientFeeMgmt></ClientFeeMgmt>;
}
