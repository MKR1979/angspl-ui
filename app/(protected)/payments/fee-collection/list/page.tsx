import { Metadata } from 'next';
import ClientFeeCollectionList from './client-fee-collection-list';
import { GET_FEE_COLLECTION_REVIEW_LIST } from '@/app/graphql/FeeCollection';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import FeeCollectionDTO from '@/app/types/FeeCollectionDTO';
export const metadata: Metadata = {
  title: 'Fee Collections'
};

export const revalidate = 0;

export default async function FeeCollectionListPage() {
  let arrFeeCollectionDTO: FeeCollectionDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_FEE_COLLECTION_REVIEW_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getFeeCollectionReviewList?.feeCollections) {
      arrFeeCollectionDTO = results[0].data.getFeeCollectionReviewList.feeCollections;
    }
    if (results[0]?.data?.getFeeCollectionReviewList?.total_records) {
      total_records = results[0].data.getFeeCollectionReviewList.total_records;
    }
  } catch {}
  return <ClientFeeCollectionList arrFeeCollectionDTO={arrFeeCollectionDTO} total_records={total_records}></ClientFeeCollectionList>;
}
