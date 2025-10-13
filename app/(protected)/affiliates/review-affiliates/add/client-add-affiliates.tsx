'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import AffiliateEntry from '../affiliates';
import useAddAffiliates from './useAddAffiliates';
import AffiliateDTO from '@/app/types/AffiliateDTO';

type Props = { dtoAffiliate: AffiliateDTO };
const ClientAddAffiliate = ({ dtoAffiliate }: Props) => {
  const { state } = useAddAffiliates();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <AffiliateEntry dtoAffiliate={dtoAffiliate} />
    </>
  );
};

export default memo(ClientAddAffiliate, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});