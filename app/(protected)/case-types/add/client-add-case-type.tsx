'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import CaseTypeEntry from '../case-type-entry';
import useAddCaseType from './useAddCaseType';
import { CASE_TYPE } from '@/app/types/CaseTypeDTO';

const ClientAddCaseType = () => {
  const { state } = useAddCaseType();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <CaseTypeEntry dtoCaseType={CASE_TYPE} />
    </>
  );
};

export default memo(ClientAddCaseType, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
