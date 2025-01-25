'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useProductCategoryEntry from './useProductCategoryEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import ProductCategoryDTO from '@/app/types/ProductCategoryDTO';

type ProductCategoryEntryProps = {
  dtoProductCategory: ProductCategoryDTO;
};

const ProductCategoryEntry = (props: ProductCategoryEntryProps) => {
  const { state, onInputChange, onProductCategoryNameBlur, onSaveClick, onCancelClick } = useProductCategoryEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Product Category Name"
              name="product_category_name"
              value={state.dtoProductCategory.product_category_name}
              onChange={onInputChange}
              onBlur={onProductCategoryNameBlur}
              error={state.errorMessages.product_category_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.product_category_name}</MyTypography>
          </MyGrid>
        </MyGrid>
      </MyCardContent>
      <MyDivider></MyDivider>
      <MyCardActions>
        <MyButton onClick={onSaveClick} disabled={state.saveDisabled}>
          Save
        </MyButton>
        <MyButton onClick={onCancelClick}>Cancel</MyButton>
      </MyCardActions>
    </MyCard>
  );
};

export default memo(ProductCategoryEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
