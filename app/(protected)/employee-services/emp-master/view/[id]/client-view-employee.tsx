'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewEmployee from './useViewEmployee';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import EmpMasterDTO from '@/app/types/EmpMasterDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import { useSelector, RootState } from '../../../../../store';
import { findPermission } from '../../../../../common/utility-permission';

type Props = {
  dtoEmpMaster: EmpMasterDTO;
};
const ClientViewEmployee = ({ dtoEmpMaster }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewEmployee({ dtoEmpMaster });
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">first name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmpMaster.first_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">last name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmpMaster.last_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Employee Code:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmpMaster.emp_code}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Joining date:</MyTypography>
                <MyTypography variant="subtitle2">
                  {state.dtoEmpMaster.joining_date ? new Date(state.dtoEmpMaster.joining_date).toLocaleDateString() : 'N/A'}
                </MyTypography>
              </MyBox>
            </MyGrid>

            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Department Type:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmpMaster.department_type}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Qualification:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmpMaster.qualification}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Experience:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmpMaster.experience}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Designation:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmpMaster.designation}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Salary:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmpMaster.salary}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">DOB:</MyTypography>
                <MyTypography variant="subtitle2">
                  {state.dtoEmpMaster.dob ? new Date(state.dtoEmpMaster.dob).toLocaleDateString() : 'N/A'}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Gender:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmpMaster.gender}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Email:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmpMaster.email}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Phone no:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmpMaster.phone_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Marital Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmpMaster.marital_status}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Mother Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmpMaster.mother_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Father Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmpMaster.father_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Husband/Wife Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmpMaster.husband_wife_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Address:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmpMaster.address}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Aadhaar No.:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmpMaster.aadhaar_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Pan No.:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmpMaster.pan_card}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmpMaster.status}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Photo Id Proof:</MyTypography>
                <MyTypography variant="subtitle2">
                  {typeof state.dtoEmpMaster.photoidproof === 'string' ? (
                    <a href={state.dtoEmpMaster.photoidproof} target="_blank" rel="noopener noreferrer">
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
                  {typeof state.dtoEmpMaster.photo === 'string' ? (
                    <a href={state.dtoEmpMaster.photo} target="_blank" rel="noopener noreferrer">
                      View Photo
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
          createdBy={state.dtoEmpMaster.created_by_user_name}
          createdAt={state.dtoEmpMaster.created_at}
          modifiedBy={state.dtoEmpMaster.modified_by_user_name}
          modifiedAt={state.dtoEmpMaster.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          {findPermission(userPermissions, 216) && <MyButton onClick={onEditClick}>Edit</MyButton>}
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewEmployee, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
