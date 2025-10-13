import { Metadata } from 'next';
import ClientEditPayment from './client-edit-fee-head';
import { GET_FEE_HEAD } from '@/app/graphql/FeeHead';
import { createServerApolloClient } from '@/app/common/utility';
import FeeHeadDTO, { FEE_HEAD } from '@/app/types/FeeHeadDTO';

export const metadata: Metadata = {
  title: 'Edit Fee Heads'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditFeeHeadPage({ params }: Props) {
  const { id } = await params;
  let dtoFeeHead: FeeHeadDTO = FEE_HEAD;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_FEE_HEAD,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getFeeHead) {
      dtoFeeHead = { ...results[0].data.getFeeHead };
     
    }
  } catch {}
  return <ClientEditPayment dtoFeeHead={dtoFeeHead} />;
}
