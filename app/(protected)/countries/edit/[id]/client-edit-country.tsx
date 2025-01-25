'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import CountryEntry from '../../country-entry';
import useEditCountry from './useEditCountry';
import CountryDTO from '@/app/types/CountryDTO';

type Props = { dtoCountry: CountryDTO };

const ClientEditCountry = ({ dtoCountry }: Props) => {
  const { state } = useEditCountry();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <CountryEntry dtoCountry={dtoCountry} />
    </>
  );
};

export default memo(ClientEditCountry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
