'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import ProductEntry from '../../product-entry';
import useEditProduct from './useEditProduct';
import ProductDTO from '@/app/types/ProductDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = { dtoProduct: ProductDTO; arrUnitLookup: LookupDTO[]; arrProductCategoryLookup: LookupDTO[]; arrCurrencyLookup: LookupDTO[] };

const ClientEditProduct = ({ dtoProduct, arrUnitLookup, arrProductCategoryLookup, arrCurrencyLookup }: Props) => {
  const { state } = useEditProduct();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <ProductEntry
        dtoProduct={dtoProduct}
        arrUnitLookup={arrUnitLookup}
        arrProductCategoryLookup={arrProductCategoryLookup}
        arrCurrencyLookup={arrCurrencyLookup}
      />
    </>
  );
};

export default memo(ClientEditProduct, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
