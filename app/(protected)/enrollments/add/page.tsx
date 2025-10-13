import { Metadata } from 'next';
import ClientAddEnrollment from './client-add-enrollment';

export const metadata: Metadata = {
  title: 'Add Enrollment'
};

export const revalidate = 0;

export default async function AddEnrollmentPage() {
  return <ClientAddEnrollment></ClientAddEnrollment>;
}
