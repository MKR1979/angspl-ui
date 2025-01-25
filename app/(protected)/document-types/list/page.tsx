import { Metadata } from 'next';
import ClientDocumentTypeList from './client-document-type-list';
import { DOCUMENT_TYPE_LIST } from '@/app/graphql/DocumentType';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import DocumentTypeDTO from '@/app/types/DocumentTypeDTO';
export const metadata: Metadata = {
  title: 'Document Types'
};

export const revalidate = 0;

export default async function DocumentTypeListPage() {
  let arrDocumentTypeDTO: DocumentTypeDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: DOCUMENT_TYPE_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getDocumentTypeList?.documentTypes) {
      arrDocumentTypeDTO = results[0].data.getDocumentTypeList.documentTypes;
    }
    if (results[0]?.data?.getDocumentTypeList?.total_records) {
      total_records = results[0].data.getDocumentTypeList.total_records;
    }
  } catch {}
  return <ClientDocumentTypeList arrDocumentTypeDTO={arrDocumentTypeDTO} total_records={total_records}></ClientDocumentTypeList>;
}
