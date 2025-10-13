// 'use client';
// import { memo } from 'react';
// import eq from 'lodash/eq';
// import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
// import EnrollmentEntry from '../enrollment-entry';
// import useAddEnrollment from './useAddEnrollment';
// import EnrollmentDTO from '@/app/types/EnrollmentDTO';
// type Props = {
//   dtoEnrollment: EnrollmentDTO;

// };
// const ClientAddEnrollment = ({ dtoEnrollment }: Props) => {
//   const { state } = useAddEnrollment();
//   return (
//     <>
//       <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
//       <EnrollmentEntry
//         dtoEnrollment={dtoEnrollment}
//       />
//     </>
//   );
// };

// export default memo(ClientAddEnrollment, (prevProps, nextProps) => {
//   return eq(prevProps, nextProps); // Don't re-render!
// });


'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import EnrollmentEntry from '../enrollment-entry';
import useAddEnrollment from './useAddEnrollment';
import {ENROLLMENT} from '@/app/types/EnrollmentDTO';

const ClientAddEnrollment = () => {
  const { state } = useAddEnrollment();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <EnrollmentEntry dtoEnrollment={ENROLLMENT} />
    </>
  );
};

export default memo(ClientAddEnrollment, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
