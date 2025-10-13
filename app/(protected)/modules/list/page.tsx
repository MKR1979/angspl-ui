import { Metadata } from 'next';
import ClientModuleList from './client-module-list';
import { MODULE_LIST } from '@/app/graphql/Module';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import ModuleDTO from '@/app/types/ModuleDTO';
export const metadata: Metadata = {
  title: 'Modules'
};

export const revalidate = 0;

export default async function ModuleListPage() {
  let arrModuleDTO: ModuleDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: MODULE_LIST,
      variables: {       
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getModuleList?.modules) {
      arrModuleDTO = results[0].data.getModuleList.modules;
    }
    if (results[0]?.data?.getModuleList?.total_records) {
      total_records = results[0].data.getModuleList.total_records;
    }
  } catch {}
  return <ClientModuleList arrModuleDTO={arrModuleDTO} total_records={total_records}></ClientModuleList>;
}
