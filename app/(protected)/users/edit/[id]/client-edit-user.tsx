'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import UserEntry from '../../user-entry';
import useEditUser from './useEditUser';
import UserDTO from '@/app/types/UserDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = { dtoUser: UserDTO; arrRoleLookup: LookupDTO[]; arrTypeLookup: LookupDTO[] };

const ClientEditUser = ({ dtoUser, arrRoleLookup, arrTypeLookup }: Props) => {
  const { state } = useEditUser();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <UserEntry dtoUser={dtoUser} arrRoleLookup={arrRoleLookup} arrTypeLookup={arrTypeLookup}/>
    </>
  );
};

export default memo(ClientEditUser, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
