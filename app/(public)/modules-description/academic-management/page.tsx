import ClientAcademicMgmt from './client-academic-mgmt';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academics Management'
};
export const revalidate = 0;
export default async function AcademicsMgmtPage() {
  return <ClientAcademicMgmt></ClientAcademicMgmt>;
}
