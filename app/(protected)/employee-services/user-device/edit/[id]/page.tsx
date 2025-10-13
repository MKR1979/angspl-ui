import { Metadata } from 'next';
import ClientEditUserDevice from './client-edit-user-device';
import { GET_USER_DEVICE } from '@/app/graphql/UserDevice';
import { createServerApolloClient } from '@/app/common/utility';
import UserDeviceDTO, { USER_DEVICE } from '@/app/types/UserDeviceDTO';

export const metadata: Metadata = {
  title: 'Edit User Device'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditUserDevicePage({ params }: Props) {
  const { id } = await params;
  let dtoUserDevice: UserDeviceDTO = USER_DEVICE;

  try {
    const apolloClient = await createServerApolloClient();
    const result = await apolloClient.query({
      query: GET_USER_DEVICE,
      variables: {
        id: parseInt(id)
      }
    });

    if (result?.data?.getUserDevice) {
      dtoUserDevice = { ...result.data.getUserDevice };
    } else {
      console.warn('Warning: No userDevice data found for ID ->', id); // DEBUG POINT
    }
  } catch (error) {
    console.error('Error while fetching userDevice:', error); // DEBUG POINT
  }

  return <ClientEditUserDevice dtoUserDevice={dtoUserDevice} />;
}
