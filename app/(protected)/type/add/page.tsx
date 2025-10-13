import { Metadata } from 'next';
import ClientAddType from './client-add-type';

export const metadata: Metadata = {
  title: 'Add Type'
};

export const revalidate = 0;

export default async function AddTypePage() {
  return <ClientAddType></ClientAddType>;
}
