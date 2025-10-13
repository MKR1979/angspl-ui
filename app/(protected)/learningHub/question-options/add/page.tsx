import { Metadata } from 'next';
import ClientAddQuestionOptions from './client-add-question-options';
export const metadata: Metadata = {
  title: 'Add Option'
};

export const revalidate = 0;

export default async function AddQuestionOptionsPage() {
  return <ClientAddQuestionOptions></ClientAddQuestionOptions>;
}

