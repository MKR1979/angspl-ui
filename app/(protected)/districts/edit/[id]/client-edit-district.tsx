'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import DistrictEntry from '../../../../(protected)/districts/district-entry';
import useEditDistrict from './useEditDistrict';
import DistrictDTO from '@/app/types/DistrictDTO';


type Props = { dtoDistrict: DistrictDTO; };

const ClientEditDistrict = ({ dtoDistrict }: Props) => {
  const { state } = useEditDistrict();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <DistrictEntry dtoDistrict={dtoDistrict} />
    </>
  );
};

export default memo(ClientEditDistrict, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
