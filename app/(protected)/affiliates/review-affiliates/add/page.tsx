import { Metadata } from 'next';
import ClientAddAffiliate from './client-add-affiliates';
import { GET_AFFILIATE } from '@/app/graphql/Affiliate';
import { createServerApolloClient } from '@/app/common/utility';
import AffiliateDTO, { AFFILIATE } from '@/app/types/AffiliateDTO';

export const metadata: Metadata = {
  title: 'Add Affiliate'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function AddAffiliatePage({ params }: Props) {
  const { id } = await params;
  let dtoAffiliate: AffiliateDTO = AFFILIATE;

  try {
    const apolloClient = await createServerApolloClient();
    const result = await apolloClient.query({
      query: GET_AFFILIATE,
      variables: {
        id: parseInt(id)
      }
    });

    if (result?.data?.getAffiliate) {
      dtoAffiliate = { ...result.data.getAffiliate };
    } else {
      console.warn('Warning: No attendance data found for ID ->', id); // DEBUG POINT
    }
  } catch (error) {
    console.error('Error while fetching attendance:', error); // DEBUG POINT
  }

  return <ClientAddAffiliate dtoAffiliate={dtoAffiliate} />;
}