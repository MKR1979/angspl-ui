'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useRoleEntry from './useRoleEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import RoleDTO from '@/app/types/RoleDTO';
import * as gConstants from '../../constants/constants';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';

type RoleEntryProps = {
  dtoRole: RoleDTO;
};

const RoleEntry = (props: RoleEntryProps) => {
  const {
    state,
    onInputChange,
    onRoleNameBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    onTypeChange,
    onTypeBlur,
    onRolesStatusChange,
    onStatusBlur,
    saving
  } = useRoleEntry(props);

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
                id: state.dtoRole.type_id,
                text: state.dtoRole.type_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrTypeLookup}
              onChange={onTypeChange}
              filterOptions={(options, state) => {
                // searchable Lookup
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Type"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onTypeBlur}
                  placeholder='Select user type...'
                  error={state.errorMessages.type_name ? true : false}
                />
              )}
            />
            <MyTypography className="error"> {state.errorMessages.type_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Role Name"
              name="role_name"
              value={state.dtoRole.role_name}
              onChange={onInputChange}
              placeholder='Enter role name...'
              inputProps={{
                maxLength: gConstants.FIRST_NAME_LENGTH,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              onBlur={onRoleNameBlur}
              error={state.errorMessages.role_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.role_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{ text: state.dtoRole.status }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrRolesStatusLookup}
              onChange={onRolesStatusChange}
              filterOptions={(options, state) => {
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

export default memo(RoleEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
