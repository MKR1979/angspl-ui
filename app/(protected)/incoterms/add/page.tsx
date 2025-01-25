import { Metadata } from 'next';
import ClientAddIncoterm from './client-add-incoterm';

export const metadata: Metadata = {
  title: 'Add Incoterm'
};

export const revalidate = 0;

export default async function AddIncotermPage() {
  return <ClientAddIncoterm></ClientAddIncoterm>;
}
