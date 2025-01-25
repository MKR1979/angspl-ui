import { Metadata } from 'next';
import ClientViewCountry from './client-view-country';
import { GET_COUNTRY } from '@/app/graphql/Country';
import { createServerApolloClient } from '@/app/common/utility';
import CountryDTO, { COUNTRY } from '@/app/types/CountryDTO';

export const metadata: Metadata = {
  title: 'View Country'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewCountryPage({ params }: Props) {
  const { id } = await params;
  let dtoCountry: CountryDTO = COUNTRY;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_COUNTRY,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getCountry) {
      dtoCountry = results[0].data.getCountry;
    }
  } catch {}
  return <ClientViewCountry dtoCountry={dtoCountry}></ClientViewCountry>;
}
