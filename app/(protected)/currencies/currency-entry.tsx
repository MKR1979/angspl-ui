'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useCurrencyEntry from './useCurrencyEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import CurrencyDTO from '@/app/types/CurrencyDTO';

type CurrencyEntryProps = {
  dtoCurrency: CurrencyDTO;
};

const CurrencyEntry = (props: CurrencyEntryProps) => {
  const { state, onInputChange, onCurrencyNameBlur, onCurrencyCodeBlur, onCurrencySymbolBlur, onSaveClick, onClearClick, onCancelClick } =
    useCurrencyEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Currency Name"
              name="currency_name"
              value={state.dtoCurrency.currency_name}
              onChange={onInputChange}
              onBlur={onCurrencyNameBlur}
              error={state.errorMessages.currency_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.currency_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Currency Code"
              name="currency_code"
              value={state.dtoCurrency.currency_code}
              onChange={onInputChange}
              onBlur={onCurrencyCodeBlur}
              error={state.errorMessages.currency_code ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.currency_code}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Currency Symbol"
              name="currency_symbol"
              value={state.dtoCurrency.currency_symbol}
              onChange={onInputChange}
              onBlur={onCurrencySymbolBlur}
              error={state.errorMessages.currency_symbol ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.currency_symbol}</MyTypography>
          </MyGrid>
        </MyGrid>
      </MyCardContent>
      <MyDivider></MyDivider>
      <MyCardActions>
        <MyButton onClick={onSaveClick}>Save</MyButton>
        <MyButton onClick={onClearClick}>Clear</MyButton>
        <MyButton onClick={onCancelClick}>Cancel</MyButton>
      </MyCardActions>
    </MyCard>
  );
};

export default memo(CurrencyEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
