import { Metadata } from 'next';
import ClientEditAccount from './client-edit-account';
import { GET_ACCOUNT } from '@/app/graphql/Account';
import { createServerApolloClient } from '@/app/common/utility';
import AccountDTO, { ACCOUNT } from '@/app/types/AccountDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { ACCOUNT_TYPE_LOOKUP } from '@/app/graphql/AccountType';
import { INDUSTRY_LOOKUP } from '@/app/graphql/Industry';
import { USER_LOOKUP } from '@/app/graphql/User';

export const metadata: Metadata = {
  title: 'Edit Account'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditAccountPage({ params }: Props) {
  const { id } = await params;
  let dtoAccount: AccountDTO = ACCOUNT;
  let arrCountryLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  let arrAccountTypeLookup: LookupDTO[] = [];
  let arrIndustryLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_ACCOUNT,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: COUNTRY_LOOKUP
    });
    const result2 = apolloClient.query({
      query: USER_LOOKUP
    });
    const result3 = apolloClient.query({
      query: ACCOUNT_TYPE_LOOKUP
    });
    const result4 = apolloClient.query({
      query: INDUSTRY_LOOKUP
    });

    const results = await Promise.all([result, result1, result2, result3, result4]);
    if (results[0]?.data?.getAccount) {
      dtoAccount = results[0].data.getAccount;
    }
    if (results[1]?.data?.getCountryLookup) {
      arrCountryLookup = results[1].data.getCountryLookup;
    }
    if (results[2]?.data?.getUserLookup) {
      arrAssignedToLookup = results[2].data.getUserLookup;
    }
    if (results[3]?.data?.getAccountTypeLookup) {
      arrAccountTypeLookup = results[3].data.getAccountTypeLookup;
    }
    if (results[4]?.data?.getIndustryLookup) {
      arrIndustryLookup = results[4].data.getIndustryLookup;
    }
  } catch {}
  return (
    <ClientEditAccount
      dtoAccount={dtoAccount}
      arrCountryLookup={arrCountryLookup}
      arrAssignedToLookup={arrAssignedToLookup}
      arrAccountTypeLookup={arrAccountTypeLookup}
      arrIndustryLookup={arrIndustryLookup}
    />
  );
}
