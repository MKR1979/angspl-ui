
import { Metadata } from 'next';
import ClientEditReferral from './client-edit-review-referral';
import { GET_REFERRAL } from '@/app/graphql/Referral';
import { createServerApolloClient } from '@/app/common/utility';
import ReferralDTO, { REFERRAL } from '@/app/types/ReferralDTO';

export const metadata: Metadata = {
  title: 'Edit Referral'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditReferralPage({ params }: Props) {
  const { id } = await params;

  let dtoReferral: ReferralDTO = REFERRAL;

  try {
    const apolloClient = await createServerApolloClient();
    const result = await apolloClient.query({
      query: GET_REFERRAL,
      variables: {
        id: parseInt(id)
      }
    });

    if (result?.data?.getReferral) {
      dtoReferral = { ...result.data.getReferral };
    } else {
      console.warn('Warning: No attendance data found for ID ->', id); // DEBUG POINT
    }
  } catch (error) {
    console.error('Error while fetching attendance:', error); // DEBUG POINT
  }

  return <ClientEditReferral dtoReferral={dtoReferral} />;
}
