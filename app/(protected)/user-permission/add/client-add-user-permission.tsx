
'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import UserPermissionEntry from '../user-permission-entry';
import useAddUserPermission from './useAddUserPermission';
import { USER_PERMISSION } from '@/app/types/UserPermissionDTO';

const ClientAddAdmissionReview = () => {
  const { state } = useAddUserPermission();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <UserPermissionEntry dtoUserPermission={USER_PERMISSION} />
    </>
  );
};

export default memo(ClientAddAdmissionReview, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});