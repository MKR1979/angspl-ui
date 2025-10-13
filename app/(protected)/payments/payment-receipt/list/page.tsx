import { Metadata } from 'next';
import ClientCollectionList from './client-payment-receipt-list';
import { GET_PAY_RECEIPT_LIST } from '@/app/graphql/Receipt';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import ReceiptDTO from '@/app/types/ReceiptDTO';
export const metadata: Metadata = {
  title: 'Payment Receipt'
};

export const revalidate = 0;

export default async function CollectionListPage() {
  let arrReceiptDTO: ReceiptDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_PAY_RECEIPT_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getPayReceiptList?.payReceipts) {
      arrReceiptDTO = results[0].data.getPayReceiptList.payReceipts;
    }
    if (results[0]?.data?.getPayReceiptList?.total_records) {
      total_records = results[0].data.getPayReceiptList.total_records;
    }
  } catch {}
  return <ClientCollectionList arrReceiptDTO={arrReceiptDTO} total_records={total_records}></ClientCollectionList>;
}
