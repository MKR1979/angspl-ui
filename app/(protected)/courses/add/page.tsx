import { Metadata } from 'next';
import ClientAddCourse from './client-add-course';
export const metadata: Metadata = {
  title: 'Add Course'
};

export const revalidate = 0;

export default async function AddCoursePage() {
  return <ClientAddCourse></ClientAddCourse>;
}
