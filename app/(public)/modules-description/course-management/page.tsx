import ClientCourseMgmt from './client-course-mgmt';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admission Management'
};
export const revalidate = 0;
export default async function AdmMngPage() {
  return <ClientCourseMgmt></ClientCourseMgmt>;
}
