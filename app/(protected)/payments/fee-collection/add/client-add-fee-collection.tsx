'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import FeeCollectionEntry from '../fee-collection-entry';
import useAddFeeCollection from './useAddFeeCollection';
import FeeCollectionDTO from '@/app/types/FeeCollectionDTO';

type Props = {
  dtoFeeCollection: FeeCollectionDTO;
  };
const ClientAddFeeCollection = ({ dtoFeeCollection}: Props) => {
  const { state } = useAddFeeCollection();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <FeeCollectionEntry
        dtoFeeCollection={dtoFeeCollection} 
      />
    </>
  );
};

export default memo(ClientAddFeeCollection, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
