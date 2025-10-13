'use client';

import ClientAdmSchool from './client-adm-school';
import { SnackbarProvider } from '@/app/custom-components/SnackbarProvider';

export default function AdmSchoolPage() {
  return (
    <SnackbarProvider>
      <ClientAdmSchool />
    </SnackbarProvider>
  );
}