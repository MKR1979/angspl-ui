'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import StateEntry from '../../state-entry';
import useEditState from './useEditState';
import StateDTO from '@/app/types/stateDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = { dtoState: StateDTO; arrCountryLookup: LookupDTO[] };

const ClientEditState = ({ dtoState, arrCountryLookup }: Props) => {
  const { state } = useEditState();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <StateEntry dtoState={dtoState} arrCountryLookup={arrCountryLookup} />
    </>
  );
};

export default memo(ClientEditState, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
