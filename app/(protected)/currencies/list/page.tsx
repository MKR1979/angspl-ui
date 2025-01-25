import { Metadata } from 'next';
import ClientCurrencyList from './client-currency-list';
import { CURRENCY_LIST } from '@/app/graphql/Currency';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import CurrencyDTO from '@/app/types/CurrencyDTO';
export const metadata: Metadata = {
  title: 'Currencies'
};

export const revalidate = 0;

export default async function CurrencyListPage() {
  let arrCurrencyDTO: CurrencyDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: CURRENCY_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getCurrencyList?.currencies) {
      arrCurrencyDTO = results[0].data.getCurrencyList.currencies;
    }
    if (results[0]?.data?.getCurrencyList?.total_records) {
      total_records = results[0].data.getCurrencyList.total_records;
    }
  } catch {}
  return <ClientCurrencyList arrCurrencyDTO={arrCurrencyDTO} total_records={total_records}></ClientCurrencyList>;
}
