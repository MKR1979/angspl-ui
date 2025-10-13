'use client';

import ClientSingUp from './client-sign-up';
import { SnackbarProvider } from '@/app/custom-components/SnackbarProvider';

export default function ContactUsPage() {
  return (
    <SnackbarProvider>
      <ClientSingUp />
    </SnackbarProvider>
  );
}

