import { Metadata } from 'next';
import ClientInvoiceList from './client-invoice-list';
import { INVOICE_LIST } from '@/app/graphql/Invoice';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import InvoiceDTO from '@/app/types/InvoiceDTO';
export const metadata: Metadata = {
  title: 'Invoices'
};

export const revalidate = 0;

export default async function InvoiceListPage() {
  let arrInvoiceDTO: InvoiceDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: INVOICE_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getInvoiceList?.invoices) {
      arrInvoiceDTO = results[0].data.getInvoiceList.invoices;
    }
    if (results[0]?.data?.getInvoiceList?.total_records) {
      total_records = results[0].data.getInvoiceList.total_records;
    }
  } catch {}
  return <ClientInvoiceList arrInvoiceDTO={arrInvoiceDTO} total_records={total_records}></ClientInvoiceList>;
}
