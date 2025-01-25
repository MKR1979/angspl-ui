'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import LeadSourceEntry from '../../lead-source-entry';
import useEditLeadSource from './useEditLeadSource';
import LeadSourceDTO from '@/app/types/LeadSourceDTO';

type Props = { dtoLeadSource: LeadSourceDTO };

const ClientEditLeadSource = ({ dtoLeadSource }: Props) => {
  const { state } = useEditLeadSource();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <LeadSourceEntry dtoLeadSource={dtoLeadSource} />
    </>
  );
};

export default memo(ClientEditLeadSource, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
