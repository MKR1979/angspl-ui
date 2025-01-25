import { Metadata } from 'next';
import ClientViewOpportunity from './client-view-opportunity';
import { GET_OPPORTUNITY } from '@/app/graphql/Opportunity';
import { createServerApolloClient } from '@/app/common/utility';
import OpportunityDTO, { OPPORTUNITY } from '@/app/types/OpportunityDTO';

export const metadata: Metadata = {
  title: 'View Opportunity'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewOpportunityPage({ params }: Props) {
  const { id } = await params;
  let dtoOpportunity: OpportunityDTO = OPPORTUNITY;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_OPPORTUNITY,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getOpportunity) {
      dtoOpportunity = results[0].data.getOpportunity;
    }
  } catch {}
  return <ClientViewOpportunity dtoOpportunity={dtoOpportunity}></ClientViewOpportunity>;
}
