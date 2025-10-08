import ClientStuMgmt from './client-stu-mgmt';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Management'
};
export const revalidate = 0;
export default async function StuMgmtPage() {
  return <ClientStuMgmt></ClientStuMgmt>;
}
