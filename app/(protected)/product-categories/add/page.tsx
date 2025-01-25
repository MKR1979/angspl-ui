import { Metadata } from 'next';
import ClientAddProductCategory from './client-add-product-category';

export const metadata: Metadata = {
  title: 'Add Product Category'
};

export const revalidate = 0;

export default async function AddProductCategoryPage() {
  return <ClientAddProductCategory></ClientAddProductCategory>;
}
