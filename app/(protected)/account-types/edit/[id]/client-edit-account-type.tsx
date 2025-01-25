'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import AccountTypeEntry from '../../account-type-entry';
import useEditAccountType from './useEditAccountType';
import AccountTypeDTO from '@/app/types/AccountTypeDTO';

type Props = { dtoAccountType: AccountTypeDTO };

const ClientEditAccountType = ({ dtoAccountType }: Props) => {
  const { state } = useEditAccountType();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <AccountTypeEntry dtoAccountType={dtoAccountType} />
    </>
  );
};

export default memo(ClientEditAccountType, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
