'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import ProductCategoryEntry from '../../product-category-entry';
import useEditProductCategory from './useEditProductCategory';
import ProductCategoryDTO from '@/app/types/ProductCategoryDTO';

type Props = { dtoProductCategory: ProductCategoryDTO };

const ClientEditProductCategory = ({ dtoProductCategory }: Props) => {
  const { state } = useEditProductCategory();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <ProductCategoryEntry dtoProductCategory={dtoProductCategory} />
    </>
  );
};

export default memo(ClientEditProductCategory, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
