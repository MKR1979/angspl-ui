'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import FeeHeadEntry from '../../fee-head-entry';
import useEditFeeHead from './useEditFeeHead';
import FeeHeadDTO from '@/app/types/FeeHeadDTO';

type Props = { dtoFeeHead: FeeHeadDTO };

const ClientEditFeeHead = ({ dtoFeeHead }: Props) => {
  const { state } = useEditFeeHead();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <FeeHeadEntry dtoFeeHead={dtoFeeHead} />
    </>
  );
};

export default memo(ClientEditFeeHead, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
