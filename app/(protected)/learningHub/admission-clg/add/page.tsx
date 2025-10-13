import { Metadata } from 'next';
import ClientAddAdmissionClg from './client-add-admission-clg';
export const metadata: Metadata = {
  title: 'Add Admission'
};

export const revalidate = 0;
export default async function AddAdmissionClgPage() {
  return <ClientAddAdmissionClg></ClientAddAdmissionClg>;
}
