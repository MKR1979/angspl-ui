'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewAdmissionSch from './useViewAdmissionSch';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import AdmissionSchoolDTO from '@/app/types/AdmissionSchDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import { useSelector, RootState } from '../../../../../store';
import { findPermission } from '../../../../../common/utility-permission';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  dtoAdmissionSchool: AdmissionSchoolDTO;
};
const ClientViewAdmissionSch = ({ dtoAdmissionSchool }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewAdmissionSch({ dtoAdmissionSchool });
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
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.course_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Admission Date:</MyTypography>
                <MyTypography variant="subtitle2">

                  {state.dtoAdmissionSchool?.admission_date &&
                    dayjs(state.dtoAdmissionSchool.admission_date).format('DD/MM/YYYY') !== '12/31/1899'
                    ? dayjs(state.dtoAdmissionSchool.admission_date).tz(customerTimezone).format('DD/MM/YYYY') // or 'DD/MM/YYYY' if you prefer
                    : 'N/A'}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Gender:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.gender}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">First Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.first_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Last Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.last_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.father_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.mother_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Date Of Birth:</MyTypography>
                <MyTypography variant="subtitle2">
                  {state.dtoAdmissionSchool?.dob &&
                    dayjs(state.dtoAdmissionSchool.dob).format('DD/MM/YYYY') !== '12/31/1899'
                    ? dayjs(state.dtoAdmissionSchool.dob).tz(customerTimezone).format('DD/MM/YYYY') // or 'DD/MM/YYYY' if you prefer
                    : 'N/A'}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Category:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.category}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Address:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.address}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">City Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.city_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">State Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.state_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Country Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.country_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Zip Code:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.zip_code}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Email:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.email}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Phone No.:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.phone_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Religion:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.religion}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Blood Group:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.blood_group}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Boarder/Day Scholar:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.boarder_day_scholar}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Previous School:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.current_school}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Previous School Board:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.current_board}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Medium:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.medium}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Qualification:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.father_qualification}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Occupation:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.father_occupation}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Organisation:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.father_organisation}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Designaion:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.father_designation}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Phone No.:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.father_phone_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Email:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.father_email}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother Qualification:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.mother_qualification}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother Occupation:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.mother_occupation}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother Organisation:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.mother_organisation}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother Designaion:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.mother_designation}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother Phone No.:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.mother_phone_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother Email:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.mother_email}</MyTypography>
              </MyBox>
            </MyGrid>
            {state.dtoCourse.is_aadhar_req && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Student Aadhaar No.:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.student_aadhaar_no}</MyTypography>
                </MyBox>
              </MyGrid>
            )}
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Aadhaar No.:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.father_aadhaar_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother Aadhaar No.:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.mother_aadhaar_no}</MyTypography>
              </MyBox>
            </MyGrid>
            {state.dtoCourse.is_samagraid_req && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Samagra Id No.:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.samagra_id_no}</MyTypography>
                </MyBox>
              </MyGrid>
            )}
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Sibling Enroll. No. (if exist):</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.sibling_in_school}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Parents Ex. School (if exist):</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.parents_ex_school}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Guardian Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.guardian_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Guardian Phone No.:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.guardian_phone_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">III Language:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.iii_language}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Transport Facility:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.transport_facility}</MyTypography>
              </MyBox>
            </MyGrid>
            {state.dtoAdmissionSchool.transport_facility && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Transport Route:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.transport_route}</MyTypography>
                </MyBox>
              </MyGrid>
            )}
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mess Facility:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.mess_facility}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">II Language:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.ii_language}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Stream:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.stream}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Family Samagra Id:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.family_samagra_id}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Student PEN No.:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.student_pen_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmissionSchool.status}</MyTypography>
              </MyBox>
            </MyGrid>
            {state.dtoCourse.isphotoidreq && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Photo:</MyTypography>
                  <MyTypography variant="subtitle2">
                    {typeof state.dtoAdmissionSchool.photo === 'string' ? (
                      <a href={state.dtoAdmissionSchool.photo} target="_blank" rel="noopener noreferrer">
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
                    {typeof state.dtoAdmissionSchool.aadhaar_card === 'string' ? (
                      <a href={state.dtoAdmissionSchool.aadhaar_card} target="_blank" rel="noopener noreferrer">
                        View Aadhaar Card
                      </a>
                    ) : (
                      'File not available'
                    )}
                  </MyTypography>
                </MyBox>
              </MyGrid>
            )}
            {state.dtoCourse.is_birth_certi_req && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Birth Certificate:</MyTypography>
                  <MyTypography variant="subtitle2">
                    {typeof state.dtoAdmissionSchool.birth_certificate === 'string' ? (
                      <a href={state.dtoAdmissionSchool.birth_certificate} target="_blank" rel="noopener noreferrer">
                        View Birth Certificate
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
                  {typeof state.dtoAdmissionSchool.other_certificate === 'string' ? (
                    <a href={state.dtoAdmissionSchool.other_certificate} target="_blank" rel="noopener noreferrer">
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
                  {typeof state.dtoAdmissionSchool.father_aadhaar === 'string' ? (
                    <a href={state.dtoAdmissionSchool.father_aadhaar} target="_blank" rel="noopener noreferrer">
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
                  {typeof state.dtoAdmissionSchool.mother_aadhaar === 'string' ? (
                    <a href={state.dtoAdmissionSchool.mother_aadhaar} target="_blank" rel="noopener noreferrer">
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
                    {typeof state.dtoAdmissionSchool.samagra_id === 'string' ? (
                      <a href={state.dtoAdmissionSchool.samagra_id} target="_blank" rel="noopener noreferrer">
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
                    {typeof state.dtoAdmissionSchool.transfer_certificate === 'string' ? (
                      <a href={state.dtoAdmissionSchool.transfer_certificate} target="_blank" rel="noopener noreferrer">
                        View Transfer Certificate
                      </a>
                    ) : (
                      'File not available'
                    )}
                  </MyTypography>
                </MyBox>
              </MyGrid>
            )}
            {state.dtoCourse.prev_class_marksheet && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Previous Class Marksheet:</MyTypography>
                  <MyTypography variant="subtitle2">
                    {typeof state.dtoAdmissionSchool.prev_class_marksheet === 'string' ? (
                      <a href={state.dtoAdmissionSchool.prev_class_marksheet} target="_blank" rel="noopener noreferrer">
                        Previous Class Marksheet
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
                <MyTypography variant="subtitle1">Father Photo:</MyTypography>
                <MyTypography variant="subtitle2">
                  {typeof state.dtoAdmissionSchool.father_photo === 'string' ? (
                    <a href={state.dtoAdmissionSchool.father_photo} target="_blank" rel="noopener noreferrer">
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
                  {typeof state.dtoAdmissionSchool.mother_photo === 'string' ? (
                    <a href={state.dtoAdmissionSchool.mother_photo} target="_blank" rel="noopener noreferrer">
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
          createdBy={state.dtoAdmissionSchool.created_by_user_name}
          createdAt={state.dtoAdmissionSchool.created_at}
          modifiedBy={state.dtoAdmissionSchool.modified_by_user_name}
          modifiedAt={state.dtoAdmissionSchool.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          {findPermission(userPermissions, 221) && <MyButton onClick={onEditClick}>Edit</MyButton>}
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewAdmissionSch, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
