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
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import * as gConstants from '../../constants/constants';
import * as Constants from '../constants/constants';

type CurrencyEntryProps = {
  dtoCurrency: CurrencyDTO;
};

const CurrencyEntry = (props: CurrencyEntryProps) => {
  const {
    state,
    onInputChange,
    onCodeChange,
    onCurrencyNameBlur,
    onCurrencyCodeBlur,
    onCurrencySymbolBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    saving,
    setOpen1,
    setClose1,
    onStatusChange,
    onStatusBlur
  } = useCurrencyEntry(props);

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
              inputProps={{
                maxLength: gConstants.FIRST_NAME_LENGTH
              }}
              error={state.errorMessages.currency_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.currency_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Currency Code"
              name="currency_code"
              value={state.dtoCurrency.currency_code}
              onChange={onCodeChange}
              onBlur={onCurrencyCodeBlur}
              inputProps={{
                maxLength: Constants.CODE_LENGTH,
                  pattern: '^[A-Z0-9]+$'
              }}
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
              inputProps={{
                maxLength: Constants.CODE_LENGTH
              }}
              error={state.errorMessages.currency_symbol ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.currency_symbol}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{ text: state.dtoCurrency.status }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCommonStatusLookup}
              onChange={onStatusChange}
              onBlur={onStatusBlur}
              filterOptions={(options, state) => {
                // searchable Lookup
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Status"
                  placeholder="Select status..."
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onStatusBlur}
                  error={state.errorMessages.status ? true : false}
                />
              )}
            />
            <MyTypography className="error">{state.errorMessages.status}</MyTypography>
          </MyGrid>
        </MyGrid>
      </MyCardContent>
      <MyDivider></MyDivider>
      <MyCardActions>
        <MyButton onClick={onSaveClick} disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </MyButton>
        <MyButton onClick={onClearClick}>Clear</MyButton>
        <MyButton onClick={onCancelClick}>Cancel</MyButton>
      </MyCardActions>
    </MyCard>
  );
};

export default memo(CurrencyEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
