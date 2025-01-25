'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewProductCategory from './useViewProductCategory';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import ProductCategoryDTO from '@/app/types/ProductCategoryDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoProductCategory: ProductCategoryDTO;
};

const ClientViewProductCategory = ({ dtoProductCategory }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewProductCategory({ dtoProductCategory });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Product Category Name:</MyTypography>
              <MyTypography>{state.dtoProductCategory.product_category_name}</MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoProductCategory.created_by_user_name}
          createdAt={state.dtoProductCategory.created_at}
          modifiedBy={state.dtoProductCategory.modified_by_user_name}
          modifiedAt={state.dtoProductCategory.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewProductCategory, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
