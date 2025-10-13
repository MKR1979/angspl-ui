import { Metadata } from 'next';
import ClientUserPermissionList from './client-user-permission-list';
import { USER_PERMISSION_LIST } from '@/app/graphql/UserPermission';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import UserPermissionDTO from '@/app/types/UserPermissionDTO';
export const metadata: Metadata = {
  title: 'User Permission'
};

export const revalidate = 0;

export default async function UserPermissionListPage() {
  let arrUserPermissionDTO: UserPermissionDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: USER_PERMISSION_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getUserPermissionList?.user_permissions) {
      arrUserPermissionDTO = results[0].data.getUserPermissionList.user_permissions;
    }
    if (results[0]?.data?.getUserPermissionList?.total_records) {
      total_records = results[0].data.getUserPermissionList.total_records;
    }
  } catch {}
  return <ClientUserPermissionList arrUserPermissionDTO={arrUserPermissionDTO} total_records={total_records}></ClientUserPermissionList>;
}
