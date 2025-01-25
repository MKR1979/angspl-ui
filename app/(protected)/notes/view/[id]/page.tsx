import { Metadata } from 'next';
import ClientViewNote from './client-view-note';
import { GET_NOTE } from '@/app/graphql/Note';
import { createServerApolloClient } from '@/app/common/utility';
import NoteDTO, { NOTE } from '@/app/types/NoteDTO';

export const metadata: Metadata = {
  title: 'View Note'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewNotePage({ params }: Props) {
  const { id } = await params;
  let dtoNote: NoteDTO = NOTE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_NOTE,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getNote) {
      dtoNote = results[0].data.getNote;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewNote dtoNote={dtoNote}></ClientViewNote>;
}
