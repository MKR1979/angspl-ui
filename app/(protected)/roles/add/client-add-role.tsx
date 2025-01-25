'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import RoleEntry from '../role-entry';
import useAddRole from './useAddRole';
import { ROLE } from '@/app/types/RoleDTO';

const ClientAddRole = () => {
  const { state } = useAddRole();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <RoleEntry dtoRole={ROLE} />
    </>
  );
};

export default memo(ClientAddRole, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
