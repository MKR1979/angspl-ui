'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MeetingEntry from '../meeting-entry';
import useAddMeeting from './useAddMeeting';
import MeetingDTO from '@/app/types/MeetingDTO';
import LookupDTO from '@/app/types/LookupDTO';
type Props = {
  dtoMeeting: MeetingDTO;
  arrLocationLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};
const ClientAddMeeting = ({ dtoMeeting, arrLocationLookup, arrAssignedToLookup }: Props) => {
  const { state } = useAddMeeting();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MeetingEntry dtoMeeting={dtoMeeting} arrLocationLookup={arrLocationLookup} arrAssignedToLookup={arrAssignedToLookup} />
    </>
  );
};

export default memo(ClientAddMeeting, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
