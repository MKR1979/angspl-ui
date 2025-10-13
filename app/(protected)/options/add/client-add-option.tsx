'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import OptionEntry from '../option-entry';
import useAddOption from './useAddOption';
import { OPTION } from '@/app/types/OptionDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = { arrModuleLookup: LookupDTO[] };

const ClientAddOption = ({ arrModuleLookup }: Props) => {
  const { state } = useAddOption();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <OptionEntry dtoOption={OPTION} arrModuleLookup={arrModuleLookup} />
    </>
  );
};

export default memo(ClientAddOption, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
