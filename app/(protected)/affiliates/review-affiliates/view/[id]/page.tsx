import { Metadata } from 'next';
import ClientViewAffiliate from './client-view-affiliates';
import { GET_AFFILIATE } from '@/app/graphql/Affiliate';
import { createServerApolloClient } from '@/app/common/utility';
import AffiliateDTO, { AFFILIATE } from '@/app/types/AffiliateDTO';

export const metadata: Metadata = {
  title: 'View Affiliate'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewAffiliatePage({ params }: Props) {
  const { id } = await params;

  let dtoAffiliate: AffiliateDTO = AFFILIATE;

  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_AFFILIATE,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getAffiliate) {
      dtoAffiliate = results[0].data.getAffiliate;
    } else {
      console.warn('No getAttendance data found for ID:', id);
    }
  } catch (err) {
    console.error('GraphQL query failed:', JSON.stringify(err));
  }

  return <ClientViewAffiliate dtoAffiliate={dtoAffiliate} />;
}
