'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import FeeHeadEntry from '../fee-head-entry';
import useAddFeeHead from './useAddFeeHead';
import FeeHeadDTO from '@/app/types/FeeHeadDTO';

type Props = {
  dtoFeeHead: FeeHeadDTO;
  };
const ClientAddFeeHead = ({ dtoFeeHead}: Props) => {
  const { state } = useAddFeeHead();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <FeeHeadEntry
        dtoFeeHead={dtoFeeHead} 
      />
    </>
  );
};

export default memo(ClientAddFeeHead, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
