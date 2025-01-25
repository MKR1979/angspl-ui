'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import UnitEntry from '../unit-entry';
import useAddUnit from './useAddUnit';
import { UNIT } from '@/app/types/UnitDTO';

const ClientAddUnit = () => {
  const { state } = useAddUnit();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <UnitEntry dtoUnit={UNIT} />
    </>
  );
};

export default memo(ClientAddUnit, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
