import { Metadata } from 'next';
import ClientViewOpportunityType from './client-view-opportunity-type';
import { GET_OPPORTUNITY_TYPE } from '@/app/graphql/OpportunityType';
import { createServerApolloClient } from '@/app/common/utility';
import OpportunityTypeDTO, { OPPORTUNITY_TYPE } from '@/app/types/OpportunityTypeDTO';

export const metadata: Metadata = {
  title: 'View Opportunity Type'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewOpportunityTypePage({ params }: Props) {
  const { id } = await params;
  let dtoOpportunityType: OpportunityTypeDTO = OPPORTUNITY_TYPE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_OPPORTUNITY_TYPE,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getOpportunityType) {
      dtoOpportunityType = results[0].data.getOpportunityType;
    }
  } catch {}
  return <ClientViewOpportunityType dtoOpportunityType={dtoOpportunityType}></ClientViewOpportunityType>;
}
