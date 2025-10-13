import { Metadata } from 'next';
import ClientViewMeeting from './client-view-meeting';
import { GET_MEETING } from '@/app/graphql/Meeting';
import { createServerApolloClient } from '@/app/common/utility';
import MeetingDTO, { MEETING } from '@/app/types/MeetingDTO';

export const metadata: Metadata = {
  title: 'View Meeting'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewMeetingPage({ params }: Props) {
  const { id } = await params;
  let dtoMeeting: MeetingDTO = MEETING;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_MEETING,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getMeeting) {
      dtoMeeting = results[0].data.getMeeting;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewMeeting dtoMeeting={dtoMeeting}></ClientViewMeeting>;
}
