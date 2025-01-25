'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import CountryEntry from '../country-entry';
import useAddCountry from './useAddCountry';
import { COUNTRY } from '@/app/types/CountryDTO';

const ClientAddCountry = () => {
  const { state } = useAddCountry();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <CountryEntry dtoCountry={COUNTRY} />
    </>
  );
};

export default memo(ClientAddCountry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
