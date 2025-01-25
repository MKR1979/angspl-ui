import { Metadata } from 'next';
import ClientDeliverySlipList from './client-delivery-slip-list';
import { DELIVERY_SLIP_LIST } from '@/app/graphql/DeliverySlip';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import DeliverySlipDTO from '@/app/types/DeliverySlipDTO';
export const metadata: Metadata = {
  title: 'Delivery Slips'
};

export const revalidate = 0;

export default async function DeliverySlipListPage() {
  let arrDeliverySlipDTO: DeliverySlipDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: DELIVERY_SLIP_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getDeliverySlipList?.deliverySlips) {
      arrDeliverySlipDTO = results[0].data.getDeliverySlipList.deliverySlips;
    }
    if (results[0]?.data?.getDeliverySlipList?.total_records) {
      total_records = results[0].data.getDeliverySlipList.total_records;
    }
  } catch {}
  return <ClientDeliverySlipList arrDeliverySlipDTO={arrDeliverySlipDTO} total_records={total_records}></ClientDeliverySlipList>;
}
