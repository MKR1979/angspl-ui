import { Metadata } from 'next';
import ClientViewSummary from './client-affiliate-summary';
import { GET_AFFILIATE_SUMMARY } from '@/app/graphql/Affiliate';
import { createServerApolloClient } from '@/app/common/utility';
import AffiliateDTO, { AFFILIATE } from '@/app/types/AffiliateDTO';

export const metadata: Metadata = {
  title: 'Affiliate Summary'
};

export const revalidate = 0;

export default async function ViewSummaryPage() {
  let dtoAffiliate: AffiliateDTO = AFFILIATE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_AFFILIATE_SUMMARY
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getAffiliateSummary) {
      dtoAffiliate = results[0].data.getAffiliateSummary;
    }
  } catch {}
  return <ClientViewSummary dtoAffiliate={dtoAffiliate}></ClientViewSummary>;
}
