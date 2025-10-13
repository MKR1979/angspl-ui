'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import DistrictEntry from '../../../(protected)/districts/district-entry';
import useAddDistrict from './useAddDistrict';
import { DISTRICT } from '@/app/types/DistrictDTO';

const ClientAddDistrict = () => {
  const { state } = useAddDistrict();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <DistrictEntry dtoDistrict={DISTRICT}  />
    </>
  );
};

export default memo(ClientAddDistrict, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
