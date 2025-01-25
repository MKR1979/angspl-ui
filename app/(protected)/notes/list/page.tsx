import { Metadata } from 'next';
import ClientNoteList from './client-note-list';
import { NOTE_LIST } from '@/app/graphql/Note';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import NoteDTO from '@/app/types/NoteDTO';
export const metadata: Metadata = {
  title: 'Opportunities'
};

export const revalidate = 0;

export default async function NoteListPage() {
  let arrNoteDTO: NoteDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: NOTE_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getNoteList?.notes) {
      arrNoteDTO = results[0].data.getNoteList.notes;
    }
    if (results[0]?.data?.getNoteList?.total_records) {
      total_records = results[0].data.getNoteList.total_records;
    }
  } catch {}
  return <ClientNoteList arrNoteDTO={arrNoteDTO} total_records={total_records}></ClientNoteList>;
}
