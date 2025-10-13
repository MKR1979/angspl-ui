import { Metadata } from 'next';
import ClientAddGroup from './client-add-group';

export const metadata: Metadata = {
  title: 'Add Group'
};

export const revalidate = 0;

export default async function AddGroupPage() {
  return <ClientAddGroup></ClientAddGroup>;
}
