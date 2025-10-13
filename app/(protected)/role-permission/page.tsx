import { Metadata } from 'next';
import ClientRolePermissionList from './client-role-permission-list';

export const metadata: Metadata = {
  title: 'Review Role Permission'
};

export const revalidate = 0;

export default function RolePermissionListPage() {
  return <ClientRolePermissionList />;
}
