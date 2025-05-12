'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import StudyNotesEntry from '../../study-notes-entry';
import useEditStudyNotes from './useEditStudyNotes';
import StudyNotesDTO from '@/app/types/StudyNotesDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = { dtoStudyNotes: StudyNotesDTO; arrCourseLookup: LookupDTO[] };

const ClientEditStudyNotes = ({ dtoStudyNotes, arrCourseLookup }: Props) => {
  const { state } = useEditStudyNotes();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <StudyNotesEntry dtoStudyNotes={dtoStudyNotes} arrCourseLookup={arrCourseLookup} />
    </>
  );
};

export default memo(ClientEditStudyNotes, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
