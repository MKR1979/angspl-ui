'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import OptionEntry from '../../option-entry';
import useEditOption from './useEditOption';
import OptionDTO from '@/app/types/OptionDTO';
import LookupDTO from '@/app/types/LookupDTO';


type Props = { dtoOption: OptionDTO; arrModuleLookup: LookupDTO[] };

const ClientEditOption = ({ dtoOption, arrModuleLookup }: Props) => {
  const { state } = useEditOption();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <OptionEntry dtoOption={dtoOption} arrModuleLookup={arrModuleLookup} />
    </>
  );
};

export default memo(ClientEditOption, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
