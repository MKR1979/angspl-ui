'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import LeadEntry from '../../lead-entry';
import useEditLead from './useEditLead';
import LeadDTO from '@/app/types/LeadDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = {
  dtoLead: LeadDTO;
  arrCountryLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
  arrLeadSourceLookup: LookupDTO[];
};

const ClientEditLead = ({ dtoLead, arrCountryLookup, arrAssignedToLookup, arrLeadSourceLookup }: Props) => {
  const { state } = useEditLead();

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

export default memo(ClientEditLead, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
