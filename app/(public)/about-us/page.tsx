import { Metadata } from 'next';
import ClientAboutUs from './client-about-us';

export const metadata: Metadata = {
  title: 'About Us'
};

export const revalidate = 0;

export default async function AboutUsPage() {
  return <ClientAboutUs></ClientAboutUs>;
}
