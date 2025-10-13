'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import CompanyDomainEntry from '../../company-domain-entry';
import useEditCompanyDomain from './useEditCompanyDomain';
import CompanyDomainDTO from '@/app/types/CompanyDomainDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = { dtoCompanyDomain: CompanyDomainDTO, arrCompanyLookup: LookupDTO[] };

const ClientEditCompanyDomain = ({ dtoCompanyDomain, arrCompanyLookup }: Props) => {
  const { state } = useEditCompanyDomain();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <CompanyDomainEntry dtoCompanyDomain={dtoCompanyDomain} arrCompanyLookup={arrCompanyLookup} />
    </>
  );
};

export default memo(ClientEditCompanyDomain, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
