import { Metadata } from 'next';
import ClientHomePage from './client-home-page';

export const metadata: Metadata = {
  title: 'Home'
};

export const revalidate = 0;

export default async function HomePage() {
  return <ClientHomePage></ClientHomePage>;
}
