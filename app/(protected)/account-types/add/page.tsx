import { Metadata } from 'next';
import ClientAddAccountType from './client-add-account-type';

export const metadata: Metadata = {
  title: 'Add Account Type'
};

export const revalidate = 0;

export default async function AddAccountTypePage() {
  return <ClientAddAccountType></ClientAddAccountType>;
}
