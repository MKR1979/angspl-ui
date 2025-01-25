import { Metadata } from 'next';
import ClientViewInvoice from './client-view-invoice';
import { GET_INVOICE } from '@/app/graphql/Invoice';
import { createServerApolloClient } from '@/app/common/utility';
import InvoiceDTO, { INVOICE } from '@/app/types/InvoiceDTO';

export const metadata: Metadata = {
  title: 'View Invoice'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewInvoicePage({ params }: Props) {
  const { id } = await params;
  let dtoInvoice: InvoiceDTO = INVOICE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_INVOICE,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getInvoice) {
      dtoInvoice = results[0].data.getInvoice;
    }
  } catch {}
  return <ClientViewInvoice dtoInvoice={dtoInvoice}></ClientViewInvoice>;
}
