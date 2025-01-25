import { Metadata } from 'next';
import ClientEventList from './client-event-list';
import EventCalendarDTO from '@/app/types/EventCalendarDTO';

export const metadata: Metadata = {
  title: 'Events'
};

export const revalidate = 0;

export default async function EventListPage() {
  const arrEventCalendarDTO: EventCalendarDTO[] = [];
  return <ClientEventList arrEventCalendarDTO={arrEventCalendarDTO} />;
}
