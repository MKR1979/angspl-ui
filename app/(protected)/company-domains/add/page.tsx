import { Metadata } from 'next';
import ClientAddCompanyDomain from './client-add-company-domain';
import LookupDTO from '@/app/types/LookupDTO';
import { COMPANY_LOOKUP } from '@/app/graphql/Company';
import { createServerApolloClient } from '@/app/common/utility';

export const metadata: Metadata = {
  title: 'Add Company Domain'
};

export const revalidate = 0;

export default async function AddCompanyDomainPage() {
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
    console.log('hello', JSON.stringify(arrCompanyLookup));
  } catch (e) {
    console.log('hello', JSON.stringify(e));
  }
  return <ClientAddCompanyDomain arrCompanyLookup={arrCompanyLookup}></ClientAddCompanyDomain>;
}
