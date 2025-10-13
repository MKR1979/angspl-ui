import { Metadata } from 'next';
import ClientEditUserPermission from './client-edit-user-permission';
import { GET_USER_PERMISSION } from '@/app/graphql/UserPermission';
import { createServerApolloClient } from '@/app/common/utility';
import UserPermissionDTO, { USER_PERMISSION } from '@/app/types/UserPermissionDTO';

export const metadata: Metadata = {
   title: 'Edit User Permission '
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditUserPermissionPage({ params }: Props) {
  const { id } = await params;

  let dtoUserPermission: UserPermissionDTO = USER_PERMISSION;

  try {
    const apolloClient = await createServerApolloClient();
    const result = await apolloClient.query({
      query: GET_USER_PERMISSION,
      variables: {
        id: parseInt(id)
      }
    });
    if (result?.data?.getUserPermission) {
      dtoUserPermission = { ...result.data.getUserPermission };
    } else {
      console.warn('No getUserPermission data found.');
    }
  } catch (error) {
    console.error('Error fetching question options:', error);
  }

  return <ClientEditUserPermission dtoUserPermission={dtoUserPermission} />;
}

