import { Metadata } from 'next';
import ClientOpportunityTypeList from './client-opportunity-type-list';
import { OPPORTUNITY_TYPE_LIST } from '@/app/graphql/OpportunityType';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import OpportunityTypeDTO from '@/app/types/OpportunityTypeDTO';
export const metadata: Metadata = {
  title: 'Opportunity Types'
};

export const revalidate = 0;

export default async function OpportunityTypeListPage() {
  let arrOpportunityTypeDTO: OpportunityTypeDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: OPPORTUNITY_TYPE_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getOpportunityTypeList?.opportunityTypes) {
      arrOpportunityTypeDTO = results[0].data.getOpportunityTypeList.opportunityTypes;
    }
    if (results[0]?.data?.getOpportunityTypeList?.total_records) {
      total_records = results[0].data.getOpportunityTypeList.total_records;
    }
  } catch {}
  return (
    <ClientOpportunityTypeList arrOpportunityTypeDTO={arrOpportunityTypeDTO} total_records={total_records}></ClientOpportunityTypeList>
  );
}
