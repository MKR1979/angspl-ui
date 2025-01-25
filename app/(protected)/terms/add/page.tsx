import { Metadata } from 'next';
import ClientAddTerm from './client-add-term';

export const metadata: Metadata = {
  title: 'Add Term'
};

export const revalidate = 0;

export default async function AddTermPage() {
  return <ClientAddTerm></ClientAddTerm>;
}
