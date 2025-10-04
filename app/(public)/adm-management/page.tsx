import ClientAdmMng from './client-adm-mng';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admission Management'
};
export const revalidate = 0;
export default async function AdmMngPage() {
  return <ClientAdmMng></ClientAdmMng>;
}
