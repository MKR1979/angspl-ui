'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import useDashboard from './useDashboard';

const ClientDashboard = () => {
  const { state } = useDashboard();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbItems}></MyBreadcrumbs>
    </>
  );
};

export default memo(ClientDashboard, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); 
});
