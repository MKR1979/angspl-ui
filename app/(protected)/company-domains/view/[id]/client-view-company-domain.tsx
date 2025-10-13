'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewCompanyDomain from './useViewCompanyDomain';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import CompanyDomainDTO from '@/app/types/CompanyDomainDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import { useSelector, RootState } from '../../../../store';
import { findPermission } from '../../../../common/utility-permission';

type Props = {
  dtoCompanyDomain: CompanyDomainDTO;
};

const ClientViewCompanyDomain = ({ dtoCompanyDomain }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewCompanyDomain({ dtoCompanyDomain });
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
                <MyTypography variant="subtitle2">{state.dtoCompanyDomain.company_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Domain Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCompanyDomain.domain_name}</MyTypography>
              </MyBox>
            </MyGrid>

            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Logo Url:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCompanyDomain.logo_url}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Logo Height:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCompanyDomain.logo_height}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Logo Width:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCompanyDomain.logo_width}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCompanyDomain.status}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoCompanyDomain.created_by_user_name}
          createdAt={state.dtoCompanyDomain.created_at}
          modifiedBy={state.dtoCompanyDomain.modified_by_user_name}
          modifiedAt={state.dtoCompanyDomain.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          {findPermission(userPermissions, 43) && <MyButton onClick={onEditClick}>Edit</MyButton>}
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewCompanyDomain, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
