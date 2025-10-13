import { Metadata } from 'next';
import ClientViewAffiliateReferral from './client-view-referral';
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
    if (results[0]?.data?.getReferral) {
      dtoReferral = results[0].data.getReferral;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewAffiliateReferral dtoReferral={dtoReferral}></ClientViewAffiliateReferral>;
}
