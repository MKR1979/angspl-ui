'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewCurrency from './useViewCurrency';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import CurrencyDTO from '@/app/types/CurrencyDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoCurrency: CurrencyDTO;
};

const ClientViewCurrency = ({ dtoCurrency }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewCurrency({ dtoCurrency });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Currency Name:</MyTypography>
              <MyTypography>{state.dtoCurrency.currency_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Currency Code:</MyTypography>
              <MyTypography>{state.dtoCurrency.currency_code}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Currency Symbol:</MyTypography>
              <MyTypography>{state.dtoCurrency.currency_symbol}</MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoCurrency.created_by_user_name}
          createdAt={state.dtoCurrency.created_at}
          modifiedBy={state.dtoCurrency.modified_by_user_name}
          modifiedAt={state.dtoCurrency.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewCurrency, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
