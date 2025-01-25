'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import IndustryEntry from '../industry-entry';
import useAddIndustry from './useAddIndustry';
import { INDUSTRY } from '@/app/types/IndustryDTO';

const ClientAddIndustry = () => {
  const { state } = useAddIndustry();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <IndustryEntry dtoIndustry={INDUSTRY} />
    </>
  );
};

export default memo(ClientAddIndustry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
