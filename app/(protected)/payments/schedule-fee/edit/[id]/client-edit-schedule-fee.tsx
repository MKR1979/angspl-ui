'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import ScheduleFeeEntry from '../../schedule-fee-entry';
import useEditPayment from './useEditScheduleFee';
import ScheduleFeeDTO from '@/app/types/ScheduleFeeDTO';

type Props = { dtoScheduleFee: ScheduleFeeDTO };

const ClientEditScheduleFee = ({ dtoScheduleFee }: Props) => {
  const { state } = useEditPayment();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <ScheduleFeeEntry dtoScheduleFee={dtoScheduleFee} />
    </>
  );
};

export default memo(ClientEditScheduleFee, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
