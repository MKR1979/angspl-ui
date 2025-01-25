import { Metadata } from 'next';
import ClientIndustryList from './client-industry-list';
import { INDUSTRY_LIST } from '@/app/graphql/Industry';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import IndustryDTO from '@/app/types/IndustryDTO';
export const metadata: Metadata = {
  title: 'Countries'
};

export const revalidate = 0;

export default async function IndustryListPage() {
  let arrIndustryDTO: IndustryDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: INDUSTRY_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getIndustryList?.industries) {
      arrIndustryDTO = results[0].data.getIndustryList.industries;
    }
    if (results[0]?.data?.getIndustryList?.total_records) {
      total_records = results[0].data.getIndustryList.total_records;
    }
  } catch (err) {
    console.log('hello', JSON.stringify(err));
  }
  return <ClientIndustryList arrIndustryDTO={arrIndustryDTO} total_records={total_records}></ClientIndustryList>;
}
