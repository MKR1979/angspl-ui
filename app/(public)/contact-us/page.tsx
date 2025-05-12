import { Metadata } from 'next';
import ClientContactUs from './client-contact-us';

export const metadata: Metadata = {
  title: 'Contact Us'
};

export const revalidate = 0;

export default async function ContactUsPage() {
  return <ClientContactUs></ClientContactUs>;
}
