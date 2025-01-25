import { Metadata } from 'next';
import ClientAddUnit from './client-add-unit';

export const metadata: Metadata = {
  title: 'Add Unit'
};

export const revalidate = 0;

export default async function AddUnitPage() {
  return <ClientAddUnit></ClientAddUnit>;
}
