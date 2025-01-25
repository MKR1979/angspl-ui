import { Metadata } from 'next';
import ClientViewDocumentSubcategory from './client-view-document-subcategory';
import { GET_DOCUMENT_SUBCATEGORY } from '@/app/graphql/DocumentSubcategory';
import { createServerApolloClient } from '@/app/common/utility';
import DocumentSubcategoryDTO, { DOCUMENT_SUBCATEGORY } from '@/app/types/DocumentSubcategoryDTO';

export const metadata: Metadata = {
  title: 'View Document Subcategory'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewDocumentSubcategoryPage({ params }: Props) {
  const { id } = await params;
  let dtoDocumentSubcategory: DocumentSubcategoryDTO = DOCUMENT_SUBCATEGORY;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_DOCUMENT_SUBCATEGORY,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getDocumentSubcategory) {
      dtoDocumentSubcategory = results[0].data.getDocumentSubcategory;
    }
  } catch {}
  return <ClientViewDocumentSubcategory dtoDocumentSubcategory={dtoDocumentSubcategory}></ClientViewDocumentSubcategory>;
}
