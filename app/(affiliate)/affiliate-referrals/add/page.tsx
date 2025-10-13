import { Metadata } from 'next';
import ClientAddReferral from './client-add-referral';
export const metadata: Metadata = {
  title: 'Add Referral'
};

export const revalidate = 0;

export default async function AddReferralPage() {
  return <ClientAddReferral></ClientAddReferral>;
}
