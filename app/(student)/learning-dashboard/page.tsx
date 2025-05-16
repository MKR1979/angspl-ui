import { Metadata } from 'next';
import ClientStudentDashboard from './client-student-dashboard';
export const metadata: Metadata = {
  title: 'Learning Dashboard'
};
export const revalidate = 0;
export default async function StudentDashboardPage() {
  return <ClientStudentDashboard></ClientStudentDashboard>;
}
