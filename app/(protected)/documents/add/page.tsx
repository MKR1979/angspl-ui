import { Metadata } from 'next';
import ClientAddDocument from './client-add-document';
import LookupDTO from '@/app/types/LookupDTO';
import { createServerApolloClient } from '@/app/common/utility';
import { DOCUMENT_CATEGORY_LOOKUP } from '@/app/graphql/DocumentCategory';
import { DOCUMENT_TYPE_LOOKUP } from '@/app/graphql/DocumentType';
import { DOCUMENT_LOOKUP } from '@/app/graphql/Document';
import { USER_LOOKUP } from '@/app/graphql/User';

export const metadata: Metadata = {
  title: 'Add Document'
};

export const revalidate = 0;

export default async function AddDocumentPage() {
  let arrDocumentTypeLookup: LookupDTO[] = [];
  let arrDocumentCategoryLookup: LookupDTO[] = [];
  let arrDocumentLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: DOCUMENT_TYPE_LOOKUP
    });
    const result1 = apolloClient.query({
      query: DOCUMENT_CATEGORY_LOOKUP
    });
    const result2 = apolloClient.query({
      query: DOCUMENT_LOOKUP
    });
    const result3 = apolloClient.query({
      query: USER_LOOKUP
    });
    const results = await Promise.all([result, result1, result2, result3]);
    if (results[0]?.data?.getDocumentTypeLookup) {
      arrDocumentTypeLookup = results[0].data.getDocumentTypeLookup;
    }
    if (results[1]?.data?.getDocumentCategoryLookup) {
      arrDocumentCategoryLookup = results[1].data.getDocumentCategoryLookup;
    }
    if (results[2]?.data?.getDocumentLookup) {
      arrDocumentLookup = results[2].data.getDocumentLookup;
    }
    if (results[3]?.data?.getUserLookup) {
      arrAssignedToLookup = results[3].data.getUserLookup;
    }
  } catch (e) {
    console.log('hello', JSON.stringify(e));
  }
  return (
    <ClientAddDocument
      arrDocumentTypeLookup={arrDocumentTypeLookup}
      arrDocumentCategoryLookup={arrDocumentCategoryLookup}
      arrDocumentLookup={arrDocumentLookup}
      arrAssignedToLookup={arrAssignedToLookup}
    ></ClientAddDocument>
  );
}
