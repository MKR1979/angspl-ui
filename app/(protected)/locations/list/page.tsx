import { Metadata } from 'next';
import ClientLocationList from './client-location-list';
import { LOCATION_LIST } from '@/app/graphql/Location';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import LocationDTO from '@/app/types/LocationDTO';
export const metadata: Metadata = {
  title: 'Locations'
};

export const revalidate = 0;

export default async function LocationListPage() {
  let arrLocationDTO: LocationDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: LOCATION_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getLocationList?.locations) {
      arrLocationDTO = results[0].data.getLocationList.locations;
    }
    if (results[0]?.data?.getLocationList?.total_records) {
      total_records = results[0].data.getLocationList.total_records;
    }
  } catch {}
  return <ClientLocationList arrLocationDTO={arrLocationDTO} total_records={total_records}></ClientLocationList>;
}
