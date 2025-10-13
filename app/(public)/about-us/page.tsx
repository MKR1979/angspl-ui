import { Metadata } from 'next';
import AboutUs from './client-about-us';

export const metadata: Metadata = {
  title: 'About Us'
};

export const revalidate = 0;

export default async function AboutUsPage() {
  return <AboutUs></AboutUs>;
}
