import { Metadata } from 'next';
import ClientAddAccount from './client-add-account';
import LookupDTO from '@/app/types/LookupDTO';
import { createServerApolloClient } from '@/app/common/utility';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import { ACCOUNT_TYPE_LOOKUP } from '@/app/graphql/AccountType';
import { INDUSTRY_LOOKUP } from '@/app/graphql/Industry';
import UserDTO, { USER } from '@/app/types/UserDTO';
import AccountDTO, { ACCOUNT } from '@/app/types/AccountDTO';

export const metadata: Metadata = {
  title: 'Add Account'
};

export const revalidate = 0;

export default async function AddAccountPage() {
  let arrCountryLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  let arrAccountTypeLookup: LookupDTO[] = [];
  let arrIndustryLookup: LookupDTO[] = [];
  let dtoUser: UserDTO = USER;
  const dtoAccount: AccountDTO = { ...ACCOUNT };
  try {
    const apolloClient = await createServerApolloClient();

    const result = apolloClient.query({
      query: COUNTRY_LOOKUP
    });
    const result1 = apolloClient.query({
      query: USER_LOOKUP
    });
    const result2 = apolloClient.query({
      query: ACCOUNT_TYPE_LOOKUP
    });
    const result3 = apolloClient.query({
      query: INDUSTRY_LOOKUP
    });
    const result4 = apolloClient.query({
      query: GET_USER_MY_PROFILE
    });
    const results = await Promise.all([result, result1, result2, result3, result4]);

    if (results[0]?.data?.getCountryLookup) {
      arrCountryLookup = results[0].data.getCountryLookup;
    }
    if (results[1]?.data?.getUserLookup) {
      arrAssignedToLookup = results[1].data.getUserLookup;
    }
    if (results[2]?.data?.getAccountTypeLookup) {
      arrAccountTypeLookup = results[2].data.getAccountTypeLookup;
    }
    if (results[3]?.data?.getIndustryLookup) {
      arrIndustryLookup = results[3].data.getIndustryLookup;
    }

    if (results[4]?.data?.getUserMyProfile) {
      dtoUser = results[4].data.getUserMyProfile;
      dtoAccount.assigned_to = dtoUser.id;
      dtoAccount.assigned_to_first_name = dtoUser.first_name;
      dtoAccount.assigned_to_last_name = dtoUser.last_name;
      dtoAccount.assigned_to_user_name = dtoUser.user_name;
    }
  } catch (e) {
    console.log('test', JSON.stringify(e));
  }
  return (
    <ClientAddAccount
      dtoAccount={dtoAccount}
      arrCountryLookup={arrCountryLookup}
      arrAssignedToLookup={arrAssignedToLookup}
      arrAccountTypeLookup={arrAccountTypeLookup}
      arrIndustryLookup={arrIndustryLookup}
    ></ClientAddAccount>
  );
}
