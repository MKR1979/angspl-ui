import { Metadata } from 'next';
import ClientCaseTypeList from './client-case-type-list';
import { CASE_TYPE_LIST } from '@/app/graphql/CaseType';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import CaseTypeDTO from '@/app/types/CaseTypeDTO';
export const metadata: Metadata = {
  title: 'Case Types'
};

export const revalidate = 0;

export default async function CaseTypeListPage() {
  let arrCaseTypeDTO: CaseTypeDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: CASE_TYPE_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getCaseTypeList?.caseTypes) {
      arrCaseTypeDTO = results[0].data.getCaseTypeList.caseTypes;
    }
    if (results[0]?.data?.getCaseTypeList?.total_records) {
      total_records = results[0].data.getCaseTypeList.total_records;
    }
  } catch {}
  return <ClientCaseTypeList arrCaseTypeDTO={arrCaseTypeDTO} total_records={total_records}></ClientCaseTypeList>;
}
