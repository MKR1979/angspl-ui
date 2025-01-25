import { Metadata } from 'next';
import ClientViewProvisionalInvoice from './client-view-provisional-invoice';
import { GET_PROVISIONAL_INVOICE } from '@/app/graphql/ProvisionalInvoice';
import { createServerApolloClient } from '@/app/common/utility';
import ProvisionalInvoiceDTO, { PROVISIONAL_INVOICE } from '@/app/types/ProvisionalInvoiceDTO';

export const metadata: Metadata = {
  title: 'View Provisional Invoice'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewProvisionalInvoicePage({ params }: Props) {
  const { id } = await params;
  let dtoProvisionalInvoice: ProvisionalInvoiceDTO = PROVISIONAL_INVOICE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_PROVISIONAL_INVOICE,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getProvisionalInvoice) {
      dtoProvisionalInvoice = results[0].data.getProvisionalInvoice;
    }
  } catch {}
  return <ClientViewProvisionalInvoice dtoProvisionalInvoice={dtoProvisionalInvoice}></ClientViewProvisionalInvoice>;
}
