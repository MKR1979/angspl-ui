import { Metadata } from 'next';
import ClientViewOrder from './client-view-order';
import { GET_ORDER } from '@/app/graphql/Order';
import { createServerApolloClient } from '@/app/common/utility';
import OrderDTO, { ORDER } from '@/app/types/OrderDTO';

export const metadata: Metadata = {
  title: 'View Order'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewOrderPage({ params }: Props) {
  const { id } = await params;
  let dtoOrder: OrderDTO = ORDER;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_ORDER,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getOrder) {
      dtoOrder = results[0].data.getOrder;
    }
  } catch {}
  return <ClientViewOrder dtoOrder={dtoOrder}></ClientViewOrder>;
}
