'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import UserDeviceEntry from '../../userDevice';
import useUserDeviceEntry from './useEditUserDevice';
import UserDeviceDTO from '@/app/types/UserDeviceDTO';

type Props = { dtoUserDevice: UserDeviceDTO };

const ClientEditUserDevice = ({ dtoUserDevice }: Props) => {
  const { state } = useUserDeviceEntry();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <UserDeviceEntry dtoUserDevice={dtoUserDevice} />
    </>
  );
};

export default memo(ClientEditUserDevice, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
