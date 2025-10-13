'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewUserDevice from './useViewUserDevice';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import UserDeviceDTO from '@/app/types/UserDeviceDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import { useSelector, RootState } from '../../../../../store';
import { findPermission } from '../../../../../common/utility-permission';

type Props = {
  dtoUserDevice: UserDeviceDTO;
};

const ClientViewUserDevice = ({ dtoUserDevice }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewUserDevice({ dtoUserDevice });
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
                <MyTypography variant="subtitle2">{state.dtoUserDevice.name}</MyTypography>
              </MyBox>
            </MyGrid>

            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Device Info:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoUserDevice.device_info}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Remarks:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoUserDevice.remarks}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoUserDevice.status}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoUserDevice.created_by_user_name}
          createdAt={state.dtoUserDevice.created_at}
          modifiedBy={state.dtoUserDevice.modified_by_user_name}
          modifiedAt={state.dtoUserDevice.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          {findPermission(userPermissions, 183) && <MyButton onClick={onEditClick}>Edit</MyButton>}
          <MyButton onClick={onCancelClick}>Close</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewUserDevice, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
