import { Metadata } from 'next';
import ClientEditDocumentType from './client-edit-document-type';
import { GET_DOCUMENT_TYPE } from '@/app/graphql/DocumentType';
import { createServerApolloClient } from '@/app/common/utility';
import DocumentTypeDTO, { DOCUMENT_TYPE } from '@/app/types/DocumentTypeDTO';

export const metadata: Metadata = {
  title: 'Edit Document Type'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditDocumentTypePage({ params }: Props) {
  const { id } = await params;
  let dtoDocumentType: DocumentTypeDTO = DOCUMENT_TYPE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_DOCUMENT_TYPE,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getDocumentType) {
      dtoDocumentType = results[0].data.getDocumentType;
    }
  } catch {}
  return <ClientEditDocumentType dtoDocumentType={dtoDocumentType} />;
}
