import { Metadata } from 'next';
import ClientAddModule from './client-add-module';

export const metadata: Metadata = {
  title: 'Add Module'
};

export const revalidate = 0;

export default async function AddModulePage() {
  return <ClientAddModule></ClientAddModule>;
}
