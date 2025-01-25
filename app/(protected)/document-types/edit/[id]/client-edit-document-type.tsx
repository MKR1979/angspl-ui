'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import DocumentTypeEntry from '../../document-type-entry';
import useEditDocumentType from './useEditDocumentType';
import DocumentTypeDTO from '@/app/types/DocumentTypeDTO';

type Props = { dtoDocumentType: DocumentTypeDTO };

const ClientEditDocumentType = ({ dtoDocumentType }: Props) => {
  const { state } = useEditDocumentType();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <DocumentTypeEntry dtoDocumentType={dtoDocumentType} />
    </>
  );
};

export default memo(ClientEditDocumentType, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
