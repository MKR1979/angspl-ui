import { Metadata } from 'next';
import ClientAddAdmissionReview from './client-add-admission-review';
export const metadata: Metadata = {
  title: 'Add admissions'
};

export const revalidate = 0;
export default async function AddAdmissionReviewPage() {
  return <ClientAddAdmissionReview></ClientAddAdmissionReview>;
}
