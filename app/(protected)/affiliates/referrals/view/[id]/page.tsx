
import { Metadata } from 'next';
import ClientViewReferral from './client-view-referral';
import { GET_REFERRAL } from '@/app/graphql/Referral';
import { createServerApolloClient } from '@/app/common/utility';
import ReferralDTO, { REFERRAL } from '@/app/types/ReferralDTO';

export const metadata: Metadata = {
  title: 'View Referral'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewReferralPage({ params }: Props) {
  const { id } = await params;
 
  let dtoReferral: ReferralDTO = REFERRAL;

  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_REFERRAL,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    console.log('GraphQL result:', JSON.stringify(results[0], null, 2));
    if (results[0]?.data?.getReferral) {
      dtoReferral = results[0].data.getReferral;
      console.log('dtoReferral populated:', dtoReferral);
    } else {
      console.warn('No getAttendance data found for ID:', id);
    }
  } catch (err) {
    console.error('GraphQL query failed:', JSON.stringify(err));
  }

  return <ClientViewReferral dtoReferral={dtoReferral} />;
}
