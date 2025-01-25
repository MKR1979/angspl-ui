'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import AccountEntry from '../account-entry';
import useAddAccount from './useAddAccount';
import AccountDTO from '@/app/types/AccountDTO';
import LookupDTO from '@/app/types/LookupDTO';
type Props = {
  dtoAccount: AccountDTO;
  arrCountryLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
  arrAccountTypeLookup: LookupDTO[];
  arrIndustryLookup: LookupDTO[];
};
const ClientAddAccount = ({ dtoAccount, arrCountryLookup, arrAssignedToLookup, arrAccountTypeLookup, arrIndustryLookup }: Props) => {
  const { state } = useAddAccount();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <AccountEntry
        dtoAccount={dtoAccount}
        arrCountryLookup={arrCountryLookup}
        arrAssignedToLookup={arrAssignedToLookup}
        arrAccountTypeLookup={arrAccountTypeLookup}
        arrIndustryLookup={arrIndustryLookup}
      />
    </>
  );
};

export default memo(ClientAddAccount, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
