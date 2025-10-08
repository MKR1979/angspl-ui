import ClientExamMgmt from './client-exam-mgmt';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admission Management'
};
export const revalidate = 0;
export default async function ExamMgmtPage() {
  return <ClientExamMgmt></ClientExamMgmt>;
}
