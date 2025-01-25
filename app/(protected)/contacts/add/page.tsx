import { Metadata } from 'next';
import ClientAddContact from '../../contacts/add/client-add-contact';
import LookupDTO from '@/app/types/LookupDTO';
import { createServerApolloClient } from '@/app/common/utility';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import UserDTO, { USER } from '@/app/types/UserDTO';
import ContactDTO, { CONTACT } from '@/app/types/ContactDTO';
import { LEAD_SOURCE_LOOKUP } from '@/app/graphql/LeadSource';
import { CONTACT_LOOKUP } from '@/app/graphql/Contact';
import { ACCOUNT_LOOKUP } from '@/app/graphql/Account';

export const metadata: Metadata = {
  title: 'Add Contact'
};

export const revalidate = 0;

export default async function AddContactPage() {
  let arrCountryLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  let arrLeadSourceLookup: LookupDTO[] = [];
  let arrContactLookup: LookupDTO[] = [];
  let arrAccountLookup: LookupDTO[] = [];
  let dtoUser: UserDTO = USER;
  const dtoContact: ContactDTO = { ...CONTACT };
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
      query: CONTACT_LOOKUP,
      variables: { account_id: 0 }
    });
    const result4 = apolloClient.query({
      query: ACCOUNT_LOOKUP
    });
    const result5 = apolloClient.query({
      query: GET_USER_MY_PROFILE
    });
    const results = await Promise.all([result, result1, result2, result3, result4, result5]);

    if (results[0]?.data?.getCountryLookup) {
      arrCountryLookup = results[0].data.getCountryLookup;
    }
    if (results[1]?.data?.getUserLookup) {
      arrAssignedToLookup = results[1].data.getUserLookup;
    }
    if (results[2]?.data?.getLeadSourceLookup) {
      arrLeadSourceLookup = results[2].data.getLeadSourceLookup;
    }
    if (results[3]?.data?.getContactLookup) {
      arrContactLookup = results[3].data.getContactLookup;
    }
    if (results[4]?.data?.getAccountLookup) {
      arrAccountLookup = results[4].data.getAccountLookup;
    }
    if (results[5]?.data?.getUserMyProfile) {
      dtoUser = results[5].data.getUserMyProfile;
      dtoContact.assigned_to = dtoUser.id;
      dtoContact.assigned_to_user_name = dtoUser.user_name;
    }
  } catch (e) {
    console.log('test', JSON.stringify(e));
  }
  return (
    <ClientAddContact
      dtoContact={dtoContact}
      arrCountryLookup={arrCountryLookup}
      arrAssignedToLookup={arrAssignedToLookup}
      arrLeadSourceLookup={arrLeadSourceLookup}
      arrContactLookup={arrContactLookup}
      arrAccountLookup={arrAccountLookup}
    ></ClientAddContact>
  );
}
