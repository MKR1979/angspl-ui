import { Metadata } from 'next';
import ClientAddAdmissionSch from './client-add-admission-sch-review';
export const metadata: Metadata = {
  title: 'Add Admission'
};

export const revalidate = 0;
export default async function AddAdmissionSchPage() {
  return <ClientAddAdmissionSch></ClientAddAdmissionSch>;
}
