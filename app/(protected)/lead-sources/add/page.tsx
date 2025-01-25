import { Metadata } from 'next';
import ClientAddLeadSource from './client-add-lead-source';

export const metadata: Metadata = {
  title: 'Add Lead Source'
};

export const revalidate = 0;

export default async function AddLeadSourcePage() {
  return <ClientAddLeadSource></ClientAddLeadSource>;
}
