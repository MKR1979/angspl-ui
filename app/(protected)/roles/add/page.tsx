import { Metadata } from 'next';
import ClientAddRole from './client-add-role';

export const metadata: Metadata = {
  title: 'Add Role'
};

export const revalidate = 0;

export default async function AddRolePage() {
  return <ClientAddRole></ClientAddRole>;
}
