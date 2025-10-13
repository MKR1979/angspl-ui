import { Metadata } from 'next';
import ThankyouClient from './client-thankYou';

export const metadata: Metadata = {
  title: 'Thank You',
};

export default function ThankyouPage() {
  return <ThankyouClient />;
}
