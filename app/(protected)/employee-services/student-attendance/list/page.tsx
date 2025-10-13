import { Metadata } from 'next';
import ClientStudentAttendanceList from './client-student-attendance-list';
import { ATTENDANCE_LEARNER_LIST } from '@/app/graphql/StudentAttendance';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import StudentAttendanceDTO from '@/app/types/StudentAttendanceDTO';
export const metadata: Metadata = {
  title: 'Mark Attendance'
};

export const revalidate = 0;

export default async function AttendanceListPage() {
  let arrStudentAttendanceDTO: StudentAttendanceDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: ATTENDANCE_LEARNER_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getLearnerAttendanceList?.attendances) {
      arrStudentAttendanceDTO = results[0].data.getLearnerAttendanceList.attendances;
    }
    if (results[0]?.data?.getLearnerAttendanceList?.total_records) {
      total_records = results[0].data.getLearnerAttendanceList.total_records;
    }
  } catch {}
  return <ClientStudentAttendanceList arrStudentAttendanceDTO={arrStudentAttendanceDTO} total_records={total_records}></ClientStudentAttendanceList>;
}
