import { Metadata } from 'next';
import ClientEditDocumentCategory from './client-edit-document-category';
import { GET_DOCUMENT_CATEGORY } from '@/app/graphql/DocumentCategory';
import { createServerApolloClient } from '@/app/common/utility';
import DocumentCategoryDTO, { DOCUMENT_CATEGORY } from '@/app/types/DocumentCategoryDTO';

export const metadata: Metadata = {
  title: 'Edit Document Category'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditDocumentCategoryPage({ params }: Props) {
  const { id } = await params;
  let dtoDocumentCategory: DocumentCategoryDTO = DOCUMENT_CATEGORY;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_DOCUMENT_CATEGORY,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getDocumentCategory) {
      dtoDocumentCategory = results[0].data.getDocumentCategory;
    }
  } catch {}
  return <ClientEditDocumentCategory dtoDocumentCategory={dtoDocumentCategory} />;
}
