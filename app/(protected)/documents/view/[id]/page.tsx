import { Metadata } from 'next';
import ClientViewDocument from './client-view-document';
import { GET_DOCUMENT } from '@/app/graphql/Document';
import { createServerApolloClient } from '@/app/common/utility';
import DocumentDTO, { DOCUMENT } from '@/app/types/DocumentDTO';

export const metadata: Metadata = {
  title: 'View Document'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewDocumentPage({ params }: Props) {
  const { id } = await params;
  let dtoDocument: DocumentDTO = DOCUMENT;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_DOCUMENT,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getDocument) {
      dtoDocument = results[0].data.getDocument;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewDocument dtoDocument={dtoDocument}></ClientViewDocument>;
}
