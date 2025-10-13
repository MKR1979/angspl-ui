'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewAdmissionClg from './useViewAdmissionClg';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import AdmissionClgDTO from '@/app/types/AdmissionClgDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import { useSelector, RootState } from '../../../../../store';
import { findPermission } from '../../../../../common/utility-permission';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  dtoAdmissionClg: AdmissionClgDTO;
};
const ClientViewAdmissionClg = ({ dtoAdmissionClg }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewAdmissionClg({ dtoAdmissionClg });
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);
  const { siteConfig } = useSelector((state: { siteConfigState: any; }) => state.siteConfigState);
  const customerTimezone = siteConfig.find((c: { key: string; }) => c.key === 'CUSTOMER_TIMEZONE')?.value ?? '';

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Course Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.course_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Course Type:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.course_type_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Admission Date:</MyTypography>
                <MyTypography variant="subtitle2">
                  {state.dtoAdmissionClg?.admission_date &&
                    dayjs(state.dtoAdmissionClg.admission_date).format('DD/MM/YYYY') !== '12/31/1899'
                    ? dayjs(state.dtoAdmissionClg.admission_date).tz(customerTimezone).format('DD/MM/YYYY') // or 'DD/MM/YYYY' if you prefer
                    : 'N/A'}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Admission Type:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.entry_type}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Gender:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.gender}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">First Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.first_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Last Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.last_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.father_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.mother_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Date Of Birth:</MyTypography>
                <MyTypography variant="subtitle2">
                  {state.dtoAdmissionClg?.dob &&
                    dayjs(state.dtoAdmissionClg.dob).format('DD/MM/YYYY') !== '12/31/1899'
                    ? dayjs(state.dtoAdmissionClg.dob).tz(customerTimezone).format('DD/MM/YYYY') // or 'DD/MM/YYYY' if you prefer
                    : 'N/A'}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Category:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.category}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Address:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.address}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">City Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.city_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">District Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.district_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">State Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.state_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Country Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.country_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Zip Code:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.zip_code}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Corresponding Address:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.corr_address}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Corresponding City Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.corr_city_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Corresponding District Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.corr_district_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Corresponding State Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.corr_state_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Corresponding Country Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.corr_country_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Corresponding Zip Code:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.corr_zip_code}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Email:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.email}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Phone No.:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.phone_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Religion:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.religion}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Blood Group:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.blood_group}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Medium:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.medium}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Qualification:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.father_qualification}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Occupation:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.father_occupation}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Organisation:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.father_organisation}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Designaion:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.father_designation}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Phone No.:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.father_phone_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Email:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.father_email}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Aadhaar No.:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.father_aadhaar_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother Qualification:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.mother_qualification}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother Occupation:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.mother_occupation}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother Organisation:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.mother_organisation}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother Designaion:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.mother_designation}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother Phone No.:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.mother_phone_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother Email:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.mother_email}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother Aadhaar No.:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.mother_aadhaar_no}</MyTypography>
              </MyBox>
            </MyGrid>
            {state.dtoCourse.is_aadhar_req && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Student Aadhaar No.:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoAdmissionClg.student_aadhaar_no}</MyTypography>
                </MyBox>
              </MyGrid>
            )}
            {state.dtoCourse.is_samagraid_req && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Samagra Id No.:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoAdmissionClg.samagra_id_no}</MyTypography>
                </MyBox>
              </MyGrid>
            )}
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Staff Child:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.staff_child}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Sibling in College(Reg. No.):</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.sibling_in_college}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Parents Ex College(Reg.No.):</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.parents_ex_college}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Guardian Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.guardian_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Guardian Phone No.:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.guardian_phone_no}</MyTypography>
              </MyBox>
            </MyGrid>
            {state.dtoCourse.is10threq && (
              <>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">High School Board:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.high_school_board}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">High School Year:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.high_school_year}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">High School Roll No.:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.high_school_roll_no}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">High School Percentage:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.high_school_percentage}</MyTypography>
                  </MyBox>
                </MyGrid>
              </>
            )}
            {state.dtoCourse.is12threq && (
              <>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">Intermediate Board:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.intermediate_board}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">Intermediate Year:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.intermediate_year}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">Intermediate Roll No.:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.intermediate_roll_no}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">Intermediate Stream:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.intermediate_stream}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">Intermediate Percentage:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.intermediate_percentage}</MyTypography>
                  </MyBox>
                </MyGrid>
              </>
            )}
            {state.dtoCourse.isdiplomareq && (
              <>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">Diploma College:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.diploma_college}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">Diploma University:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.diploma_university}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">Diploma Reg. No.:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.diploma_registration_no}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">Diploma Course Name:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.diploma_course_name}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">Diploma Passing Year:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.diploma_passing_year}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">Diploma CGPA:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.diploma_cgpa}</MyTypography>
                  </MyBox>
                </MyGrid>
              </>
            )}
            {state.dtoCourse.isgradreq && (
              <>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">UG College:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.ug_college}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">UG University:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.ug_university}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">UG Reg. No.:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.ug_registration_no}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">UG Course Name:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.ug_course_name}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">UG Passing Year:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.ug_passing_year}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">UG CGPA:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.ug_cgpa}</MyTypography>
                  </MyBox>
                </MyGrid>
              </>
            )}

            {state.dtoCourse.ispgreq && (
              <>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">PG College:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.pg_college}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">PG University:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.pg_university}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">PG Reg. No.:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.pg_registration_no}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">PG Course Name:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.pg_course_name}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">PG Passing Year:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.pg_passing_year}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">PG CGPA:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmissionClg.pg_cgpa}</MyTypography>
                  </MyBox>
                </MyGrid>
              </>
            )}

            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Undertaking:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.undertaking}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Transport Facility:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.transport_facility}</MyTypography>
              </MyBox>
            </MyGrid>
            {state.dtoAdmissionClg.transport_facility && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Transport Route:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoAdmissionClg.transport_route}</MyTypography>
                </MyBox>
              </MyGrid>
            )}
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Hostel Facility:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.hostel_facility}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Hostel Occupancy:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.hostel_occupancy}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Scholarship Student:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.scholarship_student}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Family Samagra Id:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.family_samagra_id}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Student PEN No.:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.student_pen_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionClg.status}</MyTypography>
              </MyBox>
            </MyGrid>
            {state.dtoCourse.isphotoidreq && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Photo:</MyTypography>
                  <MyTypography variant="subtitle2">
                    {typeof state.dtoAdmissionClg.photo === 'string' ? (
                      <a href={state.dtoAdmissionClg.photo} target="_blank" rel="noopener noreferrer">
                        View Photo
                      </a>
                    ) : (
                      'File not available'
                    )}
                  </MyTypography>
                </MyBox>
              </MyGrid>
            )}
            {state.dtoCourse.is_aadhar_req && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Student Aadhaar Card:</MyTypography>
                  <MyTypography variant="subtitle2">
                    {typeof state.dtoAdmissionClg.aadhaar_card === 'string' ? (
                      <a href={state.dtoAdmissionClg.aadhaar_card} target="_blank" rel="noopener noreferrer">
                        View Aadhaar Card
                      </a>
                    ) : (
                      'File not available'
                    )}
                  </MyTypography>
                </MyBox>
              </MyGrid>
            )}
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Other Certificate:</MyTypography>
                <MyTypography variant="subtitle2">
                  {typeof state.dtoAdmissionClg.other_certificate === 'string' ? (
                    <a href={state.dtoAdmissionClg.other_certificate} target="_blank" rel="noopener noreferrer">
                      View Other Certificate
                    </a>
                  ) : (
                    'File not available'
                  )}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Aadhaar:</MyTypography>
                <MyTypography variant="subtitle2">
                  {typeof state.dtoAdmissionClg.father_aadhaar === 'string' ? (
                    <a href={state.dtoAdmissionClg.father_aadhaar} target="_blank" rel="noopener noreferrer">
                      View Father Aadhaar
                    </a>
                  ) : (
                    'File not available'
                  )}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother Aadhaar:</MyTypography>
                <MyTypography variant="subtitle2">
                  {typeof state.dtoAdmissionClg.mother_aadhaar === 'string' ? (
                    <a href={state.dtoAdmissionClg.mother_aadhaar} target="_blank" rel="noopener noreferrer">
                      View Mother Aadhaar
                    </a>
                  ) : (
                    'File not available'
                  )}
                </MyTypography>
              </MyBox>
            </MyGrid>
            {state.dtoCourse.is_samagraid_req && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Samagra ID:</MyTypography>
                  <MyTypography variant="subtitle2">
                    {typeof state.dtoAdmissionClg.samagra_id === 'string' ? (
                      <a href={state.dtoAdmissionClg.samagra_id} target="_blank" rel="noopener noreferrer">
                        View Samagra ID
                      </a>
                    ) : (
                      'File not available'
                    )}
                  </MyTypography>
                </MyBox>
              </MyGrid>
            )}
            {state.dtoCourse.is_tc_req && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Transfer Certificate:</MyTypography>
                  <MyTypography variant="subtitle2">
                    {typeof state.dtoAdmissionClg.transfer_certificate === 'string' ? (
                      <a href={state.dtoAdmissionClg.transfer_certificate} target="_blank" rel="noopener noreferrer">
                        View Transfer Certificate
                      </a>
                    ) : (
                      'File not available'
                    )}
                  </MyTypography>
                </MyBox>
              </MyGrid>
            )}
            {state.dtoCourse.is10threq && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">High School Marksheet:</MyTypography>
                  <MyTypography variant="subtitle2">
                    {typeof state.dtoAdmissionClg.high_school_marksheet === 'string' ? (
                      <a href={state.dtoAdmissionClg.high_school_marksheet} target="_blank" rel="noopener noreferrer">
                        View Highschool Marksheet
                      </a>
                    ) : (
                      'File not available'
                    )}
                  </MyTypography>
                </MyBox>
              </MyGrid>
            )}
            {state.dtoCourse.is12threq && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Intermediate Marksheet:</MyTypography>
                  <MyTypography variant="subtitle2">
                    {typeof state.dtoAdmissionClg.intermediate_marksheet === 'string' ? (
                      <a href={state.dtoAdmissionClg.intermediate_marksheet} target="_blank" rel="noopener noreferrer">
                        View Intermediate Marksheet
                      </a>
                    ) : (
                      'File not available'
                    )}
                  </MyTypography>
                </MyBox>
              </MyGrid>
            )}
            {state.dtoCourse.isdiplomareq && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Diploma Marksheet:</MyTypography>
                  <MyTypography variant="subtitle2">
                    {typeof state.dtoAdmissionClg.diploma_marksheet === 'string' ? (
                      <a href={state.dtoAdmissionClg.diploma_marksheet} target="_blank" rel="noopener noreferrer">
                        View Diploma Marksheet
                      </a>
                    ) : (
                      'File not available'
                    )}
                  </MyTypography>
                </MyBox>
              </MyGrid>
            )}
            {state.dtoCourse.isgradreq && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">UG Marksheet:</MyTypography>
                  <MyTypography variant="subtitle2">
                    {typeof state.dtoAdmissionClg.ug_marksheet === 'string' ? (
                      <a href={state.dtoAdmissionClg.ug_marksheet} target="_blank" rel="noopener noreferrer">
                        View UG Marksheet
                      </a>
                    ) : (
                      'File not available'
                    )}
                  </MyTypography>
                </MyBox>
              </MyGrid>
            )}
            {state.dtoCourse.ispgreq && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">PG Marksheet:</MyTypography>
                  <MyTypography variant="subtitle2">
                    {typeof state.dtoAdmissionClg.pg_marksheet === 'string' ? (
                      <a href={state.dtoAdmissionClg.pg_marksheet} target="_blank" rel="noopener noreferrer">
                        View PG Marksheet
                      </a>
                    ) : (
                      'File not available'
                    )}
                  </MyTypography>
                </MyBox>
              </MyGrid>
            )}
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Anti Ragging Certificate:</MyTypography>
                <MyTypography variant="subtitle2">
                  {typeof state.dtoAdmissionClg.anti_ragging === 'string' ? (
                    <a href={state.dtoAdmissionClg.anti_ragging} target="_blank" rel="noopener noreferrer">
                      View Anti-Ragging Certificate
                    </a>
                  ) : (
                    'File not available'
                  )}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Student Undertaking Certificate:</MyTypography>
                <MyTypography variant="subtitle2">
                  {typeof state.dtoAdmissionClg.student_undertaking === 'string' ? (
                    <a href={state.dtoAdmissionClg.student_undertaking} target="_blank" rel="noopener noreferrer">
                      View Student Undertaking
                    </a>
                  ) : (
                    'File not available'
                  )}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Parents Undertaking Certificate:</MyTypography>
                <MyTypography variant="subtitle2">
                  {typeof state.dtoAdmissionClg.parents_undertaking === 'string' ? (
                    <a href={state.dtoAdmissionClg.parents_undertaking} target="_blank" rel="noopener noreferrer">
                      View Parents Undertaking
                    </a>
                  ) : (
                    'File not available'
                  )}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Photo:</MyTypography>
                <MyTypography variant="subtitle2">
                  {typeof state.dtoAdmissionClg.father_photo === 'string' ? (
                    <a href={state.dtoAdmissionClg.father_photo} target="_blank" rel="noopener noreferrer">
                      View Father Photo
                    </a>
                  ) : (
                    'File not available'
                  )}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother Photo:</MyTypography>
                <MyTypography variant="subtitle2">
                  {typeof state.dtoAdmissionClg.mother_photo === 'string' ? (
                    <a href={state.dtoAdmissionClg.mother_photo} target="_blank" rel="noopener noreferrer">
                      View Mother Photo
                    </a>
                  ) : (
                    'File not available'
                  )}
                </MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoAdmissionClg.created_by_user_name}
          createdAt={state.dtoAdmissionClg.created_at}
          modifiedBy={state.dtoAdmissionClg.modified_by_user_name}
          modifiedAt={state.dtoAdmissionClg.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          {findPermission(userPermissions, 229) && <MyButton onClick={onEditClick}>Edit</MyButton>}
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewAdmissionClg, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
