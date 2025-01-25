'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import OpportunityEntry from '../opportunity-entry';
import useAddOpportunity from './useAddOpportunity';
import OpportunityDTO from '@/app/types/OpportunityDTO';
import LookupDTO from '@/app/types/LookupDTO';
type Props = {
  dtoOpportunity: OpportunityDTO;
  arrAccountLookup: LookupDTO[];
  arrCurrencyLookup: LookupDTO[];
  arrStageLookup: LookupDTO[];
  arrOpportunityTypeLookup: LookupDTO[];
  arrLeadSourceLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};
const ClientAddOpportunity = ({
  dtoOpportunity,
  arrAccountLookup,
  arrCurrencyLookup,
  arrStageLookup,
  arrOpportunityTypeLookup,
  arrLeadSourceLookup,
  arrAssignedToLookup
}: Props) => {
  const { state } = useAddOpportunity();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <OpportunityEntry
        dtoOpportunity={dtoOpportunity}
        arrAccountLookup={arrAccountLookup}
        arrCurrencyLookup={arrCurrencyLookup}
        arrStageLookup={arrStageLookup}
        arrOpportunityTypeLookup={arrOpportunityTypeLookup}
        arrLeadSourceLookup={arrLeadSourceLookup}
        arrAssignedToLookup={arrAssignedToLookup}
      />
    </>
  );
};

export default memo(ClientAddOpportunity, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
