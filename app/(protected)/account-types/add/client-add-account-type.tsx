'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import AccountTypeEntry from '../account-type-entry';
import useAddAccountType from './useAddAccountType';
import { ACCOUNT_TYPE } from '@/app/types/AccountTypeDTO';

const ClientAddAccountType = () => {
  const { state } = useAddAccountType();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <AccountTypeEntry dtoAccountType={ACCOUNT_TYPE} />
    </>
  );
};

export default memo(ClientAddAccountType, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
