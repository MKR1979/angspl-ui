import { Metadata } from 'next';
import ClientPrograms from './client-programs';
import { SnackbarProvider } from '@/app/custom-components/SnackbarProvider';

export const metadata: Metadata = {
  title: 'Program'
};

export const revalidate = 0;

export default async function ProgramPage() {
  return(
  <SnackbarProvider>
   <ClientPrograms/>
   </SnackbarProvider>
   );
}
