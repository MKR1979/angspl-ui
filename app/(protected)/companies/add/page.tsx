import { Metadata } from 'next';
import ClientAddCompany from './client-add-company';
export const metadata: Metadata = {
  title: 'Add Company'
};

export const revalidate = 0;

export default async function AddCompanyPage() {
  return <ClientAddCompany></ClientAddCompany>;
}
