import { Metadata } from 'next';
import ClientAddEmployeeReview from './client-add-employee-review';
export const metadata: Metadata = {
  title: 'Add Employee'
};

export const revalidate = 0;
export default async function AddEmployeeReviewPage() {
  return <ClientAddEmployeeReview></ClientAddEmployeeReview>;
}
