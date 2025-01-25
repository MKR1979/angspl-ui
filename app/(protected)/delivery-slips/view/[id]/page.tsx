import { Metadata } from 'next';
import ClientViewDeliverySlip from './client-view-delivery-slip';
import { GET_DELIVERY_SLIP } from '@/app/graphql/DeliverySlip';
import { createServerApolloClient } from '@/app/common/utility';
import DeliverySlipDTO, { DELIVERY_SLIP } from '@/app/types/DeliverySlipDTO';

export const metadata: Metadata = {
  title: 'View Delivery Slip'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewDeliverySlipPage({ params }: Props) {
  const { id } = await params;
  let dtoDeliverySlip: DeliverySlipDTO = DELIVERY_SLIP;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_DELIVERY_SLIP,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getDeliverySlip) {
      dtoDeliverySlip = results[0].data.getDeliverySlip;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewDeliverySlip dtoDeliverySlip={dtoDeliverySlip}></ClientViewDeliverySlip>;
}
