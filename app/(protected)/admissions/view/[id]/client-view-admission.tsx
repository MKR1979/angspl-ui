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
import AdmissionDTO from '@/app/types/AdmissionDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoAdmission: AdmissionDTO;
};

const ClientViewAdmission = ({ dtoAdmission }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewAdmission({ dtoAdmission });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">course Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmission.course_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">admission date:</MyTypography>
                <MyTypography variant="subtitle2">
                  {state.dtoAdmission.admission_date ? new Date(state.dtoAdmission.admission_date).toLocaleDateString() : 'N/A'}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">first name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmission.first_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">last name:</MyTypography>
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
                <MyTypography variant="subtitle1">Phone no:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmission.phone_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">DOB:</MyTypography>
                <MyTypography variant="subtitle2">
                  {state.dtoAdmission.dob ? new Date(state.dtoAdmission.dob).toLocaleDateString() : 'N/A'}
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
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">High School Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmission.highschoolname}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">High school Percentage:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmission.highschoolpercentage}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Higher school Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmission.highersschoolname}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Higher School Percentage:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAdmission.highersschoolpercentage}</MyTypography>
              </MyBox>
            </MyGrid>
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
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Tenth Proof:</MyTypography>
                <MyTypography variant="subtitle2">
                  {typeof state.dtoAdmission.tenthproof === 'string' ? state.dtoAdmission.tenthproof : 'File not available'}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Twelth Proof:</MyTypography>
                <MyTypography variant="subtitle2">
                  {typeof state.dtoAdmission.twelthproof === 'string' ? state.dtoAdmission.twelthproof : 'File not available'}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Graduation Proof:</MyTypography>
                <MyTypography variant="subtitle2">
                  {typeof state.dtoAdmission.graduationproof === 'string' ? state.dtoAdmission.graduationproof : 'File not available'}
                </MyTypography>
              </MyBox>
            </MyGrid>
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
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewAdmission, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
