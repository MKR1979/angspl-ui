import { Metadata } from 'next';
import ClientViewStudyNotes from './client-view-study-notes';
import { GET_STUDY_NOTES } from '@/app/graphql/StudyNotes';
import { createServerApolloClient } from '@/app/common/utility';
import StudyNotesDTO, { STUDY_NOTES } from '@/app/types/StudyNotesDTO';

export const metadata: Metadata = {
  title: 'View Study Notes'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewStudyNotesPage({ params }: Props) {
  const { id } = await params;
  let dtoStudyNotes: StudyNotesDTO = STUDY_NOTES;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_STUDY_NOTES,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getStudyNotes) {
      dtoStudyNotes = results[0].data.getStudyNotes;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewStudyNotes dtoStudyNotes={dtoStudyNotes}></ClientViewStudyNotes>;
}
