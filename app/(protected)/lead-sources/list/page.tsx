import { Metadata } from 'next';
import ClientLeadSourceList from './client-lead-source-list';
import { LEAD_SOURCE_LIST } from '@/app/graphql/LeadSource';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import LeadSourceDTO from '@/app/types/LeadSourceDTO';
export const metadata: Metadata = {
  title: 'Lead Sources'
};

export const revalidate = 0;

export default async function LeadSourceListPage() {
  let arrLeadSourceDTO: LeadSourceDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: LEAD_SOURCE_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getLeadSourceList?.leadSources) {
      arrLeadSourceDTO = results[0].data.getLeadSourceList.leadSources;
    }
    if (results[0]?.data?.getLeadSourceList?.total_records) {
      total_records = results[0].data.getLeadSourceList.total_records;
    }
  } catch {}
  return <ClientLeadSourceList arrLeadSourceDTO={arrLeadSourceDTO} total_records={total_records}></ClientLeadSourceList>;
}
