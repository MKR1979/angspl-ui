import { Metadata } from 'next';
import ClientAddCase from './client-add-case';
import LookupDTO from '@/app/types/LookupDTO';
import { createServerApolloClient } from '@/app/common/utility';
import { USER_LOOKUP } from '@/app/graphql/User';
import CaseDTO, { CASE } from '@/app/types/CaseDTO';
import { ACCOUNT_LOOKUP } from '@/app/graphql/Account';
import { CASE_TYPE_LOOKUP } from '@/app/graphql/CaseType';

export const metadata: Metadata = {
  title: 'Add Case'
};

export const revalidate = 0;

export default async function AddCasePage() {
  let arrAccountLookup: LookupDTO[] = [];
  const arrCasePriorityLookup: LookupDTO[] = [];
  const arrCaseStatusLookup: LookupDTO[] = [];
  const arrCaseStateLookup: LookupDTO[] = [];
  let arrCaseTypeLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  const dtoCase: CaseDTO = { ...CASE };
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: ACCOUNT_LOOKUP
    });
    const result1 = apolloClient.query({
      query: CASE_TYPE_LOOKUP
    });
    const result2 = apolloClient.query({
      query: USER_LOOKUP
    });
    const results = await Promise.all([result, result1, result2]);
    if (results[0]?.data?.getAccountLookup) {
      arrAccountLookup = results[0].data.getAccountLookup;
    }
    if (results[1]?.data?.getCaseTypeLookup) {
      arrCaseTypeLookup = results[1].data.getCaseTypeLookup;
    }
    if (results[2]?.data?.getUserLookup) {
      arrAssignedToLookup = results[2].data.getUserLookup;
    }
  } catch (e) {
    console.log('test', JSON.stringify(e));
  }
  return (
    <ClientAddCase
      dtoCase={dtoCase}
      arrAccountLookup={arrAccountLookup}
      arrCasePriorityLookup={arrCasePriorityLookup}
      arrCaseStatusLookup={arrCaseStatusLookup}
      arrCaseStateLookup={arrCaseStateLookup}
      arrCaseTypeLookup={arrCaseTypeLookup}
      arrAssignedToLookup={arrAssignedToLookup}
    ></ClientAddCase>
  );
}
