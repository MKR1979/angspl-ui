import { Metadata } from 'next';
import ClientStudentInfo from './client-student-info';
export const metadata: Metadata = {
  title: 'Student Info'
};

export const revalidate = 0;
export default async function StudentInfo() {
  return <ClientStudentInfo></ClientStudentInfo>;
}