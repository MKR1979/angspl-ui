'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import AffiliateEntry from '../../affiliates';
import useEditAffiliate from './useEditReviewAffiliate';
import AffiliateDTO from '@/app/types/AffiliateDTO';

type Props = { dtoAffiliate: AffiliateDTO };

const ClientEditAffiliate = ({ dtoAffiliate }: Props) => {
  const { state } = useEditAffiliate();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <AffiliateEntry dtoAffiliate={dtoAffiliate} />
    </>
  );
};

export default memo(ClientEditAffiliate, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
