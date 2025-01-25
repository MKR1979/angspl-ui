'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import StageEntry from '../../stage-entry';
import useEditStage from './useEditStage';
import StageDTO from '@/app/types/StageDTO';

type Props = { dtoStage: StageDTO };

const ClientEditStage = ({ dtoStage }: Props) => {
  const { state } = useEditStage();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <StageEntry dtoStage={dtoStage} />
    </>
  );
};

export default memo(ClientEditStage, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
