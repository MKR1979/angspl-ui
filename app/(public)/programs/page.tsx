import { Metadata } from 'next';
import ClientPrograms from './client-programs';

export const metadata: Metadata = {
  title: 'Program'
};

export const revalidate = 0;

export default async function ProgramPage() {
  return <ClientPrograms></ClientPrograms>;
}
