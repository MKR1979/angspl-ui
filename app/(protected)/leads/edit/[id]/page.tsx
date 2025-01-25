import { Metadata } from 'next';
import ClientEditLead from './client-edit-lead';
import { GET_LEAD } from '@/app/graphql/Lead';
import { createServerApolloClient } from '@/app/common/utility';
import LeadDTO, { LEAD } from '@/app/types/LeadDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { USER_LOOKUP } from '@/app/graphql/User';
import { LEAD_SOURCE_LOOKUP } from '@/app/graphql/LeadSource';

export const metadata: Metadata = {
  title: 'Edit Lead'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditLeadPage({ params }: Props) {
  const { id } = await params;
  let dtoLead: LeadDTO = LEAD;
  let arrCountryLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  let arrLeadSourceLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_LEAD,
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

    const results = await Promise.all([result, result1, result2, result3]);
    if (results[0]?.data?.getLead) {
      dtoLead = results[0].data.getLead;
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
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return (
    <ClientEditLead
      dtoLead={dtoLead}
      arrCountryLookup={arrCountryLookup}
      arrAssignedToLookup={arrAssignedToLookup}
      arrLeadSourceLookup={arrLeadSourceLookup}
    />
  );
}
