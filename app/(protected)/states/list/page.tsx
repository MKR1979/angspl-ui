import { Metadata } from 'next';
import ClientStateList from './client-state-list';
import { STATE_LIST } from '@/app/graphql/state';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import StateDTO from '@/app/types/stateDTO';
export const metadata: Metadata = {
  title: 'States'
};

export const revalidate = 0;

export default async function StateListPage() {
  let arrStateDTO: StateDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: STATE_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getStateList?.states) {
      arrStateDTO = results[0].data.getStateList.states;
    }
    if (results[0]?.data?.getStateList?.total_records) {
      total_records = results[0].data.getStateList.total_records;
    }
  } catch {}
  return <ClientStateList arrStateDTO={arrStateDTO} total_records={total_records}></ClientStateList>;
}
