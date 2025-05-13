'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import CompanyEntry from '../../company-entry';
import useEditCompany from './useEditCompany';
import CompanyDTO from '@/app/types/CompanyDTO';

type Props = { dtoCompany: CompanyDTO };

const ClientEditCompany = ({ dtoCompany }: Props) => {
  const { state } = useEditCompany();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <CompanyEntry dtoCompany={dtoCompany} />
    </>
  );
};

export default memo(ClientEditCompany, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
