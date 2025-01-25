'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import DocumentSubcategoryEntry from '../document-subcategory-entry';
import useAddDocumentSubcategory from './useAddDocumentSubcategory';
import { DOCUMENT_SUBCATEGORY } from '@/app/types/DocumentSubcategoryDTO';
import LookupDTO from '@/app/types/LookupDTO';
type Props = {
  arrDocumentCategoryLookup: LookupDTO[];
};
const ClientAddDocumentSubcategory = ({ arrDocumentCategoryLookup }: Props) => {
  const { state } = useAddDocumentSubcategory();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <DocumentSubcategoryEntry dtoDocumentSubcategory={DOCUMENT_SUBCATEGORY} arrDocumentCategoryLookup={arrDocumentCategoryLookup} />
    </>
  );
};

export default memo(ClientAddDocumentSubcategory, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
