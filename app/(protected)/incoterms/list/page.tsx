import { Metadata } from 'next';
import ClientIncotermList from './client-incoterm-list';
import { INCOTERM_LIST } from '@/app/graphql/Incoterm';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import IncotermDTO from '@/app/types/IncotermDTO';
export const metadata: Metadata = {
  title: 'Incoterms'
};

export const revalidate = 0;

export default async function IncotermListPage() {
  let arrIncotermDTO: IncotermDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: INCOTERM_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getIncotermList?.incoterms) {
      arrIncotermDTO = results[0].data.getIncotermList.incoterms;
    }
    if (results[0]?.data?.getIncotermList?.total_records) {
      total_records = results[0].data.getIncotermList.total_records;
    }
  } catch {}
  return <ClientIncotermList arrIncotermDTO={arrIncotermDTO} total_records={total_records}></ClientIncotermList>;
}
