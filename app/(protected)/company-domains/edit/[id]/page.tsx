import { Metadata } from 'next';
import ClientEditCompanyDomain from './client-edit-company-domain';
import { GET_COMPANY_DOMAIN } from '@/app/graphql/CompanyDomain';
import { createServerApolloClient } from '@/app/common/utility';
import CompanyDomainDTO, { COMPANY_DOMAIN } from '@/app/types/CompanyDomainDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { COMPANY_LOOKUP } from '@/app/graphql/Company';

export const metadata: Metadata = {
  title: 'Edit Company Domain'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditCompanyDomainPage({ params }: Props) {
  const { id } = await params;
  let dtoCompanyDomain: CompanyDomainDTO = COMPANY_DOMAIN;
  let arrCompanyLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_COMPANY_DOMAIN,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: COMPANY_LOOKUP
    });
    const results = await Promise.all([result, result1]);
    if (results[0]?.data?.getCompanyDomain) {
      dtoCompanyDomain = { ...results[0].data.getCompanyDomain };
    }
    if (results[1]?.data?.getCompanyLookup) {
      arrCompanyLookup = results[1].data.getCompanyLookup;
    }
  } catch {}
  return <ClientEditCompanyDomain dtoCompanyDomain={dtoCompanyDomain} arrCompanyLookup={arrCompanyLookup} />;
}
