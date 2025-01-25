import { Metadata } from 'next';
import ClientProductCategoryList from './client-product-category-list';
import { PRODUCT_CATEGORY_LIST } from '@/app/graphql/ProductCategory';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import ProductCategoryDTO from '@/app/types/ProductCategoryDTO';
export const metadata: Metadata = {
  title: 'Product Categories'
};

export const revalidate = 0;

export default async function ProductCategoryListPage() {
  let arrProductCategoryDTO: ProductCategoryDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: PRODUCT_CATEGORY_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getProductCategoryList?.productCategories) {
      arrProductCategoryDTO = results[0].data.getProductCategoryList.productCategories;
    }
    if (results[0]?.data?.getProductCategoryList?.total_records) {
      total_records = results[0].data.getProductCategoryList.total_records;
    }
  } catch {}
  return (
    <ClientProductCategoryList arrProductCategoryDTO={arrProductCategoryDTO} total_records={total_records}></ClientProductCategoryList>
  );
}
