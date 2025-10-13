'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import ReferralEntry from '../../referrals';
import useEditReferral from './useEditReviewReferral';
import ReferralDTO from '@/app/types/ReferralDTO';

type Props = { dtoReferral: ReferralDTO };

const ClientEditReferral = ({ dtoReferral }: Props) => {
  const { state } = useEditReferral();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <ReferralEntry dtoReferral={dtoReferral} />
    </>
  );
};

export default memo(ClientEditReferral, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
