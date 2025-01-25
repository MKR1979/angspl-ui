'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import CaseEntry from '../../case-entry';
import useEditCase from './useEditCase';
import CaseDTO from '@/app/types/CaseDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = {
  dtoCase: CaseDTO;
  arrAccountLookup: LookupDTO[];
  arrCasePriorityLookup: LookupDTO[];
  arrCaseStatusLookup: LookupDTO[];
  arrCaseStateLookup: LookupDTO[];
  arrCaseTypeLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const ClientEditCase = ({
  dtoCase,
  arrAccountLookup,
  arrCasePriorityLookup,
  arrCaseStatusLookup,
  arrCaseStateLookup,
  arrCaseTypeLookup,
  arrAssignedToLookup
}: Props) => {
  const { state } = useEditCase();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <CaseEntry
        dtoCase={dtoCase}
        arrAccountLookup={arrAccountLookup}
        arrCasePriorityLookup={arrCasePriorityLookup}
        arrCaseStatusLookup={arrCaseStatusLookup}
        arrCaseStateLookup={arrCaseStateLookup}
        arrCaseTypeLookup={arrCaseTypeLookup}
        arrAssignedToLookup={arrAssignedToLookup}
      />
    </>
  );
};

export default memo(ClientEditCase, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
