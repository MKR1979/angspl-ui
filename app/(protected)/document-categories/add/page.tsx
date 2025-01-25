import { Metadata } from 'next';
import ClientAddDocumentCategory from './client-add-document-category';

export const metadata: Metadata = {
  title: 'Add Document Category'
};

export const revalidate = 0;

export default async function AddDocumentCategoryPage() {
  return <ClientAddDocumentCategory></ClientAddDocumentCategory>;
}
