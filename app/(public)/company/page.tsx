import ClientCompany from './client-company-details';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Company'
};
export const revalidate = 0;
export default async function CompanyPage() {
  return <ClientCompany></ClientCompany>;
}
