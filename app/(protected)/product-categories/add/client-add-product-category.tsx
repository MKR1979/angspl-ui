'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import ProductCategoryEntry from '../product-category-entry';
import useAddProductCategory from './useAddProductCategory';
import { PRODUCT_CATEGORY } from '@/app/types/ProductCategoryDTO';

const ClientAddProductCategory = () => {
  const { state } = useAddProductCategory();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <ProductCategoryEntry dtoProductCategory={PRODUCT_CATEGORY} />
    </>
  );
};

export default memo(ClientAddProductCategory, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
