import ClientAdmission from './client-admission';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admission Program'
};
export const revalidate = 0;
export default async function AdmissionPage() {
  return <ClientAdmission></ClientAdmission>;
}
