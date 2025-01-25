import { Metadata } from 'next';
import ClientProvisionalInvoiceList from './client-provisional-invoice-list';
import { PROVISIONAL_INVOICE_LIST } from '@/app/graphql/ProvisionalInvoice';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import ProvisionalInvoiceDTO from '@/app/types/ProvisionalInvoiceDTO';
export const metadata: Metadata = {
  title: 'Provisional Invoices'
};

export const revalidate = 0;

export default async function ProvisionalInvoiceListPage() {
  let arrProvisionalInvoiceDTO: ProvisionalInvoiceDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: PROVISIONAL_INVOICE_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getProvisionalInvoiceList?.provisionalInvoices) {
      arrProvisionalInvoiceDTO = results[0].data.getProvisionalInvoiceList.provisionalInvoices;
    }
    if (results[0]?.data?.getProvisionalInvoiceList?.total_records) {
      total_records = results[0].data.getProvisionalInvoiceList.total_records;
    }
  } catch {}
  return (
    <ClientProvisionalInvoiceList
      arrProvisionalInvoiceDTO={arrProvisionalInvoiceDTO}
      total_records={total_records}
    ></ClientProvisionalInvoiceList>
  );
}
