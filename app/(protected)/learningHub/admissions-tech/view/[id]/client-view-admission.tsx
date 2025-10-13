'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewAdmission from './useViewAdmission';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import AdmissionDTO from '@/app/types/AdmissionTechDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import { useSelector, RootState } from '../../../../../store';
import { findPermission } from '../../../../../common/utility-permission';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  dtoAdmission: AdmissionDTO;
};
const ClientViewAdmission = ({ dtoAdmission }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewAdmission({ dtoAdmission });
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
                <MyTypography variant="subtitle2">{state.dtoAdmission.course_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Admission Date:</MyTypography>
                <MyTypography variant="subtitle2">
                  {state.dtoAdmission?.admission_date &&
                    dayjs(state.dtoAdmission.admission_date).format('DD/MM/YYYY') !== '12/31/1899'
                    ? dayjs(state.dtoAdmission.admission_date).tz(customerTimezone).format('DD/MM/YYYY') // or 'DD/MM/YYYY' if you prefer
                    : 'N/A'}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">First Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmission.first_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Last Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmission.last_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Email:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmission.email}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Phone No:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmission.phone_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Date of Birth:</MyTypography>
                <MyTypography variant="subtitle2">
                  {state.dtoAdmission?.dob &&
                    dayjs(state.dtoAdmission.dob).format('DD/MM/YYYY') !== '12/31/1899'
                    ? dayjs(state.dtoAdmission.dob).tz(customerTimezone).format('DD/MM/YYYY') // or 'DD/MM/YYYY' if you prefer
                    : 'N/A'}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Gender:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmission.gender}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Address:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmission.address}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">City Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmission.city_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">State Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmission.state_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Country Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmission.country_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Zip Code:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmission.zip_code}</MyTypography>
              </MyBox>
            </MyGrid>
            {state.dtoCourse.is10threq && (
              <>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">High School Name:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmission.highschoolname}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">High School Percentage:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmission.highschoolpercentage}</MyTypography>
                  </MyBox>
                </MyGrid>
              </>
            )}
            {state.dtoCourse.is12threq && (
              <>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">Higher School Name:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmission.highersschoolname}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">Higher School Percentage:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmission.highersschoolpercentage}</MyTypography>
                  </MyBox>
                </MyGrid>
              </>
            )}
            {state.dtoCourse.isgradreq && (
              <>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">Graduation Name:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmission.graduationname}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography variant="subtitle1">Graduation Percentage:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoAdmission.graduationpercentage}</MyTypography>
                  </MyBox>
                </MyGrid>
              </>
            )}
            {state.dtoCourse.is10threq && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Tenth Proof:</MyTypography>
                  <MyTypography variant="subtitle2">
                    {typeof state.dtoAdmission.tenthproof === 'string' ? state.dtoAdmission.tenthproof : 'File not available'}
                  </MyTypography>
                </MyBox>
              </MyGrid>
            )}
            {state.dtoCourse.is12threq && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Twelth Proof:</MyTypography>
                  <MyTypography variant="subtitle2">
                    {typeof state.dtoAdmission.twelthproof === 'string' ? state.dtoAdmission.twelthproof : 'File not available'}
                  </MyTypography>
                </MyBox>
              </MyGrid>
            )}
            {state.dtoCourse.isgradreq && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Graduation Proof:</MyTypography>
                  <MyTypography variant="subtitle2">
                    {typeof state.dtoAdmission.graduationproof === 'string' ? state.dtoAdmission.graduationproof : 'File not available'}
                  </MyTypography>
                </MyBox>
              </MyGrid>
            )}
            {state.dtoCourse.isphotoidreq && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Photo Id Proof:</MyTypography>
                  <MyTypography variant="subtitle2">
                    {typeof state.dtoAdmission.photoidproof === 'string' ? (
                      <a href={state.dtoAdmission.photoidproof} target="_blank" rel="noopener noreferrer">
                        View Photo ID Proof
                      </a>
                    ) : (
                      'File not available'
                    )}
                  </MyTypography>
                </MyBox>
              </MyGrid>
            )}
            {state.dtoCourse.isphotoidreq && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Photo:</MyTypography>
                  <MyTypography variant="subtitle2">
                    {typeof state.dtoAdmission.photo === 'string' ? (
                      <a href={state.dtoAdmission.photo} target="_blank" rel="noopener noreferrer">
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
                  <MyTypography variant="subtitle1">Aadhar Card:</MyTypography>
                  <MyTypography variant="subtitle2">
                    {typeof state.dtoAdmission.is_aadhar_req === 'string' ? (
                      <a href={state.dtoAdmission.is_aadhar_req} target="_blank" rel="noopener noreferrer">
                        View Aadhar Card
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
                    {typeof state.dtoAdmission.is_birth_certi_req === 'string' ? (
                      <a href={state.dtoAdmission.is_birth_certi_req} target="_blank" rel="noopener noreferrer">
                        View Birth Certificate
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
                    {typeof state.dtoAdmission.is_tc_req === 'string' ? (
                      <a href={state.dtoAdmission.is_tc_req} target="_blank" rel="noopener noreferrer">
                        View Transfer Certificate
                      </a>
                    ) : (
                      'File not available'
                    )}
                  </MyTypography>
                </MyBox>
              </MyGrid>
            )}
            {state.dtoCourse.is_samagraid_req && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Samagra ID:</MyTypography>
                  <MyTypography variant="subtitle2">
                    {typeof state.dtoAdmission.is_samagraid_req === 'string' ? (
                      <a href={state.dtoAdmission.is_samagraid_req} target="_blank" rel="noopener noreferrer">
                        View Samagra ID
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
                <MyTypography variant="subtitle1">Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmission.status}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoAdmission.created_by_user_name}
          createdAt={state.dtoAdmission.created_at}
          modifiedBy={state.dtoAdmission.modified_by_user_name}
          modifiedAt={state.dtoAdmission.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          {findPermission(userPermissions, 3) && <MyButton onClick={onEditClick}>Edit</MyButton>}
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewAdmission, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
