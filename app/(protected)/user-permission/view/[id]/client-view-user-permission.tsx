'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewUserPermission from './useViewUserPermission';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import UserPermissionDTO from '@/app/types/UserPermissionDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import { useSelector, RootState } from '../../../../store';
import { findPermission } from '../../../../common/utility-permission';

type Props = {
  dtoUserPermission: UserPermissionDTO;
};

const ClientViewUserPermission = ({ dtoUserPermission }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewUserPermission({ dtoUserPermission });
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">User Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoUserPermission.user_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Module Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoUserPermission.module_name}</MyTypography>
              </MyBox>
            </MyGrid>

            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Option Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoUserPermission.option_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Grant:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoUserPermission.grant ? 'true' : 'false'}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoUserPermission.created_by_user_name}
          createdAt={state.dtoUserPermission.created_at}
          modifiedBy={state.dtoUserPermission.modified_by_user_name}
          modifiedAt={state.dtoUserPermission.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          {findPermission(userPermissions, 188) && <MyButton onClick={onEditClick}>Edit</MyButton>}
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewUserPermission, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
