import { Metadata } from 'next';
import ClientEditEvent from './client-edit-event';
import { GET_EVENT } from '@/app/graphql/Event';
import { createServerApolloClient } from '@/app/common/utility';
import EventDTO, { EVENT } from '@/app/types/EventDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { USER_LOOKUP } from '@/app/graphql/User';
import { CURRENCY_LOOKUP } from '@/app/graphql/Currency';
import { LOCATION_LOOKUP } from '@/app/graphql/Location';

export const metadata: Metadata = {
  title: 'Edit Event'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditEventPage({ params }: Props) {
  const { id } = await params;
  let dtoEvent: EventDTO = EVENT;
  let arrCurrencyLookup: LookupDTO[] = [];
  let arrLocationLookup: LookupDTO[] = [];
  const arrEmailTemplateLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_EVENT,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: CURRENCY_LOOKUP
    });
    const result2 = apolloClient.query({
      query: LOCATION_LOOKUP
    });
    const result3 = apolloClient.query({
      query: USER_LOOKUP
    });
    const results = await Promise.all([result, result1, result2, result3]);
    if (results[0]?.data?.getEvent) {
      dtoEvent = results[0].data.getEvent;
    }
    if (results[1]?.data?.getCurrencyLookup) {
      arrCurrencyLookup = results[1].data.getCurrencyLookup;
    }
    if (results[2]?.data?.getLocationLookup) {
      arrLocationLookup = results[2].data.getLocationLookup;
    }
    if (results[3]?.data?.getUserLookup) {
      arrAssignedToLookup = results[3].data.getUserLookup;
    }
  } catch {}

  return (
    <ClientEditEvent
      dtoEvent={dtoEvent}
      arrCurrencyLookup={arrCurrencyLookup}
      arrLocationLookup={arrLocationLookup}
      arrEmailTemplateLookup={arrEmailTemplateLookup}
      arrAssignedToLookup={arrAssignedToLookup}
    />
  );
}
