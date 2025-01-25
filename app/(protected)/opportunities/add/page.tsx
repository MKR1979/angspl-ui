import { Metadata } from 'next';
import ClientAddOpportunity from './client-add-opportunity';
import LookupDTO from '@/app/types/LookupDTO';
import { createServerApolloClient } from '@/app/common/utility';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import UserDTO, { USER } from '@/app/types/UserDTO';
import OpportunityDTO, { OPPORTUNITY } from '@/app/types/OpportunityDTO';
import { ACCOUNT_LOOKUP } from '@/app/graphql/Account';
import { CURRENCY_LOOKUP } from '@/app/graphql/Currency';
import { STAGE_LOOKUP } from '@/app/graphql/Stage';
import { OPPORTUNITY_TYPE_LOOKUP } from '@/app/graphql/OpportunityType';
import { LEAD_SOURCE_LOOKUP } from '@/app/graphql/LeadSource';

export const metadata: Metadata = {
  title: 'Add Opportunity'
};

export const revalidate = 0;

export default async function AddOpportunityPage() {
  let arrAccountLookup: LookupDTO[] = [];
  let arrCurrencyLookup: LookupDTO[] = [];
  let arrStageLookup: LookupDTO[] = [];
  let arrOpportunityTypeLookup: LookupDTO[] = [];
  let arrLeadSourceLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  let dtoUser: UserDTO = USER;
  const dtoOpportunity: OpportunityDTO = { ...OPPORTUNITY };
  try {
    const apolloClient = await createServerApolloClient();

    const result = apolloClient.query({
      query: ACCOUNT_LOOKUP
    });
    const result1 = apolloClient.query({
      query: CURRENCY_LOOKUP
    });
    const result2 = apolloClient.query({
      query: STAGE_LOOKUP
    });
    const result3 = apolloClient.query({
      query: OPPORTUNITY_TYPE_LOOKUP
    });
    const result4 = apolloClient.query({
      query: LEAD_SOURCE_LOOKUP
    });
    const result5 = apolloClient.query({
      query: USER_LOOKUP
    });
    const result6 = apolloClient.query({
      query: GET_USER_MY_PROFILE
    });
    const results = await Promise.all([result, result1, result2, result3, result4, result5, result6]);

    if (results[0]?.data?.getAccountLookup) {
      arrAccountLookup = results[0].data.getAccountLookup;
    }
    if (results[1]?.data?.getCurrencyLookup) {
      arrCurrencyLookup = results[1].data.getCurrencyLookup;
    }
    if (results[2]?.data?.getStageLookup) {
      arrStageLookup = results[2].data.getStageLookup;
    }
    if (results[3]?.data?.getOpportunityTypeLookup) {
      arrOpportunityTypeLookup = results[3].data.getOpportunityTypeLookup;
    }
    if (results[4]?.data?.getLeadSourceLookup) {
      arrLeadSourceLookup = results[4].data.getLeadSourceLookup;
    }
    if (results[5]?.data?.getUserLookup) {
      arrAssignedToLookup = results[5].data.getUserLookup;
    }

    if (results[6]?.data?.getUserMyProfile) {
      dtoUser = results[6].data.getUserMyProfile;
      dtoOpportunity.assigned_to = dtoUser.id;
      dtoOpportunity.assigned_to_user_name = dtoUser.user_name;
    }
  } catch (e) {
    console.log('test', JSON.stringify(e));
  }
  return (
    <ClientAddOpportunity
      dtoOpportunity={dtoOpportunity}
      arrAccountLookup={arrAccountLookup}
      arrCurrencyLookup={arrCurrencyLookup}
      arrStageLookup={arrStageLookup}
      arrOpportunityTypeLookup={arrOpportunityTypeLookup}
      arrLeadSourceLookup={arrLeadSourceLookup}
      arrAssignedToLookup={arrAssignedToLookup}
    ></ClientAddOpportunity>
  );
}
