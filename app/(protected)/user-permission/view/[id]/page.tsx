import { Metadata } from 'next';
import ClientViewUserPermission from './client-view-user-permission';
import { GET_USER_PERMISSION } from '@/app/graphql/UserPermission';
import { createServerApolloClient } from '@/app/common/utility';
import UserPermissionDTO, { USER_PERMISSION } from '@/app/types/UserPermissionDTO';

export const metadata: Metadata = {
  title: 'View User Permission'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewUserPermissionPage({ params }: Props) {
  const { id } = await params;
  let dtoUserPermission: UserPermissionDTO = USER_PERMISSION;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_USER_PERMISSION,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getUserPermission) {
      dtoUserPermission = results[0].data.getUserPermission;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewUserPermission dtoUserPermission={dtoUserPermission}></ClientViewUserPermission>;
}
