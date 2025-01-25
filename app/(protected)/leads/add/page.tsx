import { Metadata } from 'next';
import ClientAddLead from '../../leads/add/client-add-lead';
import LookupDTO from '@/app/types/LookupDTO';
import { createServerApolloClient } from '@/app/common/utility';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import UserDTO, { USER } from '@/app/types/UserDTO';
import LeadDTO, { LEAD } from '@/app/types/LeadDTO';
import { LEAD_SOURCE_LOOKUP } from '@/app/graphql/LeadSource';

export const metadata: Metadata = {
  title: 'Add Lead'
};

export const revalidate = 0;

export default async function AddLeadPage() {
  let arrCountryLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  let arrLeadSourceLookup: LookupDTO[] = [];
  let dtoUser: UserDTO = USER;
  const dtoLead: LeadDTO = { ...LEAD };
  try {
    const apolloClient = await createServerApolloClient();

    const result = apolloClient.query({
      query: COUNTRY_LOOKUP
    });
    const result1 = apolloClient.query({
      query: USER_LOOKUP
    });
    const result2 = apolloClient.query({
      query: LEAD_SOURCE_LOOKUP
    });
    const result3 = apolloClient.query({
      query: GET_USER_MY_PROFILE
    });
    const results = await Promise.all([result, result1, result2, result3]);

    if (results[0]?.data?.getCountryLookup) {
      arrCountryLookup = results[0].data.getCountryLookup;
    }
    if (results[1]?.data?.getUserLookup) {
      arrAssignedToLookup = results[1].data.getUserLookup;
    }
    if (results[2]?.data?.getLeadSourceLookup) {
      arrLeadSourceLookup = results[2].data.getLeadSourceLookup;
    }
    if (results[3]?.data?.getUserMyProfile) {
      dtoUser = results[3].data.getUserMyProfile;
      dtoLead.assigned_to = dtoUser.id;
      dtoLead.assigned_to_user_name = dtoUser.user_name;
    }
  } catch (e) {
    console.log('test', JSON.stringify(e));
  }
  return (
    <ClientAddLead
      dtoLead={dtoLead}
      arrCountryLookup={arrCountryLookup}
      arrAssignedToLookup={arrAssignedToLookup}
      arrLeadSourceLookup={arrLeadSourceLookup}
    ></ClientAddLead>
  );
}
