'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import TypeEntry from '../../type-entry';
import useEditType from './useEditType';
import TypeDTO from '@/app/types/TypeDTO';

type Props = { dtoType: TypeDTO };

const ClientEditType = ({ dtoType }: Props) => {
  const { state } = useEditType();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <TypeEntry dtoType={dtoType} />
    </>
  );
};

export default memo(ClientEditType, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
