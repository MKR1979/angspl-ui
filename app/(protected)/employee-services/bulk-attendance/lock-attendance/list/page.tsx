import { Metadata } from 'next';
import ClientLockAttendanceList from './client-lock-attendance-list';
import { BULK_ATTENDANCE_LIST } from '@/app/graphql/BulkAttendance';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import BulkAttendanceDTO from '@/app/types/BulkAttendanceDTO';
export const metadata: Metadata = {
  title: 'Bulk Attendance'
};

export const revalidate = 0;

export default async function AttendanceListPage() {
  let arrlockAttendanceDTO: BulkAttendanceDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: BULK_ATTENDANCE_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getBulkAttendanceList?.attendances) {
      arrlockAttendanceDTO = results[0].data.getBulkAttendanceList.attendances;
    }
    if (results[0]?.data?.getBulkAttendanceList?.total_records) {
      total_records = results[0].data.getBulkAttendanceList.total_records;
    }
  } catch {}
  return <ClientLockAttendanceList arrlockAttendanceDTO={arrlockAttendanceDTO} total_records={total_records}></ClientLockAttendanceList>;
}
