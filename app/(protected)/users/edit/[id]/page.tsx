import { Metadata } from 'next';
import ClientEditUser from './client-edit-user';
import { GET_USER } from '@/app/graphql/User';
import { createServerApolloClient } from '@/app/common/utility';
import UserDTO, { USER } from '@/app/types/UserDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { ROLE_LOOKUP } from '@/app/graphql/Role';

export const metadata: Metadata = {
  title: 'Edit User'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditUserPage({ params }: Props) {
  const { id } = await params;
  let dtoUser: UserDTO = USER;
  let arrRoleLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_USER,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: ROLE_LOOKUP
    });
    const results = await Promise.all([result, result1]);
    if (results[0]?.data?.getUser) {
      dtoUser = results[0].data.getUser;
    }
    if (results[1]?.data?.getRoleLookup) {
      arrRoleLookup = results[1].data.getRoleLookup;
    }
  } catch {}
  return <ClientEditUser dtoUser={dtoUser} arrRoleLookup={arrRoleLookup} />;
}
