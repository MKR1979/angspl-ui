'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import LeadSourceEntry from '../lead-source-entry';
import useAddLeadSource from './useAddLeadSource';
import { LEAD_SOURCE } from '@/app/types/LeadSourceDTO';

const ClientAddLeadSource = () => {
  const { state } = useAddLeadSource();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <LeadSourceEntry dtoLeadSource={LEAD_SOURCE} />
    </>
  );
};

export default memo(ClientAddLeadSource, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
