import { Metadata } from 'next';
import ClientFeeHeadList from './client-fee-head-list';
import { GET_FEE_HEAD_LIST } from '@/app/graphql/FeeHead';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import FeeHeadDTO from '@/app/types/FeeHeadDTO';
export const metadata: Metadata = {
  title: 'Fee Heads'
};

export const revalidate = 0;

export default async function FeeHeadListPage() {
  let arrFeeHeadDTO: FeeHeadDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_FEE_HEAD_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getFeeHeadList?.feeHeads) {
      arrFeeHeadDTO = results[0].data.getFeeHeadList.feeHeads;
    }
    if (results[0]?.data?.getFeeHeadList?.total_records) {
      total_records = results[0].data.getFeeHeadList.total_records;
    }
  } catch {}
  return <ClientFeeHeadList arrFeeHeadDTO={arrFeeHeadDTO} total_records={total_records}></ClientFeeHeadList>;
}
