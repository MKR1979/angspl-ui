import ClientPaidCourse from './client-paid-course';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paid Course'
};
export const revalidate = 0;
export default async function Page() {
  return <ClientPaidCourse></ClientPaidCourse>;
}