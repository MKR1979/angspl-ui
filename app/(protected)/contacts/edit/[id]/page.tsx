import { Metadata } from 'next';
import ClientEditContact from './client-edit-contact';
import { CONTACT_LOOKUP, GET_CONTACT } from '@/app/graphql/Contact';
import { createServerApolloClient } from '@/app/common/utility';
import ContactDTO, { CONTACT } from '@/app/types/ContactDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { USER_LOOKUP } from '@/app/graphql/User';
import { LEAD_SOURCE_LOOKUP } from '@/app/graphql/LeadSource';
import { ACCOUNT_LOOKUP } from '@/app/graphql/Account';

export const metadata: Metadata = {
  title: 'Edit Contact'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditContactPage({ params }: Props) {
  const { id } = await params;
  let dtoContact: ContactDTO = CONTACT;
  let arrCountryLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  let arrLeadSourceLookup: LookupDTO[] = [];
  let arrContactLookup: LookupDTO[] = [];
  let arrAccountLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_CONTACT,
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
      query: LEAD_SOURCE_LOOKUP
    });
    const result4 = apolloClient.query({
      query: CONTACT_LOOKUP,
      variables: { account_id: 0 }
    });
    const result5 = apolloClient.query({
      query: ACCOUNT_LOOKUP
    });
    const results = await Promise.all([result, result1, result2, result3, result4, result5]);
    if (results[0]?.data?.getContact) {
      dtoContact = results[0].data.getContact;
    }
    if (results[1]?.data?.getCountryLookup) {
      arrCountryLookup = results[1].data.getCountryLookup;
    }
    if (results[2]?.data?.getUserLookup) {
      arrAssignedToLookup = results[2].data.getUserLookup;
    }
    if (results[3]?.data?.getLeadSourceLookup) {
      arrLeadSourceLookup = results[3].data.getLeadSourceLookup;
    }
    if (results[4]?.data?.getContactLookup) {
      arrContactLookup = results[4].data.getContactLookup;
    }
    if (results[5]?.data?.getAccountLookup) {
      arrAccountLookup = results[5].data.getAccountLookup;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return (
    <ClientEditContact
      dtoContact={dtoContact}
      arrCountryLookup={arrCountryLookup}
      arrAssignedToLookup={arrAssignedToLookup}
      arrLeadSourceLookup={arrLeadSourceLookup}
      arrContactLookup={arrContactLookup}
      arrAccountLookup={arrAccountLookup}
    />
  );
}
