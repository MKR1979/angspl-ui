'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import ModuleEntry from '../../module-entry';
import useEditModule from './useEditModule';
import ModuleDTO from '@/app/types/ModuleDTO';

type Props = { dtoModule: ModuleDTO };

const ClientEditModule = ({ dtoModule }: Props) => {
  const { state } = useEditModule();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <ModuleEntry dtoModule={dtoModule} />
    </>
  );
};

export default memo(ClientEditModule, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
