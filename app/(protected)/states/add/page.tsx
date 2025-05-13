import { Metadata } from 'next';
import ClientAddState from './client-add-state';
import LookupDTO from '@/app/types/LookupDTO';
import { createServerApolloClient } from '@/app/common/utility';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';

export const metadata: Metadata = {
  title: 'Add State'
};

export const revalidate = 0;

export default async function AddStatePage() {
  let arrCountryLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: COUNTRY_LOOKUP
    });

    const results = await Promise.all([result]);

    if (results[0]?.data?.getCountryLookup) {
      arrCountryLookup = results[0].data.getCountryLookup;
    }
    console.log('hello', JSON.stringify(arrCountryLookup));
  } catch (e) {
    console.log('hello', JSON.stringify(e));
  }
  return <ClientAddState arrCountryLookup={arrCountryLookup}></ClientAddState>;
}
