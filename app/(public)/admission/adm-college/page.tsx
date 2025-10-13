'use client';

import ClientAdmCollege from './client-adm-college';
import { SnackbarProvider } from '@/app/custom-components/SnackbarProvider';

export default function AdmCollegePage() {
  return (
    <SnackbarProvider>
      <ClientAdmCollege />
    </SnackbarProvider>
  );
}