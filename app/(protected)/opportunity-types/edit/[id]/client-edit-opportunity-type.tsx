'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import OpportunityTypeEntry from '../../opportunity-type-entry';
import useEditOpportunityType from './useEditOpportunityType';
import OpportunityTypeDTO from '@/app/types/OpportunityTypeDTO';

type Props = { dtoOpportunityType: OpportunityTypeDTO };

const ClientEditOpportunityType = ({ dtoOpportunityType }: Props) => {
  const { state } = useEditOpportunityType();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <OpportunityTypeEntry dtoOpportunityType={dtoOpportunityType} />
    </>
  );
};

export default memo(ClientEditOpportunityType, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
