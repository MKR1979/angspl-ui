import { Metadata } from 'next';
import ClientViewUser from './client-view-user';
import { GET_USER } from '@/app/graphql/User';
import { createServerApolloClient } from '@/app/common/utility';
import UserDTO, { USER } from '@/app/types/UserDTO';

export const metadata: Metadata = {
  title: 'View User'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewUserPage({ params }: Props) {
  const { id } = await params;
  let dtoUser: UserDTO = USER;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_USER,
      variables: {
        id: parseInt(id),
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getUser) {
      dtoUser = results[0].data.getUser;
    }
  } catch {}
  return <ClientViewUser dtoUser={dtoUser}></ClientViewUser>;
}
