import { Metadata } from 'next';
import ClientEditState from './client-edit-state';
import { GET_STATE } from '@/app/graphql/state';
import { createServerApolloClient } from '@/app/common/utility';
import StateDTO, { STATE } from '@/app/types/stateDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';

export const metadata: Metadata = {
  title: 'Edit State'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditStatePage({ params }: Props) {
  const { id } = await params;
  let arrCountryLookup: LookupDTO[] = [];
  let dtoState: StateDTO = STATE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_STATE,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: COUNTRY_LOOKUP
    });
    const results = await Promise.all([result, result1]);
    if (results[0]?.data?.getState) {
      dtoState = { ...results[0].data.getState };
      dtoState.countryLookupDTO = { id: dtoState.country_id, text: dtoState.country_name };
    }
    if (results[1]?.data) {
      arrCountryLookup = results[1].data.getCountryLookup;
    }
  } catch {}
  return <ClientEditState dtoState={dtoState} arrCountryLookup={arrCountryLookup} />;
}
