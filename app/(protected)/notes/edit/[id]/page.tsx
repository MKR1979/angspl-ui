import { Metadata } from 'next';
import ClientEditNote from './client-edit-note';
import { GET_NOTE } from '@/app/graphql/Note';
import { createServerApolloClient } from '@/app/common/utility';
import NoteDTO, { NOTE } from '@/app/types/NoteDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { USER_LOOKUP } from '@/app/graphql/User';
import { CONTACT_LOOKUP1 } from '@/app/graphql/Contact';

export const metadata: Metadata = {
  title: 'Edit Note'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditNotePage({ params }: Props) {
  const { id } = await params;
  let dtoNote: NoteDTO = NOTE;
  let arrContactLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_NOTE,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: CONTACT_LOOKUP1
    });
    const result2 = apolloClient.query({
      query: USER_LOOKUP
    });
    const results = await Promise.all([result, result1, result2]);
    if (results[0]?.data?.getNote) {
      dtoNote = results[0].data.getNote;
    }
    if (results[1]?.data?.getContactLookup1) {
      arrContactLookup = results[1].data.getContactLookup1;
    }
    if (results[2]?.data?.getUserLookup) {
      arrAssignedToLookup = results[2].data.getUserLookup;
    }
  } catch {}
  return <ClientEditNote dtoNote={dtoNote} arrContactLookup={arrContactLookup} arrAssignedToLookup={arrAssignedToLookup} />;
}
