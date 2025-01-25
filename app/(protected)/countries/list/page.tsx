import { Metadata } from 'next';
import ClientCountryList from './client-country-list';
import { COUNTRY_LIST } from '@/app/graphql/Country';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import CountryDTO from '@/app/types/CountryDTO';
export const metadata: Metadata = {
  title: 'Countries'
};

export const revalidate = 0;

export default async function CountryListPage() {
  let arrCountryDTO: CountryDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: COUNTRY_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getCountryList?.countries) {
      arrCountryDTO = results[0].data.getCountryList.countries;
    }
    if (results[0]?.data?.getCountryList?.total_records) {
      total_records = results[0].data.getCountryList.total_records;
    }
  } catch {}
  return <ClientCountryList arrCountryDTO={arrCountryDTO} total_records={total_records}></ClientCountryList>;
}
