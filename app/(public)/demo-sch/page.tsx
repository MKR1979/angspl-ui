import ClientDemoSch from './client-demo-sch';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'School Management System - Demo'
};
export const revalidate = 0;

export default async function DemoPage() {
  return <ClientDemoSch />;
}
