import { Metadata } from 'next';
import ClientAddCodeProject from './client-add-code-project';
import LookupDTO from '@/app/types/LookupDTO';
import { createServerApolloClient } from '@/app/common/utility';
import { COURSE_LOOKUP } from '@/app/graphql/Course';

export const metadata: Metadata = {
  title: 'Add Code Project'
};

export const revalidate = 0;

export default async function AddCodeProjectPage() {
  let arrCourseLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: COURSE_LOOKUP
    });

    const results = await Promise.all([result]);

    if (results[0]?.data?.getCourseLookup) {
      arrCourseLookup = results[0].data.getCourseLookup;
    }
    console.log('hello', JSON.stringify(arrCourseLookup));
  } catch (e) {
    console.log('hello', JSON.stringify(e));
  }
  return <ClientAddCodeProject arrCourseLookup={arrCourseLookup}></ClientAddCodeProject>;
}