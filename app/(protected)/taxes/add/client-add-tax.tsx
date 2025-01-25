'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import TaxEntry from '../tax-entry';
import useAddTax from './useAddTax';
import { TAX } from '@/app/types/TaxDTO';

const ClientAddTax = () => {
  const { state } = useAddTax();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <TaxEntry dtoTax={TAX} />
    </>
  );
};

export default memo(ClientAddTax, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
