import { Metadata } from 'next';
import ClientViewEvent from './client-view-event';
import { GET_EVENT } from '@/app/graphql/Event';
import { createServerApolloClient } from '@/app/common/utility';
import EventDTO, { EVENT } from '@/app/types/EventDTO';

export const metadata: Metadata = {
  title: 'View Event'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewEventPage({ params }: Props) {
  const { id } = await params;
  let dtoEvent: EventDTO = EVENT;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_EVENT,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getEvent) {
      dtoEvent = results[0].data.getEvent;
    }
  } catch {}
  return <ClientViewEvent dtoEvent={dtoEvent}></ClientViewEvent>;
}
