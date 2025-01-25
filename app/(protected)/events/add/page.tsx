import { Metadata } from 'next';
import ClientAddEvent from './client-add-event';
import LookupDTO from '@/app/types/LookupDTO';
import { createServerApolloClient } from '@/app/common/utility';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import UserDTO, { USER } from '@/app/types/UserDTO';
import EventDTO, { EVENT } from '@/app/types/EventDTO';
import { CURRENCY_LOOKUP } from '@/app/graphql/Currency';
import { LOCATION_LOOKUP } from '@/app/graphql/Location';

export const metadata: Metadata = {
  title: 'Add Event'
};

export const revalidate = 0;

export default async function AddEventPage() {
  let arrCurrencyLookup: LookupDTO[] = [];
  let arrLocationLookup: LookupDTO[] = [];
  const arrEmailTemplateLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  let dtoUser: UserDTO = USER;
  const dtoEvent: EventDTO = { ...EVENT };
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: CURRENCY_LOOKUP
    });
    const result1 = apolloClient.query({
      query: LOCATION_LOOKUP
    });
    const result2 = apolloClient.query({
      query: USER_LOOKUP
    });
    const result3 = apolloClient.query({
      query: GET_USER_MY_PROFILE
    });
    const results = await Promise.all([result, result1, result2, result3]);
    if (results[0]?.data?.getCurrencyLookup) {
      arrCurrencyLookup = results[0].data.getCurrencyLookup;
    }
    if (results[1]?.data?.getLocationLookup) {
      arrLocationLookup = results[1].data.getLocationLookup;
    }
    if (results[2]?.data?.getUserLookup) {
      arrAssignedToLookup = results[2].data.getUserLookup;
    }
    if (results[3]?.data?.getUserMyProfile) {
      dtoUser = results[3].data.getUserMyProfile;
      dtoEvent.assigned_to = dtoUser.id;
      dtoEvent.assigned_to_user_name = dtoUser.user_name;
    }
  } catch (e) {
    console.log('test', JSON.stringify(e));
  }
  return (
    <ClientAddEvent
      dtoEvent={dtoEvent}
      arrCurrencyLookup={arrCurrencyLookup}
      arrLocationLookup={arrLocationLookup}
      arrEmailTemplateLookup={arrEmailTemplateLookup}
      arrAssignedToLookup={arrAssignedToLookup}
    ></ClientAddEvent>
  );
}
