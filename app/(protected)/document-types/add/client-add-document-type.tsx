'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import DocumentTypeEntry from '../document-type-entry';
import useAddDocumentType from './useAddDocumentType';
import { DOCUMENT_TYPE } from '@/app/types/DocumentTypeDTO';

const ClientAddDocumentType = () => {
  const { state } = useAddDocumentType();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <DocumentTypeEntry dtoDocumentType={DOCUMENT_TYPE} />
    </>
  );
};

export default memo(ClientAddDocumentType, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
