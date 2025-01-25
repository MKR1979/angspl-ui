import { Metadata } from 'next';
import ClientAddProduct from './client-add-product';
import LookupDTO from '@/app/types/LookupDTO';
import { createServerApolloClient } from '@/app/common/utility';
import { PRODUCT_CATEGORY_LOOKUP } from '@/app/graphql/ProductCategory';
import { CURRENCY_LOOKUP } from '@/app/graphql/Currency';
import { UNIT_LOOKUP } from '@/app/graphql/Unit';

export const metadata: Metadata = {
  title: 'Add Product'
};

export const revalidate = 0;

export default async function AddProductPage() {
  let arrUnitLookup: LookupDTO[] = [];
  let arrProductCategoryLookup: LookupDTO[] = [];
  let arrCurrencyLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: UNIT_LOOKUP
    });
    const result1 = apolloClient.query({
      query: PRODUCT_CATEGORY_LOOKUP
    });
    const result2 = apolloClient.query({
      query: CURRENCY_LOOKUP
    });
    const results = await Promise.all([result, result1, result2]);
    if (results[0]?.data?.getUnitLookup) {
      arrUnitLookup = results[0].data.getUnitLookup;
    }
    if (results[1]?.data?.getProductCategoryLookup) {
      arrProductCategoryLookup = results[1].data.getProductCategoryLookup;
    }
    if (results[2]?.data?.getCurrencyLookup) {
      arrCurrencyLookup = results[2].data.getCurrencyLookup;
    }
  } catch (err) {
    console.log('hello', JSON.stringify(err));
  }
  return (
    <ClientAddProduct
      arrUnitLookup={arrUnitLookup}
      arrProductCategoryLookup={arrProductCategoryLookup}
      arrCurrencyLookup={arrCurrencyLookup}
    ></ClientAddProduct>
  );
}
