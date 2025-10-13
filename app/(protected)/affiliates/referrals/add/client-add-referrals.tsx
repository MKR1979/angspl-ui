'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import ReferralEntry from '../referrals';
import useAddReferrals from './useAddReferrals';
import ReferralDTO from '@/app/types/ReferralDTO';

type Props = { dtoReferral: ReferralDTO };
const ClientAddReferral = ({ dtoReferral }: Props) => {
  const { state } = useAddReferrals();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <ReferralEntry dtoReferral={dtoReferral} />
    </>
  );
};

export default memo(ClientAddReferral, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});