import { Metadata } from 'next';
import ClientTypeList from './client-type-list';
import { TYPE_LIST } from '@/app/graphql/Type';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import TypeDTO from '@/app/types/TypeDTO';
export const metadata: Metadata = {
  title: 'Types'
};

export const revalidate = 0;

export default async function TypeListPage() {
  let arrTypeDTO: TypeDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: TYPE_LIST,
      variables: {       
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getTypeList?.types) {
      arrTypeDTO = results[0].data.getTypeList.types;
    }
    if (results[0]?.data?.getTypeList?.total_records) {
      total_records = results[0].data.getTypeList.total_records;
    }
  } catch {}
  return <ClientTypeList arrTypeDTO={arrTypeDTO} total_records={total_records}></ClientTypeList>;
}
