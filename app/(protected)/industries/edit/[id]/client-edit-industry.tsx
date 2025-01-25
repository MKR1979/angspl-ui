'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import IndustryEntry from '../../industry-entry';
import useEditIndustry from './useEditIndustry';
import IndustryDTO from '@/app/types/IndustryDTO';

type Props = { dtoIndustry: IndustryDTO };

const ClientEditIndustry = ({ dtoIndustry }: Props) => {
  const { state } = useEditIndustry();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <IndustryEntry dtoIndustry={dtoIndustry} />
    </>
  );
};

export default memo(ClientEditIndustry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
