import { Metadata } from 'next';
import ClientTaxList from './client-tax-list';
import { TAX_LIST } from '@/app/graphql/Tax';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import TaxDTO from '@/app/types/TaxDTO';

export const metadata: Metadata = {
  title: 'Taxes'
};

export const revalidate = 0;

export default async function TaxListPage() {
  let arrTaxDTO: TaxDTO[] = [];
  let total_records = 0;

  try {
    const apolloClient = await createServerApolloClient();
    const { data } = await apolloClient.query({
      query: TAX_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });

    if (data?.getTaxList?.taxes) {
      arrTaxDTO = data.getTaxList.taxes;
    }
    if (data?.getTaxList?.total_records) {
      total_records = data.getTaxList.total_records;
    }
  } catch (error) {
    console.error('Error fetching tax data:', error);
  }

  return <ClientTaxList arrTaxDTO={arrTaxDTO} total_records={total_records} />;
}
