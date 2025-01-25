import { Metadata } from 'next';
import ClientViewTax from './client-view-tax';
import { GET_TAX } from '@/app/graphql/Tax';
import { createServerApolloClient } from '@/app/common/utility';
import TaxDTO, { TAX } from '@/app/types/TaxDTO';

export const metadata: Metadata = {
  title: 'View Tax'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewTaxPage({ params }: Props) {
  const { id } = await params;
  let dtoTax: TaxDTO = TAX;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_TAX,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getTax) {
      dtoTax = results[0].data.getTax;
    }
  } catch {}
  return <ClientViewTax dtoTax={dtoTax}></ClientViewTax>;
}
