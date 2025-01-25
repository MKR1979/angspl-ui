import { Metadata } from 'next';
import ClientEditLocation from './client-edit-location';
import { GET_LOCATION } from '@/app/graphql/Location';
import { createServerApolloClient } from '@/app/common/utility';
import LocationDTO, { LOCATION } from '@/app/types/LocationDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';

export const metadata: Metadata = {
  title: 'Edit Location'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditLocationPage({ params }: Props) {
  const { id } = await params;
  let dtoLocation: LocationDTO = LOCATION;
  let arrCountryLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_LOCATION,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: COUNTRY_LOOKUP
    });

    const results = await Promise.all([result, result1]);
    if (results[0]?.data?.getLocation) {
      dtoLocation = results[0].data.getLocation;
    }
    if (results[1]?.data?.getCountryLookup) {
      arrCountryLookup = results[1].data.getCountryLookup;
    }
  } catch {}
  return <ClientEditLocation dtoLocation={dtoLocation} arrCountryLookup={arrCountryLookup} />;
}
