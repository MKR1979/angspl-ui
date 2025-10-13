'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import AdmissionClgEntry from '../admission-clg-entry';
import useAddAdmissionClg from './useAddAdmissionClg';
import { ADMISSION_CLG } from '@/app/types/AdmissionClgDTO';
const ClientAddAdmissionClg = () => {
  const { state } = useAddAdmissionClg();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <AdmissionClgEntry dtoAdmissionClg={ADMISSION_CLG} />
    </>
  );
};

export default memo(ClientAddAdmissionClg, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); 
});
