'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewCompany from './useViewCompany';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import CompanyDTO from '@/app/types/CompanyDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import { useSelector, RootState } from '../../../../store';
import { findPermission } from '../../../../common/utility-permission';

type Props = {
  dtoCompany: CompanyDTO;
};

const ClientViewCompany = ({ dtoCompany }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewCompany({ dtoCompany });
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Company Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCompany.company_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Company Code:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCompany.company_code}</MyTypography>
              </MyBox>
            </MyGrid>

            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Company Type:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCompany.company_type}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Email:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCompany.email}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Phone No:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCompany.phone_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Addess:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCompany.address}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCompany.status}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoCompany.created_by_user_name}
          createdAt={state.dtoCompany.created_at}
          modifiedBy={state.dtoCompany.modified_by_user_name}
          modifiedAt={state.dtoCompany.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          {findPermission(userPermissions, 38) && <MyButton onClick={onEditClick}>Edit</MyButton>}
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewCompany, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
