import { Metadata } from 'next';
import ClientCodeProjectList from './client-code-project-list';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import CodeProjectDTO from '@/app/types/CodeProjectDTO';
import { CODE_PROJECT_LIST } from '@/app/graphql/CodeProject';
export const metadata: Metadata = {
  title: 'Code Project'
};

export const revalidate = 0;

export default async function CodeProjectListPage() {
  let arrCodeProjectDTO: CodeProjectDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: CODE_PROJECT_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getCodeProjectList?.codeProjects) {
      arrCodeProjectDTO = results[0].data.getCodeProjectList.codeProjects;
    }
    if (results[0]?.data?.getCodeProjectList?.total_records) {
      total_records = results[0].data.getCodeProjectList.total_records;
    }
  } catch {}
  return <ClientCodeProjectList arrCodeProjectDTO={arrCodeProjectDTO} total_records={total_records}></ClientCodeProjectList>;
}