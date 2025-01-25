'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewTax from './useViewTax';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import TaxDTO from '@/app/types/TaxDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoTax: TaxDTO;
};

const ClientViewTax = ({ dtoTax }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewTax({ dtoTax });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Tax Description:</MyTypography>
              <MyTypography>{state.dtoTax.tax_description}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Tax Percentage:</MyTypography>
              <MyTypography>{state.dtoTax.tax_percentage.toString()}</MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoTax.created_by_user_name}
          createdAt={state.dtoTax.created_at}
          modifiedBy={state.dtoTax.modified_by_user_name}
          modifiedAt={state.dtoTax.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewTax, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
