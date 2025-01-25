'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import LeadEntry from '../lead-entry';
import useAddLead from './useAddLead';
import LeadDTO from '@/app/types/LeadDTO';
import LookupDTO from '@/app/types/LookupDTO';
type Props = {
  dtoLead: LeadDTO;
  arrCountryLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
  arrLeadSourceLookup: LookupDTO[];
};
const ClientAddLead = ({ dtoLead, arrCountryLookup, arrAssignedToLookup, arrLeadSourceLookup }: Props) => {
  const { state } = useAddLead();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <LeadEntry
        dtoLead={dtoLead}
        arrCountryLookup={arrCountryLookup}
        arrAssignedToLookup={arrAssignedToLookup}
        arrLeadSourceLookup={arrLeadSourceLookup}
      />
    </>
  );
};

export default memo(ClientAddLead, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
