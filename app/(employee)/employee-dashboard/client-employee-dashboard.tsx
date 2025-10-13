'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import useEmployeeDashboard from './useEmployeeDashboard';

const ClientEmployeeDashboard = () => {
  const { state } = useEmployeeDashboard();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbItems}></MyBreadcrumbs>
    </>
  );
};

export default memo(ClientEmployeeDashboard, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
