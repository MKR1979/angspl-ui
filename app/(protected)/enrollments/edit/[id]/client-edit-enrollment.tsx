'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import EnrollmentEntry from '../../enrollment-entry';
import useEditEnrollment from './useEditEnrollment';
import EnrollmentDTO from '@/app/types/EnrollmentDTO';


type Props = {
  dtoEnrollment: EnrollmentDTO;
};

const ClientEditEnrollment = ({ dtoEnrollment }: Props) => {
  const { state } = useEditEnrollment();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <EnrollmentEntry
        dtoEnrollment={dtoEnrollment}
      />
    </>
  );
};

export default memo(ClientEditEnrollment, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
