import ClientFreeCourse from './client-free-course';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Course'
};
export const revalidate = 0;

export default async function Page() {
  return <ClientFreeCourse></ClientFreeCourse>;
}