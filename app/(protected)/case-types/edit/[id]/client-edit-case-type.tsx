'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import CaseTypeEntry from '../../case-type-entry';
import useEditCaseType from './useEditCaseType';
import CaseTypeDTO from '@/app/types/CaseTypeDTO';

type Props = { dtoCaseType: CaseTypeDTO };

const ClientEditCaseType = ({ dtoCaseType }: Props) => {
  const { state } = useEditCaseType();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <CaseTypeEntry dtoCaseType={dtoCaseType} />
    </>
  );
};

export default memo(ClientEditCaseType, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
