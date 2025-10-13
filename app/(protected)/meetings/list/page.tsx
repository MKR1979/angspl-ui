import { Metadata } from 'next';
import ClientMeetingList from './client-meeting-list';
import { MEETING_LIST } from '@/app/graphql/Meeting';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import MeetingDTO from '@/app/types/MeetingDTO';
export const metadata: Metadata = {
  title: 'Opportunities'
};

export const revalidate = 0;

export default async function MeetingListPage() {
  let arrMeetingDTO: MeetingDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: MEETING_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getMeetingList?.meetings) {
      arrMeetingDTO = results[0].data.getMeetingList.meetings;
    }
    if (results[0]?.data?.getMeetingList?.total_records) {
      total_records = results[0].data.getMeetingList.total_records;
    }
  } catch {}
  return <ClientMeetingList arrMeetingDTO={arrMeetingDTO} total_records={total_records}></ClientMeetingList>;
}
