import { Metadata } from 'next';
import ClientAddLocation from './client-add-location';
import LookupDTO from '@/app/types/LookupDTO';
import { createServerApolloClient } from '@/app/common/utility';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import LocationDTO, { LOCATION } from '@/app/types/LocationDTO';

export const metadata: Metadata = {
  title: 'Add Location'
};

export const revalidate = 0;

export default async function AddLocationPage() {
  let arrCountryLookup: LookupDTO[] = [];

  const dtoLocation: LocationDTO = { ...LOCATION };
  try {
    const apolloClient = await createServerApolloClient();

    const result = apolloClient.query({
      query: COUNTRY_LOOKUP
    });
    const results = await Promise.all([result]);

    if (results[0]?.data?.getCountryLookup) {
      arrCountryLookup = results[0].data.getCountryLookup;
    }
  } catch (e) {
    console.log('test', JSON.stringify(e));
  }
  return <ClientAddLocation dtoLocation={dtoLocation} arrCountryLookup={arrCountryLookup}></ClientAddLocation>;
}
