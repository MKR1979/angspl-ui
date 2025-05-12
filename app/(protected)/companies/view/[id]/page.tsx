import { Metadata } from 'next';
import ClientViewCompany from './client-view-company';
import { GET_COMPANY } from '@/app/graphql/Company';
import { createServerApolloClient } from '@/app/common/utility';
import CompanyDTO, { COMPANY } from '@/app/types/CompanyDTO';

export const metadata: Metadata = {
  title: 'View Company'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewCompanyPage({ params }: Props) {
  const { id } = await params;
  let dtoCompany: CompanyDTO = COMPANY;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_COMPANY,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getCompany) {
      dtoCompany = results[0].data.getCompany;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewCompany dtoCompany={dtoCompany}></ClientViewCompany>;
}
