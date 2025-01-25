import { Metadata } from 'next';
import ClientEditDocument from './client-edit-document';
import { DOCUMENT_LOOKUP, GET_DOCUMENT } from '@/app/graphql/Document';
import { createServerApolloClient } from '@/app/common/utility';
import DocumentDTO, { DOCUMENT } from '@/app/types/DocumentDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { DOCUMENT_CATEGORY_LOOKUP } from '@/app/graphql/DocumentCategory';
import { DOCUMENT_TYPE_LOOKUP } from '@/app/graphql/DocumentType';
import { USER_LOOKUP } from '@/app/graphql/User';

export const metadata: Metadata = {
  title: 'Edit Document'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditDocumentPage({ params }: Props) {
  const { id } = await params;
  let arrDocumentTypeLookup: LookupDTO[] = [];
  let arrDocumentCategoryLookup: LookupDTO[] = [];
  let arrDocumentLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  let dtoDocument: DocumentDTO = DOCUMENT;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_DOCUMENT,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: DOCUMENT_TYPE_LOOKUP
    });
    const result2 = apolloClient.query({
      query: DOCUMENT_CATEGORY_LOOKUP
    });
    const result3 = apolloClient.query({
      query: DOCUMENT_LOOKUP
    });
    const result4 = apolloClient.query({
      query: USER_LOOKUP
    });
    const results = await Promise.all([result, result1, result2, result3, result4]);
    if (results[0]?.data?.getDocument) {
      dtoDocument = results[0].data.getDocument;
    }
    if (results[1]?.data?.getDocumentTypeLookup) {
      arrDocumentTypeLookup = results[1].data.getDocumentTypeLookup;
    }
    if (results[2]?.data?.getDocumentCategoryLookup) {
      arrDocumentCategoryLookup = results[2].data.getDocumentCategoryLookup;
    }
    if (results[3]?.data?.getDocumentLookup) {
      arrDocumentLookup = results[3].data.getDocumentLookup;
    }
    if (results[4]?.data?.getUserLookup) {
      arrAssignedToLookup = results[4].data.getUserLookup;
    }
  } catch {}
  return (
    <ClientEditDocument
      dtoDocument={dtoDocument}
      arrDocumentTypeLookup={arrDocumentTypeLookup}
      arrDocumentCategoryLookup={arrDocumentCategoryLookup}
      arrDocumentLookup={arrDocumentLookup}
      arrAssignedToLookup={arrAssignedToLookup}
    />
  );
}
