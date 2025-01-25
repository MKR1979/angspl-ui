import { Metadata } from 'next';
import ClientEditOpportunity from './client-edit-opportunity';
import { GET_OPPORTUNITY } from '@/app/graphql/Opportunity';
import { createServerApolloClient } from '@/app/common/utility';
import OpportunityDTO, { OPPORTUNITY } from '@/app/types/OpportunityDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { USER_LOOKUP } from '@/app/graphql/User';
import { ACCOUNT_LOOKUP } from '@/app/graphql/Account';
import { CURRENCY_LOOKUP } from '@/app/graphql/Currency';
import { STAGE_LOOKUP } from '@/app/graphql/Stage';
import { OPPORTUNITY_TYPE_LOOKUP } from '@/app/graphql/OpportunityType';
import { LEAD_SOURCE_LOOKUP } from '@/app/graphql/LeadSource';

export const metadata: Metadata = {
  title: 'Edit Opportunity'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditOpportunityPage({ params }: Props) {
  const { id } = await params;
  let dtoOpportunity: OpportunityDTO = OPPORTUNITY;
  let arrAccountLookup: LookupDTO[] = [];
  let arrCurrencyLookup: LookupDTO[] = [];
  let arrStageLookup: LookupDTO[] = [];
  let arrOpportunityTypeLookup: LookupDTO[] = [];
  let arrLeadSourceLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_OPPORTUNITY,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: ACCOUNT_LOOKUP
    });
    const result2 = apolloClient.query({
      query: CURRENCY_LOOKUP
    });
    const result3 = apolloClient.query({
      query: STAGE_LOOKUP
    });
    const result4 = apolloClient.query({
      query: OPPORTUNITY_TYPE_LOOKUP
    });
    const result5 = apolloClient.query({
      query: LEAD_SOURCE_LOOKUP
    });
    const result6 = apolloClient.query({
      query: USER_LOOKUP
    });
    const results = await Promise.all([result, result1, result2, result3, result4, result5, result6]);
    if (results[0]?.data?.getOpportunity) {
      dtoOpportunity = results[0].data.getOpportunity;
    }
    if (results[1]?.data?.getAccountLookup) {
      arrAccountLookup = results[1].data.getAccountLookup;
    }
    if (results[2]?.data?.getCurrencyLookup) {
      arrCurrencyLookup = results[2].data.getCurrencyLookup;
    }
    if (results[3]?.data?.getStageLookup) {
      arrStageLookup = results[3].data.getStageLookup;
    }
    if (results[4]?.data?.getOpportunityTypeLookup) {
      arrOpportunityTypeLookup = results[4].data.getOpportunityTypeLookup;
    }
    if (results[5]?.data?.getLeadSourceLookup) {
      arrLeadSourceLookup = results[5].data.getLeadSourceLookup;
    }
    if (results[6]?.data?.getUserLookup) {
      arrAssignedToLookup = results[6].data.getUserLookup;
    }
  } catch {}
  return (
    <ClientEditOpportunity
      dtoOpportunity={dtoOpportunity}
      arrAccountLookup={arrAccountLookup}
      arrCurrencyLookup={arrCurrencyLookup}
      arrStageLookup={arrStageLookup}
      arrOpportunityTypeLookup={arrOpportunityTypeLookup}
      arrLeadSourceLookup={arrLeadSourceLookup}
      arrAssignedToLookup={arrAssignedToLookup}
    />
  );
}
