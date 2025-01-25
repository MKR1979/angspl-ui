import { Metadata } from 'next';
import ClientCaseList from './client-case-list';
import { CASE_LIST } from '@/app/graphql/Case';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import CaseDTO from '@/app/types/CaseDTO';
export const metadata: Metadata = {
  title: 'Cases'
};

export const revalidate = 0;

export default async function CaseListPage() {
  let arrCaseDTO: CaseDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: CASE_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getCaseList?.cases) {
      arrCaseDTO = results[0].data.getCaseList.cases;
    }
    if (results[0]?.data?.getCaseList?.total_records) {
      total_records = results[0].data.getCaseList.total_records;
    }
  } catch {}
  return <ClientCaseList arrCaseDTO={arrCaseDTO} total_records={total_records}></ClientCaseList>;
}
