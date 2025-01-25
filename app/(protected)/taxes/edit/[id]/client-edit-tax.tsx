'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import TaxEntry from '../../tax-entry';
import useEditTax from './useEditTax';
import TaxDTO from '@/app/types/TaxDTO';

type Props = { dtoTax: TaxDTO };

const ClientEditTax = ({ dtoTax }: Props) => {
  const { state } = useEditTax();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <TaxEntry dtoTax={dtoTax} />
    </>
  );
};

export default memo(ClientEditTax, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
