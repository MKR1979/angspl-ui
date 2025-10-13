'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewEnrollment from './useViewEnrollment';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import EnrollmentDTO from '@/app/types/EnrollmentDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import MyBox from '@/app/custom-components/MyBox';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useSelector } from '../../../../store';
dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  dtoEnrollment: EnrollmentDTO;
};

const ClientViewEnrollment = ({ dtoEnrollment }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewEnrollment({ dtoEnrollment });
  const { siteConfig } = useSelector((state: { siteConfigState: any; }) => state.siteConfigState);
  const customerTimezone = siteConfig.find((c: { key: string; }) => c.key === 'CUSTOMER_TIMEZONE')?.value ?? '';

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">User Name:</MyTypography>
              <MyTypography>{state.dtoEnrollment.user_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Course Name:</MyTypography>
              <MyTypography>{state.dtoEnrollment.course_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Enrollment Date:</MyTypography>
                <MyTypography variant="subtitle2">
                  {/* {state.dtoEnrollment.enrollment_date ? new Date(state.dtoEnrollment.enrollment_date).toLocaleDateString() : 'N/A'} */}
                  {state.dtoEnrollment?.enrollment_date &&
                    dayjs(state.dtoEnrollment.enrollment_date).format('DD/MM/YYYY') !== '12/31/1899'
                    ? dayjs(state.dtoEnrollment.enrollment_date).tz(customerTimezone).format('DD/MM/YYYY') // or 'DD/MM/YYYY' if you prefer
                    : 'N/A'}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">End Date:</MyTypography>
                <MyTypography variant="subtitle2">
                  {/* {state.dtoEnrollment.end_date ? new Date(state.dtoEnrollment.end_date).toLocaleDateString() : 'N/A'} */}

                  {state.dtoEnrollment?.end_date &&
                    dayjs(state.dtoEnrollment.end_date).format('DD/MM/YYYY') !== '12/31/1899'
                    ? dayjs(state.dtoEnrollment.end_date).tz(customerTimezone).format('DD/MM/YYYY') // or 'DD/MM/YYYY' if you prefer
                    : 'N/A'}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Status:</MyTypography>
              <MyTypography>{state.dtoEnrollment.status}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Paid Amount:</MyTypography>
              <MyTypography>{state.dtoEnrollment.paid_amount}</MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoEnrollment.created_by_user_name}
          createdAt={state.dtoEnrollment.created_at}
          modifiedBy={state.dtoEnrollment.modified_by_user_name}
          modifiedAt={state.dtoEnrollment.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewEnrollment, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
