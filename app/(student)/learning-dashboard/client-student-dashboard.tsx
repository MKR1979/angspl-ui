'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import useStudentDashboard from './useStudentDashboard';

const ClientStudentDashboard = () => {
  const { state } = useStudentDashboard();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbItems}></MyBreadcrumbs>
    </>
  );
};

export default memo(ClientStudentDashboard, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
