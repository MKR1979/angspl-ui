'use client';

import ContactUs from './contact-us';
import { SnackbarProvider } from '@/app/custom-components/SnackbarProvider';

export default function ContactUsPage() {
  return (
    <SnackbarProvider>
      <ContactUs />
    </SnackbarProvider>
  );
}
