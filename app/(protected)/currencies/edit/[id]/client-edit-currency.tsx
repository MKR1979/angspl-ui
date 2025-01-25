'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import CurrencyEntry from '../../currency-entry';
import useEditCurrency from './useEditCurrency';
import CurrencyDTO from '@/app/types/CurrencyDTO';

type Props = { dtoCurrency: CurrencyDTO };

const ClientEditCurrency = ({ dtoCurrency }: Props) => {
  const { state } = useEditCurrency();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <CurrencyEntry dtoCurrency={dtoCurrency} />
    </>
  );
};

export default memo(ClientEditCurrency, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
