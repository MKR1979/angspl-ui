'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewRole from './useViewRole';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import RoleDTO from '@/app/types/RoleDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import { useSelector, RootState } from '../../../../store';
import { findPermission } from '../../../../common/utility-permission';

type Props = {
  dtoRole: RoleDTO;
};

const ClientViewRole = ({ dtoRole }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewRole({ dtoRole });

  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Role Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoRole.role_name}</MyTypography>
              </MyBox>
            </MyGrid>
               <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Type Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoRole.type_name}</MyTypography>
              </MyBox>
            </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoRole.status}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoRole.created_by_user_name}
          createdAt={state.dtoRole.created_at}
          modifiedBy={state.dtoRole.modified_by_user_name}
          modifiedAt={state.dtoRole.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          {findPermission(userPermissions, 143) && <MyButton onClick={onEditClick}>Edit</MyButton>}
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewRole, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
