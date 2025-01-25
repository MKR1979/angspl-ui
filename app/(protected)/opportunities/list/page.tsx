import { Metadata } from 'next';
import ClientOpportunityList from './client-opportunity-list';
import { OPPORTUNITY_LIST } from '@/app/graphql/Opportunity';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import OpportunityDTO from '@/app/types/OpportunityDTO';
export const metadata: Metadata = {
  title: 'Opportunities'
};

export const revalidate = 0;

export default async function OpportunityListPage() {
  let arrOpportunityDTO: OpportunityDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: OPPORTUNITY_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getOpportunityList?.opportunities) {
      arrOpportunityDTO = results[0].data.getOpportunityList.opportunities;
    }
    if (results[0]?.data?.getOpportunityList?.total_records) {
      total_records = results[0].data.getOpportunityList.total_records;
    }
  } catch {}
  return <ClientOpportunityList arrOpportunityDTO={arrOpportunityDTO} total_records={total_records}></ClientOpportunityList>;
}
