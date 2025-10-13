'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useModuleEntry from './useModuleEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import ModuleDTO from '@/app/types/ModuleDTO';
import * as Constants from '../constants/constants';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';

type ModuleEntryProps = {
  dtoModule: ModuleDTO;
};

const ModuleEntry = (props: ModuleEntryProps) => {
  const {
    state,
    onInputChange,
    onCodeChange,
    onModuleNameBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    saving,
    setOpen1,
    setClose1,
    onModulesStatusChange,
    onStatusBlur,
    onCodeBlur
  } = useModuleEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Module Name"
              name="module_name"
              value={state.dtoModule.module_name}
              onChange={onInputChange}
              placeholder="Enter Module Name..."
              inputProps={{
                maxLength: Constants.MODULE_NAME_LENGTH, // Restricts input to two characters
                pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
              }}
              onBlur={onModuleNameBlur}
              error={state.errorMessages.module_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.module_name}</MyTypography>
          </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Code"
              name="code"
              value={state.dtoModule.code}
              onChange={onCodeChange}
              onBlur={onCodeBlur}
              placeholder="Enter Code..."
              inputProps={{
                maxLength: Constants.CODE_LENGTH,
                  pattern: '^[A-Z0-9]+$'
              }}
              error={state.errorMessages.code ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.code}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{ text: state.dtoModule.status }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrModulesStatusLookup}
              onChange={onModulesStatusChange}
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
        {/* <MyButton onClick={onSaveClick}>Save</MyButton> */}
        <MyButton onClick={onSaveClick} disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </MyButton>
        <MyButton onClick={onClearClick}>Clear</MyButton>
        <MyButton onClick={onCancelClick}>Cancel</MyButton>
      </MyCardActions>
    </MyCard>
  );
};

export default memo(ModuleEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
