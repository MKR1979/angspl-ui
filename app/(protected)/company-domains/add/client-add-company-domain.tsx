'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import CompanyDomainEntry from '../company-domain-entry';
import { COMPANY_DOMAIN } from '@/app/types/CompanyDomainDTO';
import useAddCompanyDomain from './useAddCompanyDomain';
import LookupDTO from '@/app/types/LookupDTO';

type Props = { arrCompanyLookup: LookupDTO[] };

const ClientAddCompanyDomain = ({ arrCompanyLookup }: Props) => {
  const { state } = useAddCompanyDomain();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <CompanyDomainEntry dtoCompanyDomain={COMPANY_DOMAIN} arrCompanyLookup={arrCompanyLookup} />
    </>
  );
};

export default memo(ClientAddCompanyDomain, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
