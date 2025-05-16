import { Metadata } from 'next';
import ClientCompanyList from './client-company-list';
import { COMPANY_LIST } from '@/app/graphql/Company';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import CompanyDTO from '@/app/types/CompanyDTO';
export const metadata: Metadata = {
  title: 'Companies'
};

export const revalidate = 0;

export default async function companyListPage() {
  let arrCompanyDTO: CompanyDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: COMPANY_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getCompanyList?.companies) {
      arrCompanyDTO = results[0].data.getCompanyList.companies;
    }
    if (results[0]?.data?.getCompanyList?.total_records) {
      total_records = results[0].data.getCompanyList.total_records;
    }
  } catch {}
  return <ClientCompanyList arrCompanyDTO={arrCompanyDTO} total_records={total_records}></ClientCompanyList>;
}
