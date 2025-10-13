
import { Metadata } from 'next';
import ClientAddOption from './client-add-option';
import LookupDTO from '@/app/types/LookupDTO';
import { createServerApolloClient } from '@/app/common/utility';
import { MODULE_LOOKUP } from '@/app/graphql/Module';

export const metadata: Metadata = {
  title: 'Add Option'
};
export const revalidate = 0;
export default async function AddOptionPage() {
  let arrModuleLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: MODULE_LOOKUP
    });
    const results = await Promise.all([result]);

    if (results[0]?.data?.getCourseLookup) {
      arrModuleLookup = results[0].data.getCourseLookup;
    }
    console.log('hello', JSON.stringify(arrModuleLookup));
  } catch (e) {
    console.log('hello', JSON.stringify(e));
  }
  return <ClientAddOption arrModuleLookup={arrModuleLookup}></ClientAddOption>;
}