import { Metadata } from 'next';
import ClientViewDocumentType from './client-view-document-type';
import { GET_DOCUMENT_TYPE } from '@/app/graphql/DocumentType';
import { createServerApolloClient } from '@/app/common/utility';
import DocumentTypeDTO, { DOCUMENT_TYPE } from '@/app/types/DocumentTypeDTO';

export const metadata: Metadata = {
  title: 'View Document Type'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewDocumentTypePage({ params }: Props) {
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
  return <ClientViewDocumentType dtoDocumentType={dtoDocumentType}></ClientViewDocumentType>;
}
