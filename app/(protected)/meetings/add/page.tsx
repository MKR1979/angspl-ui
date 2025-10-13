import { Metadata } from 'next';
import ClientAddMeeting from './client-add-meeting';
import LookupDTO from '@/app/types/LookupDTO';
import { createServerApolloClient } from '@/app/common/utility';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import UserDTO, { USER } from '@/app/types/UserDTO';
import MeetingDTO, { MEETING } from '@/app/types/MeetingDTO';
import { LOCATION_LOOKUP } from '@/app/graphql/Location';

export const metadata: Metadata = {
  title: 'Add Meeting'
};

export const revalidate = 0;

export default async function AddMeetingPage() {
  let arrLocationLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  let dtoUser: UserDTO = USER;
  const dtoMeeting: MeetingDTO = { ...MEETING };
  try {
    const apolloClient = await createServerApolloClient();

    const result = apolloClient.query({
      query: LOCATION_LOOKUP
    });
    const result1 = apolloClient.query({
      query: USER_LOOKUP
    });
    const result2 = apolloClient.query({
      query: GET_USER_MY_PROFILE
    });
    const results = await Promise.all([result, result1, result2]);

    if (results[0]?.data?.getLocationLookup) {
      arrLocationLookup = results[0].data.getLocationLookup;
    }
    if (results[1]?.data?.getUserLookup) {
      arrAssignedToLookup = results[1].data.getUserLookup;
    }
    if (results[2]?.data?.getUserMyProfile) {
      dtoUser = results[2].data.getUserMyProfile;
      dtoMeeting.assigned_to = dtoUser.id;
      dtoMeeting.assigned_to_user_name = dtoUser.user_name;
    }
  } catch (e) {
    console.log('test', JSON.stringify(e));
  }
  return (
    <ClientAddMeeting
      dtoMeeting={dtoMeeting}
      arrLocationLookup={arrLocationLookup}
      arrAssignedToLookup={arrAssignedToLookup}
    ></ClientAddMeeting>
  );
}
