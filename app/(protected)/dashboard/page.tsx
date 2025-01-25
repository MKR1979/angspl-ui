import { Metadata } from 'next';
import ClientDashboard from './client-dashboard';
export const metadata: Metadata = {
  title: 'Dashboard'
};
export const revalidate = 0;
export default async function DashboardPage() {
  return <ClientDashboard></ClientDashboard>;
}
