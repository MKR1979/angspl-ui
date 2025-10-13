'use client';

import ClientAdmTech from './client-adm-tech';
import { SnackbarProvider } from '@/app/custom-components/SnackbarProvider';

export default function AdmTechPage() {
  return (
    <SnackbarProvider>
      <ClientAdmTech/>
    </SnackbarProvider>
  );
}