import { Metadata } from 'next';
import ClientEditState from './client-edit-district';
import { GET_DISTRICT } from '@/app/graphql/District';
import { createServerApolloClient } from '@/app/common/utility';
import DistrictDTO, { DISTRICT } from '@/app/types/DistrictDTO';
// // import LookupDTO from '@/app/types/LookupDTO';
// // import { STATE_LOOKUP } from '@/app/graphql/state';

export const metadata: Metadata = {
  title: 'Edit District'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditDistrictPage({ params }: Props) {
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
    const results = await Promise.all([result]);
    if (results[0]?.data?.getDistrict) {
      dtoDistrict = results[0].data.getDistrict;
    }
  } catch { }

  return (
    <ClientEditState
      dtoDistrict={dtoDistrict}
    />
  );
}
