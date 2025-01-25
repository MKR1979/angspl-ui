import ClientLogin from './client-login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login'
};
export const revalidate = 0;
export default async function LoginPage() {
  return <ClientLogin></ClientLogin>;
}
