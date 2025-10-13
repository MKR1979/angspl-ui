'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import AdmissionClgEntry from '../../admission-clg-entry';
import useEditAdmissionClg from './useEditAdmissionClg';
import AdmissionClgDTO from '@/app/types/AdmissionClgDTO';

type Props = { dtoAdmissionClg: AdmissionClgDTO };

const ClientEditAdmissionClg = ({ dtoAdmissionClg }: Props) => {
  const { state } = useEditAdmissionClg();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <AdmissionClgEntry dtoAdmissionClg={dtoAdmissionClg} />
    </>
  );
};

export default memo(ClientEditAdmissionClg, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); 
});
