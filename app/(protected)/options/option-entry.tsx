'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useOptionEntry from './useOptionEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import OptionDTO from '@/app/types/OptionDTO';
import LookupDTO from '@/app/types/LookupDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import * as Constants from '../constants/constants';

type OptionEntryProps = {
  dtoOption: OptionDTO;
  arrModuleLookup: LookupDTO[];
};

const OptionEntry = (props: OptionEntryProps) => {
  const {
    state,
    onInputChange,
    onOptionNameBlur,
    onOptionCodeBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    onModuleNameChange,
    onModuleBlur,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    onStatusChange,
    onStatusBlur,
    saving,
    onOptionCodeChange
  } = useOptionEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open2}
              onOpen={setOpen2}
              onClose={setClose2}
              value={{
                id: state.dtoOption.module_id,
                text: state.dtoOption.module_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrModuleLookup}
              onChange={onModuleNameChange}
              filterOptions={(options, state) => {
                // searchable lookup
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Modules"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onModuleBlur}
                  placeholder="Select Module..."
                  error={state.errorMessages.module_name ? true : false}
                />
              )}
            />
            <MyTypography className="error">{state.errorMessages.module_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Option Name"
              name="option_name"
              value={state.dtoOption.option_name}
              onChange={onInputChange}
              placeholder="Enter Option Name..."
              inputProps={{
                maxLength: Constants.OPTION_NAME_LENGTH,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              onBlur={onOptionNameBlur}
              error={state.errorMessages.option_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.option_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Option Code"
              name="option_code"
              value={state.dtoOption.option_code || ''}
              onChange={onOptionCodeChange}
              placeholder="Enter option code..."
              inputProps={{
                maxLength: Constants.CODE_LENGTH,
                inputMode: 'numeric', // mobile numeric keypad
                pattern: '^[A-Z0-9]+$'
              }}
              onBlur={onOptionCodeBlur}
              error={state.errorMessages.option_code ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.option_code}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{ text: state.dtoOption.status }}
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
                  placeholder='Select status...'
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

export default memo(OptionEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
