

import { Metadata } from 'next';
import ClientAddReferral from './client-add-referrals';
import  { REFERRAL } from '@/app/types/ReferralDTO';
export const metadata: Metadata = {
   title: 'Add Referral'
};

export const revalidate = 0;

export default async function AddReferralPage() {
  return <ClientAddReferral dtoReferral={REFERRAL} ></ClientAddReferral>;
}
