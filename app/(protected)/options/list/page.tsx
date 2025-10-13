import { Metadata } from 'next';
import ClientOptionList from './client-option-list';
import { OPTION_LIST } from '@/app/graphql/Option';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import OptionDTO from '@/app/types/OptionDTO';
export const metadata: Metadata = {
  title: 'Options'
};

export const revalidate = 0;

export default async function OptionListPage() {
  let arrOptionDTO: OptionDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: OPTION_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getOptionList?.options) {
      arrOptionDTO = results[0].data.getOptionList.options;
    }
    if (results[0]?.data?.getOptionList?.total_records) {
      total_records = results[0].data.getOptionList.total_records;
    }
  } catch {}
  return <ClientOptionList arrOptionDTO={arrOptionDTO} total_records={total_records}></ClientOptionList>;
}
