import { Metadata } from 'next';
import ClientViewProductCategory from './client-view-product-category';
import { GET_PRODUCT_CATEGORY } from '@/app/graphql/ProductCategory';
import { createServerApolloClient } from '@/app/common/utility';
import ProductCategoryDTO, { PRODUCT_CATEGORY } from '@/app/types/ProductCategoryDTO';

export const metadata: Metadata = {
  title: 'View Product Category'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewProductCategoryPage({ params }: Props) {
  const { id } = await params;
  let dtoProductCategory: ProductCategoryDTO = PRODUCT_CATEGORY;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_PRODUCT_CATEGORY,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getProductCategory) {
      dtoProductCategory = results[0].data.getProductCategory;
    }
  } catch {}
  return <ClientViewProductCategory dtoProductCategory={dtoProductCategory}></ClientViewProductCategory>;
}
