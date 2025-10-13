'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import ScheduleFeeEntry from '../schedule-fee-entry';
import useAddScheduleFee from './useAddScheduleFee';
import ScheduleFeeDTO from '@/app/types/ScheduleFeeDTO';

type Props = {
  dtoScheduleFee: ScheduleFeeDTO;
  };
const ClientAddScheduleFee = ({ dtoScheduleFee}: Props) => {
  const { state } = useAddScheduleFee();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <ScheduleFeeEntry
        dtoScheduleFee={dtoScheduleFee} 
      />
    </>
  );
};

export default memo(ClientAddScheduleFee, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
