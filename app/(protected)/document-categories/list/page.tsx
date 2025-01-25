import { Metadata } from 'next';
import ClientDocumentCategoryList from './client-document-category-list';
import { DOCUMENT_CATEGORY_LIST } from '@/app/graphql/DocumentCategory';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import DocumentCategoryDTO from '@/app/types/DocumentCategoryDTO';
export const metadata: Metadata = {
  title: 'Document Categories'
};

export const revalidate = 0;

export default async function DocumentCategoryListPage() {
  let arrDocumentCategoryDTO: DocumentCategoryDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: DOCUMENT_CATEGORY_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getDocumentCategoryList?.documentCategories) {
      arrDocumentCategoryDTO = results[0].data.getDocumentCategoryList.documentCategories;
    }
    if (results[0]?.data?.getDocumentCategoryList?.total_records) {
      total_records = results[0].data.getDocumentCategoryList.total_records;
    }
  } catch {}
  return (
    <ClientDocumentCategoryList arrDocumentCategoryDTO={arrDocumentCategoryDTO} total_records={total_records}></ClientDocumentCategoryList>
  );
}
