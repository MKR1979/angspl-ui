import { Metadata } from 'next';
import ClientDailyAttendanceList from './client-daily-attendance-list';
import { ATTENDANCE_LIST } from '@/app/graphql/Attendance';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import TrackPresenceDTO from '@/app/types/TrackPresenceDTO';
export const metadata: Metadata = {
  title: 'Daily Attendance'
};

export const revalidate = 0;

export default async function DailyAttendanceListPage() {
  let arrTrackPresenceDTO: TrackPresenceDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: ATTENDANCE_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getAttendanceList?.attendances) {
      arrTrackPresenceDTO = results[0].data.getAttendanceList.attendances;
    }
    if (results[0]?.data?.getAttendanceList?.total_records) {
      total_records = results[0].data.getAttendanceList.total_records;
    }
  } catch {}
  return <ClientDailyAttendanceList arrTrackPresenceDTO={arrTrackPresenceDTO} total_records={total_records}></ClientDailyAttendanceList>;
}
