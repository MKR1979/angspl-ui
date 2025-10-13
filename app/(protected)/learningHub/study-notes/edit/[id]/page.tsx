
import { Metadata } from 'next';
import ClientEditStudyNotes from './client-edit-study-notes';
import { GET_STUDY_NOTES } from '@/app/graphql/StudyNotes';
import { createServerApolloClient } from '@/app/common/utility';
import StudyNotesDTO, { STUDY_NOTES } from '@/app/types/StudyNotesDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { COURSE_LOOKUP } from '@/app/graphql/Course';

export const metadata: Metadata = {
  title: 'Edit Study Notes'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditStudyNotesPage({ params }: Props) {
  const { id } = await params;
  let dtoStudyNotes: StudyNotesDTO = STUDY_NOTES;
  let arrCourseLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_STUDY_NOTES,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: COURSE_LOOKUP
    });
    const results = await Promise.all([result, result1]);
    if (results[0]?.data?.getStudyNotes) {
      dtoStudyNotes = results[0].data.getStudyNotes;
    }
    if (results[1]?.data?.getCourseLookup) {
      arrCourseLookup = results[1].data.getCourseLookup;
    }
  } catch {}
  return <ClientEditStudyNotes dtoStudyNotes={dtoStudyNotes} arrCourseLookup={arrCourseLookup} />;
}
