import { Metadata } from 'next';
import ClientEditCase from './client-edit-case';
import { GET_CASE } from '@/app/graphql/Case';
import { createServerApolloClient } from '@/app/common/utility';
import CaseDTO, { CASE } from '@/app/types/CaseDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { USER_LOOKUP } from '@/app/graphql/User';
import { ACCOUNT_LOOKUP } from '@/app/graphql/Account';
import { CASE_TYPE_LOOKUP } from '@/app/graphql/CaseType';

export const metadata: Metadata = {
  title: 'Edit Case'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditCasePage({ params }: Props) {
  const { id } = await params;
  let dtoCase: CaseDTO = CASE;
  let arrAccountLookup: LookupDTO[] = [];
  const arrCasePriorityLookup: LookupDTO[] = [];
  const arrCaseStatusLookup: LookupDTO[] = [];
  const arrCaseStateLookup: LookupDTO[] = [];
  let arrCaseTypeLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_CASE,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: ACCOUNT_LOOKUP
    });
    const result2 = apolloClient.query({
      query: CASE_TYPE_LOOKUP
    });
    const result3 = apolloClient.query({
      query: USER_LOOKUP
    });
    const results = await Promise.all([result, result1, result2, result3]);
    if (results[0]?.data?.getCase) {
      dtoCase = results[0].data.getCase;
    }
    if (results[1]?.data?.getAccountLookup) {
      arrAccountLookup = results[1].data.getAccountLookup;
    }
    if (results[2]?.data?.getCaseTypeLookup) {
      arrCaseTypeLookup = results[2].data.getCaseTypeLookup;
    }
    if (results[3]?.data?.getUserLookup) {
      arrAssignedToLookup = results[3].data.getUserLookup;
    }
  } catch {}
  return (
    <ClientEditCase
      dtoCase={dtoCase}
      arrAccountLookup={arrAccountLookup}
      arrCasePriorityLookup={arrCasePriorityLookup}
      arrCaseStatusLookup={arrCaseStatusLookup}
      arrCaseStateLookup={arrCaseStateLookup}
      arrCaseTypeLookup={arrCaseTypeLookup}
      arrAssignedToLookup={arrAssignedToLookup}
    />
  );
}
