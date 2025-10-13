import { Metadata } from 'next';
import ClientAddSiteConfig from './client-add-site-config';
import LookupDTO from '@/app/types/LookupDTO';
import { COMPANY_LOOKUP } from '@/app/graphql/Company';
import { createServerApolloClient } from '@/app/common/utility';

export const metadata: Metadata = {
  title: 'Add SiteConfig'
};

export const revalidate = 0;

export default async function AddSiteConfigPage() {
   let arrCompanyLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: COMPANY_LOOKUP
    });

    const results = await Promise.all([result]);

    if (results[0]?.data?.getCompanyLookup) {
      arrCompanyLookup = results[0].data.getCompanyLookup;
    }
  } catch (e) {
    console.log('hello', JSON.stringify(e));
  }
  return <ClientAddSiteConfig arrCompanyLookup={arrCompanyLookup}></ClientAddSiteConfig>;
}