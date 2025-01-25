'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import ProductEntry from '../product-entry';
import useAddProduct from './useAddProduct';
import { PRODUCT } from '@/app/types/ProductDTO';
import LookupDTO from '@/app/types/LookupDTO';
type Props = { arrUnitLookup: LookupDTO[]; arrProductCategoryLookup: LookupDTO[]; arrCurrencyLookup: LookupDTO[] };
const ClientAddProduct = ({ arrUnitLookup, arrProductCategoryLookup, arrCurrencyLookup }: Props) => {
  const { state } = useAddProduct();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <ProductEntry
        dtoProduct={PRODUCT}
        arrUnitLookup={arrUnitLookup}
        arrProductCategoryLookup={arrProductCategoryLookup}
        arrCurrencyLookup={arrCurrencyLookup}
      />
    </>
  );
};

export default memo(ClientAddProduct, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
