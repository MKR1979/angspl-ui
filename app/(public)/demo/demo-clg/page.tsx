import ClientDemoClg from './client-demo-clg';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'College Management System - Demo'
};
export const revalidate = 0;

export default async function DemoPage() {
  return <ClientDemoClg />;
}
