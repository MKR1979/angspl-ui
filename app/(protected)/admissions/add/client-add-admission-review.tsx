'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import AdmissionReviewEntry from '../admission-review-entry';
import useAddAdmission from './useAddAdmission';
import { ADMISSION } from '@/app/types/AdmissionDTO';
const ClientAddAdmissionReview = () => {
  const { state } = useAddAdmission();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <AdmissionReviewEntry dtoAdmission={ADMISSION} />
    </>
  );
};

export default memo(ClientAddAdmissionReview, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
