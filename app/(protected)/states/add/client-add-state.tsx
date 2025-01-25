'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import StateEntry from '../state-entry';
import useAddState from './useAddState';
import { STATE } from '@/app/types/stateDTO';
import LookupDTO from '@/app/types/LookupDTO';
type Props = { arrCountryLookup: LookupDTO[] };
const ClientAddState = ({ arrCountryLookup }: Props) => {
  const { state } = useAddState();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <StateEntry dtoState={STATE} arrCountryLookup={arrCountryLookup} />
    </>
  );
};

export default memo(ClientAddState, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
