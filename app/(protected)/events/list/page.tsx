import { Metadata } from 'next';
import ClientEventList from './client-event-list';
import { EVENT_LIST } from '@/app/graphql/Event';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import EventDTO from '@/app/types/EventDTO';
export const metadata: Metadata = {
  title: 'Events'
};

export const revalidate = 0;

export default async function EventListPage() {
  let arrEventDTO: EventDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: EVENT_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getEventList?.events) {
      arrEventDTO = results[0].data.getEventList.events;
    }
    if (results[0]?.data?.getEventList?.total_records) {
      total_records = results[0].data.getEventList.total_records;
    }
  } catch {}
  return <ClientEventList arrEventDTO={arrEventDTO} total_records={total_records}></ClientEventList>;
}
