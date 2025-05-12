import { Metadata } from 'next';
import ClientStudyNotesList from './client-study-notes-list';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import StudyNotesDTO from '@/app/types/StudyNotesDTO';
import { STUDY_NOTES_LIST } from '@/app/graphql/StudyNotes';
export const metadata: Metadata = {
  title: 'Study Notes'
};

export const revalidate = 0;

export default async function StudyNotesListPage() {
  let arrStudyNotesDTO: StudyNotesDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: STUDY_NOTES_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getStudyNotesList?.studyNotes) {
      arrStudyNotesDTO = results[0].data.getStudyNotesList.studyNotes;
    }
    if (results[0]?.data?.getStudyNotesList?.total_records) {
      total_records = results[0].data.getStudyNotesList.total_records;
    }
  } catch {}
  return <ClientStudyNotesList arrStudyNotesDTO={arrStudyNotesDTO} total_records={total_records}></ClientStudyNotesList>;
}
