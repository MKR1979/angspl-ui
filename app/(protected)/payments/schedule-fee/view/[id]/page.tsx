import { Metadata } from 'next';
import ClientViewPayment from './client-view-schedule-fee';
import { GET_FEE_PLAN } from '@/app/graphql/ScheduleFee';
import { createServerApolloClient } from '@/app/common/utility';
import ScheduleFeeDTO, { SCHEDULE_FEE } from '@/app/types/ScheduleFeeDTO';

export const metadata: Metadata = {
  title: 'View Fee Plan'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewScheduleFeePage({ params }: Props) {
  const { id } = await params;
  let dtoScheduleFee: ScheduleFeeDTO = SCHEDULE_FEE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_FEE_PLAN,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getFeePlan) {
      dtoScheduleFee = results[0].data.getFeePlan;
    }
  } catch {}
  return <ClientViewPayment dtoScheduleFee={dtoScheduleFee}></ClientViewPayment>;
}
