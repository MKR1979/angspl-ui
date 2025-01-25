import { Metadata } from 'next';
import ClientEditProfile from './client-edit-profile';
import { GET_USER_MY_PROFILE } from '@/app/graphql/User';
import { createServerApolloClient } from '@/app/common/utility';
import UserDTO, { USER } from '@/app/types/UserDTO';

export const metadata: Metadata = {
  title: 'Edit Profile'
};

export const revalidate = 0;

export default async function EditUserPage() {
  let dtoUser: UserDTO = USER;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_USER_MY_PROFILE
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getUserMyProfile) {
      dtoUser = results[0].data.getUserMyProfile;
    }
  } catch {}
  return <ClientEditProfile dtoUser={dtoUser} />;
}
