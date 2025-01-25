'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import DocumentEntry from '../../document-entry';
import useEditDocument from './useEditDocument';
import DocumentDTO from '@/app/types/DocumentDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = {
  dtoDocument: DocumentDTO;
  arrDocumentTypeLookup: LookupDTO[];
  arrDocumentCategoryLookup: LookupDTO[];
  arrDocumentLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const ClientEditDocument = ({
  dtoDocument,
  arrDocumentTypeLookup,
  arrDocumentCategoryLookup,
  arrDocumentLookup,
  arrAssignedToLookup
}: Props) => {
  const { state } = useEditDocument();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <DocumentEntry
        dtoDocument={dtoDocument}
        arrDocumentTypeLookup={arrDocumentTypeLookup}
        arrDocumentCategoryLookup={arrDocumentCategoryLookup}
        arrDocumentLookup={arrDocumentLookup}
        arrAssignedToLookup={arrAssignedToLookup}
      />
    </>
  );
};

export default memo(ClientEditDocument, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
