'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import AdmissionSchEntry from '../../admission-sch-entry';
import useEditAdmissionSch from './useEditAdmissionSch';
import AdmissionSchoolDTO from '@/app/types/AdmissionSchDTO';

type Props = { dtoAdmissionSchool: AdmissionSchoolDTO };

const ClientEditAdmissionSch = ({ dtoAdmissionSchool }: Props) => {
  const { state } = useEditAdmissionSch();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <AdmissionSchEntry dtoAdmissionSchool={dtoAdmissionSchool} />
    </>
  );
};

export default memo(ClientEditAdmissionSch, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); 
});