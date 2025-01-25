import { Metadata } from 'next';
import ClientRoleList from './client-role-list';
import { ROLE_LIST } from '@/app/graphql/Role';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import RoleDTO from '@/app/types/RoleDTO';
export const metadata: Metadata = {
  title: 'Roles'
};

export const revalidate = 0;

export default async function RoleListPage() {
  let arrRoleDTO: RoleDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: ROLE_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getRoleList?.roles) {
      arrRoleDTO = results[0].data.getRoleList.roles;
    }
    if (results[0]?.data?.getRoleList?.total_records) {
      total_records = results[0].data.getRoleList.total_records;
    }
  } catch {}
  return <ClientRoleList arrRoleDTO={arrRoleDTO} total_records={total_records}></ClientRoleList>;
}
