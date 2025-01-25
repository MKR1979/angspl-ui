import { Metadata } from 'next';
import ClientEditProduct from './client-edit-product';
import { GET_PRODUCT } from '@/app/graphql/Product';
import { createServerApolloClient } from '@/app/common/utility';
import ProductDTO, { PRODUCT } from '@/app/types/ProductDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { PRODUCT_CATEGORY_LOOKUP } from '@/app/graphql/ProductCategory';
import { CURRENCY_LOOKUP } from '@/app/graphql/Currency';
import { UNIT_LOOKUP } from '@/app/graphql/Unit';

export const metadata: Metadata = {
  title: 'Edit Product'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  let arrUnitLookup: LookupDTO[] = [];
  let arrProductCategoryLookup: LookupDTO[] = [];
  let arrCurrencyLookup: LookupDTO[] = [];
  let dtoProduct: ProductDTO = PRODUCT;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_PRODUCT,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: UNIT_LOOKUP
    });
    const result2 = apolloClient.query({
      query: PRODUCT_CATEGORY_LOOKUP
    });
    const result3 = apolloClient.query({
      query: CURRENCY_LOOKUP
    });
    const results = await Promise.all([result, result1, result2, result3]);
    if (results[0]?.data?.getProduct) {
      dtoProduct = results[0].data.getProduct;
    }
    if (results[1]?.data?.getUnitLookup) {
      arrUnitLookup = results[1].data.getUnitLookup;
    }
    if (results[2]?.data?.getProductCategoryLookup) {
      arrProductCategoryLookup = results[2].data.getProductCategoryLookup;
    }
    if (results[3]?.data?.getCurrencyLookup) {
      arrCurrencyLookup = results[3].data.getCurrencyLookup;
    }
  } catch {}
  return (
    <ClientEditProduct
      dtoProduct={dtoProduct}
      arrUnitLookup={arrUnitLookup}
      arrProductCategoryLookup={arrProductCategoryLookup}
      arrCurrencyLookup={arrCurrencyLookup}
    />
  );
}
