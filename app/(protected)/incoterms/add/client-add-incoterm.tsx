'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import IncotermEntry from '../incoterm-entry';
import useAddIncoterm from './useAddIncoterm';
import { INCOTERM } from '@/app/types/IncotermDTO';

const ClientAddIncoterm = () => {
  const { state } = useAddIncoterm();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <IncotermEntry dtoIncoterm={INCOTERM} />
    </>
  );
};

export default memo(ClientAddIncoterm, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
