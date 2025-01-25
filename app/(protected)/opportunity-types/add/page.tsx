import { Metadata } from 'next';
import ClientAddOpportunityType from './client-add-opportunity-type';

export const metadata: Metadata = {
  title: 'Add Opportunity Type'
};

export const revalidate = 0;

export default async function AddOpportunityTypePage() {
  return <ClientAddOpportunityType></ClientAddOpportunityType>;
}
