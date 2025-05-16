import { Metadata } from 'next';
import ClientUploadQuiz from './client-upload-quiz';

export const metadata: Metadata = {
  title: 'Upload Quiz'
};

export const revalidate = 0;

export default async function UploadQuizPage() {
  return <ClientUploadQuiz></ClientUploadQuiz>;
}
