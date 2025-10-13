import { Metadata } from 'next';
import ClientViewDistrict from './client-view-district';
import { GET_DISTRICT } from '@/app/graphql/District';
import { createServerApolloClient } from '@/app/common/utility';
import DistrictDTO, { DISTRICT } from '@/app/types/DistrictDTO';

export const metadata: Metadata = {
  title: 'View District'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewDistrictPage({ params }: Props) {
  const { id } = await params;

  let dtoDistrict: DistrictDTO = DISTRICT;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_DISTRICT,
      variables: {
        id: parseInt(id)
      }
    });
    console.log('show the iD value', id);
    //console.log('###############',result);
    const results = await Promise.all([result]);
    console.log('WWWWWWWWWWWWWWW', results[0]?.data);
    if (results[0]?.data?.getDistrict) {
      dtoDistrict = results[0].data.getDistrict;
    } else {
      console.warn('⚠️ No event found for the given ID:', id);
    }
  } catch (error) {
    console.error('❌ Error while fetching event:', error);
  }
  return <ClientViewDistrict dtoDistrict={dtoDistrict}></ClientViewDistrict>;
}
