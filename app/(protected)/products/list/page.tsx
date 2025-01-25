import { Metadata } from 'next';
import ClientProductList from './client-product-list';
import { PRODUCT_LIST } from '@/app/graphql/Product';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import ProductDTO from '@/app/types/ProductDTO';
export const metadata: Metadata = {
  title: 'Products'
};

export const revalidate = 0;

export default async function ProductListPage() {
  let arrProductDTO: ProductDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: PRODUCT_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getProductList?.products) {
      arrProductDTO = results[0].data.getProductList.products;
    }
    if (results[0]?.data?.getProductList?.total_records) {
      total_records = results[0].data.getProductList.total_records;
    }
  } catch {}
  return <ClientProductList arrProductDTO={arrProductDTO} total_records={total_records}></ClientProductList>;
}
