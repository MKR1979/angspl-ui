import { Metadata } from 'next';
import ClientAddUser from './client-add-user';
import LookupDTO from '@/app/types/LookupDTO';
import { ROLE_LOOKUP } from '@/app/graphql/Role';
import { createServerApolloClient } from '@/app/common/utility';

export const metadata: Metadata = {
  title: 'Add User'
};

export const revalidate = 0;

export default async function AddUserPage() {
  let arrRoleLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: ROLE_LOOKUP
    });
    const results = await Promise.all([result]);

    if (results[0]?.data?.getRoleLookup) {
      arrRoleLookup = results[0].data.getRoleLookup;
    }
  } catch (e) {
    console.log('hello', JSON.stringify(e));
  }
  return <ClientAddUser arrRoleLookup={arrRoleLookup}></ClientAddUser>;
}
