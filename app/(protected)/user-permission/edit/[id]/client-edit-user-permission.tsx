
'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import UserPermissionEntry from '../../user-permission-entry';
import useEditUserPermission from './useEditUserPermission';
import UserPermissionDTO from '@/app/types/UserPermissionDTO';

type Props = { dtoUserPermission: UserPermissionDTO };

const ClientEditUserPermission = ({ dtoUserPermission }: Props) => {
  const { state } = useEditUserPermission();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <UserPermissionEntry dtoUserPermission={dtoUserPermission} />
    </>
  );
};

export default memo(ClientEditUserPermission, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
