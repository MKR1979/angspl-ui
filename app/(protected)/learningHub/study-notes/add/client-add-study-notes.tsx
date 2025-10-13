'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import StudyNotesEntry from '../study-notes-entry';
import useAddStudyNotes from './useAddStudyNotes';
import { STUDY_NOTES } from '@/app/types/StudyNotesDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = { arrCourseLookup: LookupDTO[] };
const ClientAddStudyNotes = ({ arrCourseLookup }: Props) => {
  const { state } = useAddStudyNotes();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <StudyNotesEntry dtoStudyNotes={STUDY_NOTES} arrCourseLookup={arrCourseLookup} />
    </>
  );
};

export default memo(ClientAddStudyNotes, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
