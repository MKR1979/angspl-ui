import ClientAttMgmt from './client-attendance-mgmt';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Attendance Management'
};
export const revalidate = 0;
export default async function AttMgmtPage() {
  return <ClientAttMgmt></ClientAttMgmt>;
}
