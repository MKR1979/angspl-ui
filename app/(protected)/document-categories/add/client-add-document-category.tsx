'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import DocumentCategoryEntry from '../document-category-entry';
import useAddDocumentCategory from './useAddDocumentCategory';
import { DOCUMENT_CATEGORY } from '@/app/types/DocumentCategoryDTO';

const ClientAddDocumentCategory = () => {
  const { state } = useAddDocumentCategory();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <DocumentCategoryEntry dtoDocumentCategory={DOCUMENT_CATEGORY} />
    </>
  );
};

export default memo(ClientAddDocumentCategory, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
