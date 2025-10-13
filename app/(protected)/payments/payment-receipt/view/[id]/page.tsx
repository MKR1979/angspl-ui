import { Metadata } from 'next';
import ClientViewPayReceipt from './client-view-payment-receipt';
import { GET_PAY_RECEIPT } from '@/app/graphql/Receipt';
import { createServerApolloClient } from '@/app/common/utility';
import ReceiptDTO, { RECEIPT } from '@/app/types/ReceiptDTO';

export const metadata: Metadata = {
  title: 'View Payment Receipt'
};

export const revalidate = 0;
type Props = { params: Promise<{ id: string }> };

export default async function ViewReceiptPage({ params }: Props) {
  const { id } = await params;

  let dtoReceipt: ReceiptDTO = RECEIPT;

  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_PAY_RECEIPT,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getPayReceipt) {
      dtoReceipt = results[0].data.getPayReceipt;
    } else {
      console.warn('[DEBUG] No receipt found for id:', id);
    }
  } catch (error) {
    console.error('[DEBUG] Error fetching receipt:', error);
  }

  return <ClientViewPayReceipt dtoReceipt={dtoReceipt}></ClientViewPayReceipt>;
}
