'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import StageEntry from '../stage-entry';
import useAddStage from './useAddStage';
import { STAGE } from '@/app/types/StageDTO';

const ClientAddStage = () => {
  const { state } = useAddStage();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <StageEntry dtoStage={STAGE} />
    </>
  );
};

export default memo(ClientAddStage, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
