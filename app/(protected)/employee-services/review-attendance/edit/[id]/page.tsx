
import { Metadata } from 'next';
import ClientEditAttendance from './client-edit-review-attendance';
import { GET_ATTENDANCE } from '@/app/graphql/Attendance';
import { createServerApolloClient } from '@/app/common/utility';
import AttendanceDTO, { ATTENDANCE } from '@/app/types/AttendanceDTO';

export const metadata: Metadata = {
  title: 'Edit Attendance'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditAttendancePage({ params }: Props) {
  const { id } = await params;
  console.log('Debug: Received attendance ID from params ->', id); // DEBUG POINT

  let dtoAttendance: AttendanceDTO = ATTENDANCE;

  try {
    const apolloClient = await createServerApolloClient();
    console.log('Debug: Apollo Client initialized'); // DEBUG POINT

    const result = await apolloClient.query({
      query: GET_ATTENDANCE,
      variables: {
        id: parseInt(id)
      }
    });

    console.log('Debug: GraphQL result ->', result); // DEBUG POINT

    if (result?.data?.getAttendance) {
      dtoAttendance = { ...result.data.getAttendance };
      console.log('Debug: Parsed attendance DTO ->', dtoAttendance); // DEBUG POINT
    } else {
      console.warn('Warning: No attendance data found for ID ->', id); // DEBUG POINT
    }
  } catch (error) {
    console.error('Error while fetching attendance:', error); // DEBUG POINT
  }

  return <ClientEditAttendance dtoAttendance={dtoAttendance} />;
}
