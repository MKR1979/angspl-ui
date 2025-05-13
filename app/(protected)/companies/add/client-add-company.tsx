'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import CompanyEntry from '../company-entry';
import { COMPANY } from '@/app/types/CompanyDTO';
import useAddCompany from './useAddCompany';
const ClientAddCompany = () => {
  const { state } = useAddCompany();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <CompanyEntry dtoCompany={COMPANY} />
    </>
  );
};

export default memo(ClientAddCompany, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
