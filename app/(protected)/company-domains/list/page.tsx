import { Metadata } from 'next';
import ClientCompanyDomainList from './client-company-domain-list';
import { COMPANY_DOMAIN_LIST } from '@/app/graphql/CompanyDomain';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import CompanyDomainDTO from '@/app/types/CompanyDomainDTO';
export const metadata: Metadata = {
  title: 'Company Domain'
};

export const revalidate = 0;

export default async function companyDomainListPage() {
  let arrCompanyDomainDTO: CompanyDomainDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: COMPANY_DOMAIN_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getCompanyDomainList?.companyDomains) {
      arrCompanyDomainDTO = results[0].data.getCompanyDomainList.companyDomains;
    }
    if (results[0]?.data?.getCompanyDomainList?.total_records) {
      total_records = results[0].data.getCompanyDomainList.total_records;
    }
  } catch {}
  return <ClientCompanyDomainList arrCompanyDomainDTO={arrCompanyDomainDTO} total_records={total_records}></ClientCompanyDomainList>;
}
