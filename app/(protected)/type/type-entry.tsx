'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useTypeEntry from './useTypeEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import TypeDTO from '@/app/types/TypeDTO';
import * as Constants from '../constants/constants';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';

type TypeEntryProps = {
  dtoType: TypeDTO;
};

const TypeEntry = (props: TypeEntryProps) => {
  const {
    state,
    onInputChange,
    onTypeNameBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    saving,
    setOpen1,
    setClose1,
    onTypesStatusChange,
    onStatusBlur
  } = useTypeEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Type Name"
              name="type_name"
              value={state.dtoType.type_name}
              onChange={onInputChange}
              placeholder='Enter User Type...'
              inputProps={{
                maxLength: Constants.TYPE_NAME_LENGTH, 
                pattern: '^[A-Za-z]{1,2}$'
              }}
              onBlur={onTypeNameBlur}
              error={state.errorMessages.type_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.type_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{ text: state.dtoType.status }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrTypesStatusLookup}
              onChange={onTypesStatusChange}
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

export default memo(TypeEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
