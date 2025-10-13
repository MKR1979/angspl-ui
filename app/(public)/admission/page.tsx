import { Metadata } from 'next';
import ClientAdmissionPage from './client-admission';

export const metadata: Metadata = {
  title: 'Admission'
};

export const revalidate = 0;

export default async function HomePage() {
  return <ClientAdmissionPage></ClientAdmissionPage>;
}
