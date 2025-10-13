import { Metadata } from 'next';
import ClientAddUser from './client-add-user';
import LookupDTO from '@/app/types/LookupDTO';
import { ROLE_LOOKUP } from '@/app/graphql/Role';
import { TYPE_LOOKUP } from '@/app/graphql/Type';
import { createServerApolloClient } from '@/app/common/utility';

export const metadata: Metadata = {
  title: 'Add User'
};

export const revalidate = 0;

export default async function AddUserPage() {
  let arrRoleLookup: LookupDTO[] = [];
  let arrTypeLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: ROLE_LOOKUP
    });
    const result1 = apolloClient.query({
      query: TYPE_LOOKUP
    });
    const results = await Promise.all([result, result1]);

    if (results[0]?.data?.getRoleLookup) {
      arrRoleLookup = results[0].data.getRoleLookup;
    }
    if(results[1]?.data?.getTypeLookup) {
      arrTypeLookup = results[1].data.getTypeLookup;
    }
  } catch (e) {
    console.log('hello', JSON.stringify(e));
  }
  return <ClientAddUser arrRoleLookup={arrRoleLookup} arrTypeLookup={arrTypeLookup}></ClientAddUser>;
}
