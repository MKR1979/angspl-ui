import { Metadata } from 'next';
import ClientViewProduct from './client-view-product';
import { GET_PRODUCT } from '@/app/graphql/Product';
import { createServerApolloClient } from '@/app/common/utility';
import ProductDTO, { PRODUCT } from '@/app/types/ProductDTO';

export const metadata: Metadata = {
  title: 'View Product'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewProductPage({ params }: Props) {
  const { id } = await params;
  let dtoProduct: ProductDTO = PRODUCT;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_PRODUCT,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getProduct) {
      dtoProduct = results[0].data.getProduct;
    }
  } catch {}
  return <ClientViewProduct dtoProduct={dtoProduct}></ClientViewProduct>;
}
