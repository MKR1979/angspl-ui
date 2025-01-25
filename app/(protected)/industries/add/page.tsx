import { Metadata } from 'next';
import ClientAddIndustry from './client-add-industry';

export const metadata: Metadata = {
  title: 'Add Industry'
};

export const revalidate = 0;

export default async function AddIndustryPage() {
  return <ClientAddIndustry></ClientAddIndustry>;
}
