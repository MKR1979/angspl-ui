'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import UnitEntry from '../../unit-entry';
import useEditUnit from './useEditUnit';
import UnitDTO from '@/app/types/UnitDTO';

type Props = { dtoUnit: UnitDTO };

const ClientEditUnit = ({ dtoUnit }: Props) => {
  const { state } = useEditUnit();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <UnitEntry dtoUnit={dtoUnit} />
    </>
  );
};

export default memo(ClientEditUnit, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
