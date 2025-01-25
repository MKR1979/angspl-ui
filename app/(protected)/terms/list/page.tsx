import { Metadata } from 'next';
import ClientTermList from './client-term-list';
import { TERM_LIST } from '@/app/graphql/Term';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import TermDTO from '@/app/types/TermDTO';
export const metadata: Metadata = {
  title: 'Terms'
};

export const revalidate = 0;

export default async function TermListPage() {
  let arrTermDTO: TermDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: TERM_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getTermList?.terms) {
      arrTermDTO = results[0].data.getTermList.terms;
    }
    if (results[0]?.data?.getTermList?.total_records) {
      total_records = results[0].data.getTermList.total_records;
    }
  } catch {}
  return <ClientTermList arrTermDTO={arrTermDTO} total_records={total_records}></ClientTermList>;
}
