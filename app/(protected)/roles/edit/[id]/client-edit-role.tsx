'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import RoleEntry from '../../role-entry';
import useEditRole from './useEditRole';
import RoleDTO from '@/app/types/RoleDTO';

type Props = { dtoRole: RoleDTO };

const ClientEditRole = ({ dtoRole }: Props) => {
  const { state } = useEditRole();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <RoleEntry dtoRole={dtoRole} />
    </>
  );
};

export default memo(ClientEditRole, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
