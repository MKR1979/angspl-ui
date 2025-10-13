'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import TypeEntry from '../type-entry';
import useAddType from './useAddType';
import { TYPE } from '@/app/types/TypeDTO';

const ClientAddType = () => {
  const { state } = useAddType();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <TypeEntry dtoType={TYPE} />
    </>
  );
};

export default memo(ClientAddType, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
