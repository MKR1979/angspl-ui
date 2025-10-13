import { Metadata } from 'next';
import ClientUserDeviceList from './client-user-device-list';
import { USER_DEVICE_LIST } from '@/app/graphql/UserDevice';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import UserDeviceDTO from '@/app/types/UserDeviceDTO';
export const metadata: Metadata = {
  title: 'Review User Device'
};

export const revalidate = 0;

export default async function UserDeviceListPage() {
  let arrUserDeviceDTO: UserDeviceDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: USER_DEVICE_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getUserDeviceList?.userDevices) {
      arrUserDeviceDTO = results[0].data.getUserDeviceList.userDevices;
    }
    if (results[0]?.data?.getUserDeviceList?.total_records) {
      total_records = results[0].data.getUserDeviceList.total_records;
    }
  } catch {}
  return <ClientUserDeviceList arrUserDeviceDTO={arrUserDeviceDTO} total_records={total_records}></ClientUserDeviceList>;
}
