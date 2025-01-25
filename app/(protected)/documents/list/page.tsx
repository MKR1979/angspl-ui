import { Metadata } from 'next';
import ClientDocumentList from './client-document-list';
import { DOCUMENT_LIST } from '@/app/graphql/Document';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import DocumentDTO from '@/app/types/DocumentDTO';
export const metadata: Metadata = {
  title: 'Documents'
};

export const revalidate = 0;

export default async function DocumentListPage() {
  let arrDocumentDTO: DocumentDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: DOCUMENT_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getDocumentList?.documents) {
      arrDocumentDTO = results[0].data.getDocumentList.documents;
    }
    if (results[0]?.data?.getDocumentList?.total_records) {
      total_records = results[0].data.getDocumentList.total_records;
    }
  } catch {}
  return <ClientDocumentList arrDocumentDTO={arrDocumentDTO} total_records={total_records}></ClientDocumentList>;
}
