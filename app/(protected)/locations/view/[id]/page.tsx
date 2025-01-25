import { Metadata } from 'next';
import ClientViewLocation from './client-view-location';
import { GET_LOCATION } from '@/app/graphql/Location';
import { createServerApolloClient } from '@/app/common/utility';
import LocationDTO, { LOCATION } from '@/app/types/LocationDTO';

export const metadata: Metadata = {
  title: 'View Location'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewLocationPage({ params }: Props) {
  const { id } = await params;
  let dtoLocation: LocationDTO = LOCATION;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_LOCATION,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getLocation) {
      dtoLocation = results[0].data.getLocation;
    }
  } catch {}
  return <ClientViewLocation dtoLocation={dtoLocation}></ClientViewLocation>;
}
