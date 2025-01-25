'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import TermEntry from '../term-entry';
import useAddTerm from './useAddTerm';
import { TERM } from '@/app/types/TermDTO';

const ClientAddTerm = () => {
  const { state } = useAddTerm();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <TermEntry dtoTerm={TERM} />
    </>
  );
};

export default memo(ClientAddTerm, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
