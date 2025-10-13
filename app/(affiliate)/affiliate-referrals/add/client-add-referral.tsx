'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import ReferralEntry from '../referral';
import { REFERRAL } from '@/app/types/ReferralDTO';
import useAddReferral from './useAddReferral';
const ClientAddReferral = () => {
  const { state } = useAddReferral();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <ReferralEntry dtoReferral={REFERRAL} />
    </>
  );
};

export default memo(ClientAddReferral, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
