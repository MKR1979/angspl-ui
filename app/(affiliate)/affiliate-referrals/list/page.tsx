import { Metadata } from 'next';
import ClientReferralList from './client-referral-list';
import { REFERRAL_LIST } from '@/app/graphql/Referral';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import ReferralDTO from '@/app/types/ReferralDTO';
export const metadata: Metadata = {
  title: 'Referrals'
};

export const revalidate = 0;

export default async function ReferralListPage() {
  let arrReferralDTO: ReferralDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: REFERRAL_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getReferralList?.referrals) {
      arrReferralDTO = results[0].data.getReferralList.referrals;
    }
    if (results[0]?.data?.getReferralList?.total_records) {
      total_records = results[0].data.getReferralList.total_records;
    }
  } catch {}
  return <ClientReferralList arrReferralDTO={arrReferralDTO} total_records={total_records}></ClientReferralList>;
}
