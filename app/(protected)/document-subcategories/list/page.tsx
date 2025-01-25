import { Metadata } from 'next';
import ClientDocumentSubcategoryList from './client-document-subcategory-list';
import { DOCUMENT_SUBCATEGORY_LIST } from '@/app/graphql/DocumentSubcategory';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import DocumentSubcategoryDTO from '@/app/types/DocumentSubcategoryDTO';
export const metadata: Metadata = {
  title: 'Document Subcategories'
};

export const revalidate = 0;

export default async function DocumentSubcategoryListPage() {
  let arrDocumentSubcategoryDTO: DocumentSubcategoryDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: DOCUMENT_SUBCATEGORY_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getDocumentSubcategoryList?.documentSubcategories) {
      arrDocumentSubcategoryDTO = results[0].data.getDocumentSubcategoryList.documentSubcategories;
    }
    if (results[0]?.data?.getDocumentSubcategoryList?.total_records) {
      total_records = results[0].data.getDocumentSubcategoryList.total_records;
    }
  } catch {}
  return (
    <ClientDocumentSubcategoryList
      arrDocumentSubcategoryDTO={arrDocumentSubcategoryDTO}
      total_records={total_records}
    ></ClientDocumentSubcategoryList>
  );
}
