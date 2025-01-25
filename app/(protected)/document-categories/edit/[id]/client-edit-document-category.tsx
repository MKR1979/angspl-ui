'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import DocumentCategoryEntry from '../../document-category-entry';
import useEditDocumentCategory from './useEditDocumentCategory';
import DocumentCategoryDTO from '@/app/types/DocumentCategoryDTO';

type Props = { dtoDocumentCategory: DocumentCategoryDTO };

const ClientEditDocumentCategory = ({ dtoDocumentCategory }: Props) => {
  const { state } = useEditDocumentCategory();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <DocumentCategoryEntry dtoDocumentCategory={dtoDocumentCategory} />
    </>
  );
};

export default memo(ClientEditDocumentCategory, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
