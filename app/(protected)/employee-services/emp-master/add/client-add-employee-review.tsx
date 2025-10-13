'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import EmployeeReviewEntry from '../employee-review-entry';
import useAddEmployee from './useAddEmployee';
import { EMP_MASTER } from '@/app/types/EmpMasterDTO';
const ClientAddEmployeeReview = () => {
  const { state } = useAddEmployee();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <EmployeeReviewEntry dtoEmpMaster={EMP_MASTER} />
    </>
  );
};

export default memo(ClientAddEmployeeReview, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
