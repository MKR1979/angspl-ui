'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import CurrencyEntry from '../currency-entry';
import useAddCurrency from './useAddCurrency';
import { CURRENCY } from '@/app/types/CurrencyDTO';

const ClientAddCurrency = () => {
  const { state } = useAddCurrency();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <CurrencyEntry dtoCurrency={CURRENCY} />
    </>
  );
};

export default memo(ClientAddCurrency, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
