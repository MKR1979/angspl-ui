import { Metadata } from 'next';
import ClientViewCompanyDomain from './client-view-company-domain';
import { GET_COMPANY_DOMAIN } from '@/app/graphql/CompanyDomain';
import { createServerApolloClient } from '@/app/common/utility';
import CompanyDomainDTO, { COMPANY_DOMAIN } from '@/app/types/CompanyDomainDTO';

export const metadata: Metadata = {
  title: 'View Company Domain'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewCompanyDomainPage({ params }: Props) {
  const { id } = await params;
  console.log('........................', id);
  let dtoCompanyDomain: CompanyDomainDTO = COMPANY_DOMAIN;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_COMPANY_DOMAIN,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    console.log(',,,,,,,,,,,,,,,,,,,,,,,Result', result);
    console.log(',,,,,,,,,,,,,,,,,,,,,,,Id', parseInt(id));
    if (results[0]?.data?.getCompanyDomain) {
      dtoCompanyDomain = results[0].data.getCompanyDomain;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewCompanyDomain dtoCompanyDomain={dtoCompanyDomain}></ClientViewCompanyDomain>;
}
