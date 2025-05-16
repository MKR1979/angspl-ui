import ClientOurService from './client-our-service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Service'
};
export const revalidate = 0;
export default async function OurServicePage() {
  return <ClientOurService></ClientOurService>;
}
