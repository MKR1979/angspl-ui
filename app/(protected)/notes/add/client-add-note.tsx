'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import NoteEntry from '../note-entry';
import useAddNote from './useAddNote';
import NoteDTO from '@/app/types/NoteDTO';
import LookupDTO from '@/app/types/LookupDTO';
type Props = {
  dtoNote: NoteDTO;
  arrContactLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};
const ClientAddNote = ({ dtoNote, arrContactLookup, arrAssignedToLookup }: Props) => {
  const { state } = useAddNote();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <NoteEntry dtoNote={dtoNote} arrContactLookup={arrContactLookup} arrAssignedToLookup={arrAssignedToLookup} />
    </>
  );
};

export default memo(ClientAddNote, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
