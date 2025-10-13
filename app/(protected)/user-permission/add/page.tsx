import { Metadata } from 'next';
import ClientAddUserPermission from './client-add-user-permission';
export const metadata: Metadata = {
  title: 'Add User Permission'
};

export const revalidate = 0;

export default async function AddUserPermissionPage() {
  return <ClientAddUserPermission></ClientAddUserPermission>;
}

