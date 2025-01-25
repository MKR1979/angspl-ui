'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import DocumentSubcategoryEntry from '../../document-subcategory-entry';
import useEditDocumentSubcategory from './useEditDocumentSubcategory';
import DocumentSubcategoryDTO from '@/app/types/DocumentSubcategoryDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = { dtoDocumentSubcategory: DocumentSubcategoryDTO; arrDocumentCategoryLookup: LookupDTO[] };

const ClientEditDocumentSubcategory = ({ dtoDocumentSubcategory, arrDocumentCategoryLookup }: Props) => {
  const { state } = useEditDocumentSubcategory();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <DocumentSubcategoryEntry dtoDocumentSubcategory={dtoDocumentSubcategory} arrDocumentCategoryLookup={arrDocumentCategoryLookup} />
    </>
  );
};

export default memo(ClientEditDocumentSubcategory, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
