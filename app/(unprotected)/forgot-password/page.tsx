import ClientForgotPassword from './client-forgot-password';
import { SnackbarProvider } from '@/app/custom-components/SnackbarProvider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account'
};
export const revalidate = 0;
export default async function ForgotPasswordPage() {
  return( 
  <SnackbarProvider>
  <ClientForgotPassword />
  </SnackbarProvider>
  );
}