import { Metadata } from 'next';
import ClientChangePassword from './client-change-password';

export const metadata: Metadata = {
  title: 'Change Password'
};

export const revalidate = 0;

export default async function EditUserPage() {
  return <ClientChangePassword />;
}
