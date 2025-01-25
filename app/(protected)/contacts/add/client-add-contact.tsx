'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import ContactEntry from '../contact-entry';
import useAddContact from './useAddContact';
import ContactDTO from '@/app/types/ContactDTO';
import LookupDTO from '@/app/types/LookupDTO';
type Props = {
  dtoContact: ContactDTO;
  arrCountryLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
  arrLeadSourceLookup: LookupDTO[];
  arrContactLookup: LookupDTO[];
  arrAccountLookup: LookupDTO[];
};
const ClientAddContact = ({
  dtoContact,
  arrCountryLookup,
  arrAssignedToLookup,
  arrLeadSourceLookup,
  arrContactLookup,
  arrAccountLookup
}: Props) => {
  const { state } = useAddContact();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <ContactEntry
        dtoContact={dtoContact}
        arrCountryLookup={arrCountryLookup}
        arrAssignedToLookup={arrAssignedToLookup}
        arrLeadSourceLookup={arrLeadSourceLookup}
        arrContactLookup={arrContactLookup}
        arrAccountLookup={arrAccountLookup}
      />
    </>
  );
};

export default memo(ClientAddContact, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
