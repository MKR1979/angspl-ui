import { Metadata } from 'next';
import ClientViewFeeCollection from './client-view-fee-collection';
import { GET_FEE_COLLECTION } from '@/app/graphql/FeeCollection';
import { createServerApolloClient } from '@/app/common/utility';
import FeeCollectionDTO, { FEE_COLLECTION } from '@/app/types/FeeCollectionDTO';

export const metadata: Metadata = {
  title: 'View Fee Collection'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewFeeCollectionPage({ params }: Props) {
  const { id } = await params;
  let dtoFeeCollection: FeeCollectionDTO = FEE_COLLECTION;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_FEE_COLLECTION,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getFeeCollection) {
      dtoFeeCollection = results[0].data.getFeeCollection;
    }
  } catch {}
  return <ClientViewFeeCollection dtoFeeCollection={dtoFeeCollection}></ClientViewFeeCollection>;
}
