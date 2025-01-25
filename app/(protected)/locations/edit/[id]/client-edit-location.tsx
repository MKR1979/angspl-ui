'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import LocationEntry from '../../location-entry';
import useEditLocation from './useEditLocation';
import LocationDTO from '@/app/types/LocationDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = {
  dtoLocation: LocationDTO;
  arrCountryLookup: LookupDTO[];
};

const ClientEditLocation = ({ dtoLocation, arrCountryLookup }: Props) => {
  const { state } = useEditLocation();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <LocationEntry dtoLocation={dtoLocation} arrCountryLookup={arrCountryLookup} />
    </>
  );
};

export default memo(ClientEditLocation, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
