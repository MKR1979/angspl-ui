import { Metadata } from 'next';
import ClientAddDocumentType from './client-add-document-type';

export const metadata: Metadata = {
  title: 'Add Document Type'
};

export const revalidate = 0;

export default async function AddDocumentTypePage() {
  return <ClientAddDocumentType></ClientAddDocumentType>;
}
