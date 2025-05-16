import ClientSingUp from './client-sign-up';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account'
};
export const revalidate = 0;
export default async function LoginPage() {
  return <ClientSingUp></ClientSingUp>;
}
