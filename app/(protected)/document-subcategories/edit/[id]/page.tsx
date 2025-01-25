import { Metadata } from 'next';
import ClientEditDocumentSubcategory from './client-edit-document-subcategory';
import { GET_DOCUMENT_SUBCATEGORY } from '@/app/graphql/DocumentSubcategory';
import { createServerApolloClient } from '@/app/common/utility';
import DocumentSubcategoryDTO, { DOCUMENT_SUBCATEGORY } from '@/app/types/DocumentSubcategoryDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { DOCUMENT_CATEGORY_LOOKUP } from '@/app/graphql/DocumentCategory';

export const metadata: Metadata = {
  title: 'Edit Document Subcategory'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditDocumentSubcategoryPage({ params }: Props) {
  const { id } = await params;
  let dtoDocumentSubcategory: DocumentSubcategoryDTO = DOCUMENT_SUBCATEGORY;
  let arrDocumentCategoryLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_DOCUMENT_SUBCATEGORY,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: DOCUMENT_CATEGORY_LOOKUP
    });
    const results = await Promise.all([result, result1]);
    if (results[0]?.data?.getDocumentSubcategory) {
      dtoDocumentSubcategory = results[0].data.getDocumentSubcategory;
    }
    if (results[1]?.data?.getDocumentCategoryLookup) {
      arrDocumentCategoryLookup = results[1].data.getDocumentCategoryLookup;
    }
  } catch {}
  return (
    <ClientEditDocumentSubcategory dtoDocumentSubcategory={dtoDocumentSubcategory} arrDocumentCategoryLookup={arrDocumentCategoryLookup} />
  );
}
