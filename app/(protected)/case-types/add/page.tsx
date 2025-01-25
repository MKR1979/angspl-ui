import { Metadata } from 'next';
import ClientAddCaseType from './client-add-case-type';

export const metadata: Metadata = {
  title: 'Add Case Type'
};

export const revalidate = 0;

export default async function AddCaseTypePage() {
  return <ClientAddCaseType></ClientAddCaseType>;
}
