import { Metadata } from 'next';
import ClientAddAttendance from './client-add-attendance';
export const metadata: Metadata = {
  title: 'Add Attendance'
};

export const revalidate = 0;

export default async function AddAttendancePage() {
  return <ClientAddAttendance></ClientAddAttendance>;
}
