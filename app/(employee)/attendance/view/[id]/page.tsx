import { Metadata } from 'next';
import ClientViewAttendance from './client-view-attendance';
import { GET_ATTENDANCE } from '@/app/graphql/Attendance';
import { createServerApolloClient } from '@/app/common/utility';
import AttendanceDTO, { ATTENDANCE } from '@/app/types/AttendanceDTO';

export const metadata: Metadata = {
  title: 'View Attendance'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewStatePage({ params }: Props) {
  const { id } = await params;
  let dtoAttendance: AttendanceDTO = ATTENDANCE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_ATTENDANCE,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getAttendance) {
      dtoAttendance = results[0].data.getAttendance;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewAttendance dtoAttendance={dtoAttendance}></ClientViewAttendance>;
}
