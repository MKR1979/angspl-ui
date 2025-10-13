import { Metadata } from 'next';
import ClientAddCourseType from './client-add-course-type';

export const metadata: Metadata = {
  title: 'Add Course Type'
};

export const revalidate = 0;

export default async function AddCourseTypePage() {
  return <ClientAddCourseType></ClientAddCourseType>;
}
