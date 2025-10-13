import { Metadata } from 'next';
import ClientPaymentList from './client-schedule-fee-list';
import { GET_FEE_PLAN_REVIEW_LIST } from '@/app/graphql/ScheduleFee';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import ScheduleFeeDTO from '@/app/types/ScheduleFeeDTO';
export const metadata: Metadata = {
  title: 'Fee Payments'
};

export const revalidate = 0;

export default async function ScheduleFeeListPage() {
  let arrScheduleFeeDTO: ScheduleFeeDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_FEE_PLAN_REVIEW_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getFeePlanReviewList?.feePlans) {
      arrScheduleFeeDTO = results[0].data.getFeePlanReviewList.feePlans;
    }
    if (results[0]?.data?.getFeePlanReviewList?.total_records) {
      total_records = results[0].data.getFeePlanReviewList.total_records;
    }
  } catch {}
  return <ClientPaymentList arrScheduleFeeDTO={arrScheduleFeeDTO} total_records={total_records}></ClientPaymentList>;
}
