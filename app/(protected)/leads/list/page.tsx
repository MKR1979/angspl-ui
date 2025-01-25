import { Metadata } from 'next';
import ClientLeadList from './client-lead-list';
import { LEAD_LIST } from '@/app/graphql/Lead';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import LeadDTO from '@/app/types/LeadDTO';
export const metadata: Metadata = {
  title: 'Leads'
};

export const revalidate = 0;

export default async function LeadListPage() {
  let arrLeadDTO: LeadDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: LEAD_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getLeadList?.leads) {
      arrLeadDTO = results[0].data.getLeadList.leads;
    }
    if (results[0]?.data?.getLeadList?.total_records) {
      total_records = results[0].data.getLeadList.total_records;
    }
  } catch {}
  return <ClientLeadList arrLeadDTO={arrLeadDTO} total_records={total_records}></ClientLeadList>;
}
