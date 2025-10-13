import { Metadata } from 'next';
import ClientAddDistrict from './client-add-district';

export const metadata: Metadata = {
  title: 'Add District'
};

export const revalidate = 0;

export default async function AddDistrictPage() {
  return <ClientAddDistrict></ClientAddDistrict>;
}
