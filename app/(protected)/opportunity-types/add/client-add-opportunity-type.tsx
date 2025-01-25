'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import OpportunityTypeEntry from '../opportunity-type-entry';
import useAddOpportunityType from './useAddOpportunityType';
import { OPPORTUNITY_TYPE } from '@/app/types/OpportunityTypeDTO';

const ClientAddOpportunityType = () => {
  const { state } = useAddOpportunityType();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <OpportunityTypeEntry dtoOpportunityType={OPPORTUNITY_TYPE} />
    </>
  );
};

export default memo(ClientAddOpportunityType, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
