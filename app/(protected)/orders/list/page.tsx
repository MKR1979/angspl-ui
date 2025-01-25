import { Metadata } from 'next';
import ClientOrderList from './client-order-list';
import { ORDER_LIST } from '@/app/graphql/Order';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import OrderDTO from '@/app/types/OrderDTO';
export const metadata: Metadata = {
  title: 'Orders'
};

export const revalidate = 0;

export default async function OrderListPage() {
  let arrOrderDTO: OrderDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: ORDER_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getOrderList?.orders) {
      arrOrderDTO = results[0].data.getOrderList.orders;
    }
    if (results[0]?.data?.getOrderList?.total_records) {
      total_records = results[0].data.getOrderList.total_records;
    }
  } catch {}
  return <ClientOrderList arrOrderDTO={arrOrderDTO} total_records={total_records}></ClientOrderList>;
}
