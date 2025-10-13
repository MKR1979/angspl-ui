'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import EmployeeReviewEntry from '../../employee-review-entry';
import useEditEmployee from './useEditEmployee';
import EmpMasterDTO from '@/app/types/EmpMasterDTO';

type Props = { dtoEmpMaster: EmpMasterDTO };

const ClientEditEmployee = ({ dtoEmpMaster }: Props) => {
  const { state } = useEditEmployee();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <EmployeeReviewEntry dtoEmpMaster={dtoEmpMaster} />
    </>
  );
};

export default memo(ClientEditEmployee, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); 
});
