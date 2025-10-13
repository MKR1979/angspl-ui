'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import AdmissionReviewEntry from '../admission-review-entry';
import useAddAdmission from './useAddAdmission';
import { ADMISSION_TECH } from '@/app/types/AdmissionTechDTO';
const ClientAddAdmissionReview = () => {
  const { state } = useAddAdmission();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <AdmissionReviewEntry dtoAdmission={ADMISSION_TECH} />
    </>
  );
};

export default memo(ClientAddAdmissionReview, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
