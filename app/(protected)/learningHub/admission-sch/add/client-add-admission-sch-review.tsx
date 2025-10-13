'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import AdmissionSchEntry from '../admission-sch-entry';
import useAddAdmissionSch from './useAddAdmissionSch';
import { ADMISSION_SCHOOL } from '@/app/types/AdmissionSchDTO';
const ClientAddAdmissionSch = () => {
  const { state } = useAddAdmissionSch();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <AdmissionSchEntry dtoAdmissionSchool={ADMISSION_SCHOOL} />
    </>
  );
};

export default memo(ClientAddAdmissionSch, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); 
});
