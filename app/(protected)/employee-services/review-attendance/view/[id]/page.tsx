
import { Metadata } from 'next';
import ClientViewAttendance from './client-view-review-attendance';
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

    console.log('Calling GET_ATTENDANCE with id:', parseInt(id));

    const result = apolloClient.query({
      query: GET_ATTENDANCE,
      variables: {
        id: parseInt(id)
      }
    });

    const results = await Promise.all([result]);

    console.log('GraphQL result:', JSON.stringify(results[0], null, 2));

    if (results[0]?.data?.getAttendance) {
      dtoAttendance = results[0].data.getAttendance;
      console.log('dtoAttendance populated:', dtoAttendance);
    } else {
      console.warn('No getAttendance data found for ID:', id);
    }
  } catch (err) {
    console.error('GraphQL query failed:', JSON.stringify(err));
  }

  return <ClientViewAttendance dtoAttendance={dtoAttendance} />;
}
