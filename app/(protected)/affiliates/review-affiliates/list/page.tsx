import { Metadata } from 'next';
import ClientAffiliateList from './client-review-affiliate-list';
import { AFFILIATE_LIST } from '@/app/graphql/Affiliate';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import AffiliateDTO from '@/app/types/AffiliateDTO';
export const metadata: Metadata = {
  title: 'Review Affiliate'
};

export const revalidate = 0;

export default async function AffiliateListPage() {
  let arrAffiliateDTO: AffiliateDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: AFFILIATE_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getAffiliateList?.affiliates) {
      arrAffiliateDTO = results[0].data.getAffiliateList.affiliates;
    }
    if (results[0]?.data?.getAffiliateList?.total_records) {
      total_records = results[0].data.getAffiliateList.total_records;
    }
  } catch {}
  return <ClientAffiliateList arrAffiliateDTO={arrAffiliateDTO} total_records={total_records}></ClientAffiliateList>;
}
