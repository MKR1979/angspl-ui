import { Metadata } from 'next';
import ClientEditMeeting from './client-edit-meeting';
import { GET_MEETING } from '@/app/graphql/Meeting';
import { createServerApolloClient } from '@/app/common/utility';
import MeetingDTO, { MEETING } from '@/app/types/MeetingDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { USER_LOOKUP } from '@/app/graphql/User';
import { LOCATION_LOOKUP } from '@/app/graphql/Location';

export const metadata: Metadata = {
  title: 'Edit Meeting'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditMeetingPage({ params }: Props) {
  const { id } = await params;
  let dtoMeeting: MeetingDTO = MEETING;
  let arrLocationLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_MEETING,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: LOCATION_LOOKUP
    });
    const result2 = apolloClient.query({
      query: USER_LOOKUP
    });
    const results = await Promise.all([result, result1, result2]);
    if (results[0]?.data?.getMeeting) {
      dtoMeeting = results[0].data.getMeeting;
    }
    if (results[1]?.data?.getLocationLookup) {
      arrLocationLookup = results[1].data.getLocationLookup;
    }
    if (results[2]?.data?.getUserLookup) {
      arrAssignedToLookup = results[2].data.getUserLookup;
    }
  } catch {}
  return <ClientEditMeeting dtoMeeting={dtoMeeting} arrLocationLookup={arrLocationLookup} arrAssignedToLookup={arrAssignedToLookup} />;
}
