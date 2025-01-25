'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import DocumentEntry from '../document-entry';
import useAddDocument from './useAddDocument';
import { DOCUMENT } from '@/app/types/DocumentDTO';
import LookupDTO from '@/app/types/LookupDTO';
type Props = {
  arrDocumentTypeLookup: LookupDTO[];
  arrDocumentCategoryLookup: LookupDTO[];
  arrDocumentLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};
const ClientAddDocument = ({ arrDocumentTypeLookup, arrDocumentCategoryLookup, arrDocumentLookup, arrAssignedToLookup }: Props) => {
  const { state } = useAddDocument();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <DocumentEntry
        dtoDocument={DOCUMENT}
        arrDocumentTypeLookup={arrDocumentTypeLookup}
        arrDocumentCategoryLookup={arrDocumentCategoryLookup}
        arrDocumentLookup={arrDocumentLookup}
        arrAssignedToLookup={arrAssignedToLookup}
      />
    </>
  );
};

export default memo(ClientAddDocument, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
