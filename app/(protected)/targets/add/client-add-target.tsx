'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import TargetEntry from '../target-entry';
import useAddTarget from './useAddTarget';
import TargetDTO from '@/app/types/TargetDTO';
import LookupDTO from '@/app/types/LookupDTO';
type Props = {
  dtoTarget: TargetDTO;
  arrCountryLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};
const ClientAddTarget = ({ dtoTarget, arrCountryLookup, arrAssignedToLookup }: Props) => {
  const { state } = useAddTarget();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <TargetEntry dtoTarget={dtoTarget} arrCountryLookup={arrCountryLookup} arrAssignedToLookup={arrAssignedToLookup} />
    </>
  );
};

export default memo(ClientAddTarget, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
