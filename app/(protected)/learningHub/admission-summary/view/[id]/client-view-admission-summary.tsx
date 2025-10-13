'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewAdmSummary from './useViewAdmissionSummary';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import AdmissionReportDTO from '@/app/types/AdmissionReportDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import { useSelector } from '../../../../../store';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  dtoAdmissionReport: AdmissionReportDTO;
};

const ClientViewAdmSummary = ({ dtoAdmissionReport }: Props) => {
  const { state, onCancelClick } = useViewAdmSummary({ dtoAdmissionReport });
  const { siteConfig } = useSelector((state: { siteConfigState: any }) => state.siteConfigState);
  const customerTimezone = siteConfig.find((c: { key: string }) => c.key === 'CUSTOMER_TIMEZONE')?.value ?? '';

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Course Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionReport.course_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Admission Date:</MyTypography>
                <MyTypography variant="subtitle2">
                  {state.dtoAdmissionReport?.admission_date &&
                  dayjs(state.dtoAdmissionReport.admission_date).format('DD/MM/YYYY') !== '12/31/1899'
                    ? dayjs(state.dtoAdmissionReport.admission_date).tz(customerTimezone).format('DD/MM/YYYY')
                    : 'N/A'}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">First Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionReport.first_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Last Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionReport.last_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Date of Birth:</MyTypography>
                <MyTypography variant="subtitle2">
                  {state.dtoAdmissionReport?.dob && dayjs(state.dtoAdmissionReport.dob).format('DD/MM/YYYY') !== '12/31/1899'
                    ? dayjs(state.dtoAdmissionReport.dob).tz(customerTimezone).format('DD/MM/YYYY')
                    : 'N/A'}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Gender:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionReport.gender}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Email:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionReport.email}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Phone No:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionReport.phone_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Address:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionReport.address}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">City Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionReport.city_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">State Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionReport.state_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Country Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionReport.country_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Zip Code:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionReport.zip_code}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Aadhaar No:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionReport.aadhaar_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionReport.father_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Phone No:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionReport.father_phone_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionReport.mother_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother Phone No:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionReport.mother_phone_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionReport.status}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoAdmissionReport.created_by_user_name}
          createdAt={state.dtoAdmissionReport.created_at}
          modifiedBy={state.dtoAdmissionReport.modified_by_user_name}
          modifiedAt={state.dtoAdmissionReport.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onCancelClick}>Close</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewAdmSummary, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
