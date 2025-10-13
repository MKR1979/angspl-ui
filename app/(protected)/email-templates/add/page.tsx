import { Metadata } from 'next';
import ClientAddEmailTemplate from './client-add-email_template';

export const metadata: Metadata = {
  title: 'Add Email Template'
};

export const revalidate = 0;

export default async function AddEmailTemplatePage() {
  return <ClientAddEmailTemplate></ClientAddEmailTemplate>;
}
