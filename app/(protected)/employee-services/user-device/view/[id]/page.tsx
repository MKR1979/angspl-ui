import { Metadata } from 'next';
import ClientViewUserDevice from './client-view-user-device';
import { GET_USER_DEVICE } from '@/app/graphql/UserDevice';
import { createServerApolloClient } from '@/app/common/utility';
import UserDeviceDTO, { USER_DEVICE } from '@/app/types/UserDeviceDTO';

export const metadata: Metadata = {
  title: 'View User Device'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewUserDevicePage({ params }: Props) {
  const { id } = await params;

  let dtoUserDevice: UserDeviceDTO = USER_DEVICE;

  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_USER_DEVICE,
      variables: {
        id: parseInt(id)
      }
    });

    const results = await Promise.all([result]);

    if (results[0]?.data?.getUserDevice) {
      dtoUserDevice = results[0].data.getUserDevice;
    } else {
      console.warn('No getUserDevice data found for ID:', id);
    }
  } catch (err) {
    console.error('GraphQL query failed:', JSON.stringify(err));
  }

  return <ClientViewUserDevice dtoUserDevice={dtoUserDevice} />;
}
