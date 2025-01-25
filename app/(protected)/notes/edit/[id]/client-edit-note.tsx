'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import NoteEntry from '../../note-entry';
import useEditNote from './useEditNote';
import NoteDTO from '@/app/types/NoteDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = {
  dtoNote: NoteDTO;
  arrContactLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const ClientEditNote = ({ dtoNote, arrContactLookup, arrAssignedToLookup }: Props) => {
  const { state } = useEditNote();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <NoteEntry dtoNote={dtoNote} arrContactLookup={arrContactLookup} arrAssignedToLookup={arrAssignedToLookup} />
    </>
  );
};

export default memo(ClientEditNote, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
