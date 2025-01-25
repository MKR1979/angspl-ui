import { Metadata } from 'next';
import ClientAddDocumentSubcategory from './client-add-document-subcategory';
import LookupDTO from '@/app/types/LookupDTO';
import { DOCUMENT_CATEGORY_LOOKUP } from '@/app/graphql/DocumentCategory';
import { createServerApolloClient } from '@/app/common/utility';

export const metadata: Metadata = {
  title: 'Add Document Subcategory'
};

export const revalidate = 0;

export default async function AddDocumentSubcategoryPage() {
  let arrDocumentCategoryLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: DOCUMENT_CATEGORY_LOOKUP
    });
    const results = await Promise.all([result]);

    if (results[0]?.data?.getDocumentCategoryLookup) {
      arrDocumentCategoryLookup = results[0].data.getDocumentCategoryLookup;
    }
  } catch (e) {
    console.log('hello', JSON.stringify(e));
  }
  return <ClientAddDocumentSubcategory arrDocumentCategoryLookup={arrDocumentCategoryLookup}></ClientAddDocumentSubcategory>;
}
