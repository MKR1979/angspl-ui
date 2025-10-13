import { Metadata } from 'next';
import ClientMeetingList from './client-meeting-list';
import MeetingCalendarDTO from '@/app/types/MeetingCalendarDTO';

export const metadata: Metadata = {
  title: 'Meetings'
};

export const revalidate = 0;

export default async function MeetingListPage() {
  const arrMeetingCalendarDTO: MeetingCalendarDTO[] = [];
  return <ClientMeetingList arrMeetingCalendarDTO={arrMeetingCalendarDTO} />;
}
