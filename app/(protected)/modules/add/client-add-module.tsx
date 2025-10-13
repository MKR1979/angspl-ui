'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import ModuleEntry from '../module-entry';
import useAddModule from './useAddModule';
import { MODULE } from '@/app/types/ModuleDTO';

const ClientAddModule = () => {
  const { state } = useAddModule();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <ModuleEntry dtoModule={MODULE} />
    </>
  );
};

export default memo(ClientAddModule, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
