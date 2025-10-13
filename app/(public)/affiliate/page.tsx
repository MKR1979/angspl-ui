'use client';

import ClientAffiliate from './client-affiliate';
import { SnackbarProvider } from '@/app/custom-components/SnackbarProvider';

export default function ContactUsPage() {
  return (
    <SnackbarProvider>
      <ClientAffiliate />
    </SnackbarProvider>
  );
}
