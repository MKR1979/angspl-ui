import { Metadata } from 'next';
import ClientEmployeeDashboard from './client-employee-dashboard';
export const metadata: Metadata = {
  title: 'Employee Dashboard'
};
export const revalidate = 0;
export default async function EmployeeDashboardPage() {
  return <ClientEmployeeDashboard></ClientEmployeeDashboard>;
}
