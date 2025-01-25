import { Metadata } from 'next';
import ClientAddTarget from '../../targets/add/client-add-target';
import LookupDTO from '@/app/types/LookupDTO';
import { createServerApolloClient } from '@/app/common/utility';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import UserDTO, { USER } from '@/app/types/UserDTO';
import TargetDTO, { TARGET } from '@/app/types/TargetDTO';

export const metadata: Metadata = {
  title: 'Add Target'
};

export const revalidate = 0;

export default async function AddTargetPage() {
  let arrCountryLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  let dtoUser: UserDTO = USER;
  const dtoTarget: TargetDTO = { ...TARGET };
  try {
    const apolloClient = await createServerApolloClient();

    const result = apolloClient.query({
      query: COUNTRY_LOOKUP
    });
    const result1 = apolloClient.query({
      query: USER_LOOKUP
    });
    const result2 = apolloClient.query({
      query: GET_USER_MY_PROFILE
    });
    const results = await Promise.all([result, result1, result2]);

    if (results[0]?.data?.getCountryLookup) {
      arrCountryLookup = results[0].data.getCountryLookup;
    }
    if (results[1]?.data?.getUserLookup) {
      arrAssignedToLookup = results[1].data.getUserLookup;
    }
    if (results[2]?.data?.getUserMyProfile) {
      dtoUser = results[2].data.getUserMyProfile;
      dtoTarget.assigned_to = dtoUser.id;
      dtoTarget.assigned_to_user_name = dtoUser.user_name;
    }
  } catch (e) {
    console.log('test', JSON.stringify(e));
  }
  return (
    <ClientAddTarget dtoTarget={dtoTarget} arrCountryLookup={arrCountryLookup} arrAssignedToLookup={arrAssignedToLookup}></ClientAddTarget>
  );
}
