'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import AdmissionReviewEntry from '../../admission-review-entry';
import useEditAdmission from './useEditAdmission';
import AdmissionDTO from '@/app/types/AdmissionDTO';

type Props = { dtoAdmission: AdmissionDTO };

const ClientEditAdmission = ({ dtoAdmission }: Props) => {
  const { state } = useEditAdmission();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <AdmissionReviewEntry dtoAdmission={dtoAdmission} />
    </>
  );
};

export default memo(ClientEditAdmission, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
