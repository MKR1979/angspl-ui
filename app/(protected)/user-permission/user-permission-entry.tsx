'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useUserPermissionEntry from './useUserPermissionEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import UserPermissionDTO from '@/app/types/UserPermissionDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';

type UserPermissionEntryProps = {
  dtoUserPermission: UserPermissionDTO;
};

const UserPermissionEntry = (props: UserPermissionEntryProps) => {
  const {
    state,
    onInputChange,
    onSaveClick,
    onOptionNameChange,
    onOptionBlur,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    saving,
    onUserNameChange,
    onModuleNameChange,
    onModuleBlur,
    onUserNameBlur
  } = useUserPermissionEntry(props);
  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{
                id: state.dtoUserPermission.user_id,
                text: state.dtoUserPermission.user_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrUserLookup}
              onChange={onUserNameChange}
              filterOptions={(options, state) => {
                // searchable lookup
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Users"
                  placeholder="Select User name..."
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onUserNameBlur}
                />
              )}
            />
            <MyTypography className="error"> {state.errorMessages.user_id}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open2}
              onOpen={setOpen2}
              onClose={setClose2}
              value={{
                id: state.dtoUserPermission.module_id,
                text: state.dtoUserPermission.module_name
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
            <MyAutocomplete
              open={state.open3}
              onOpen={setOpen3}
              onClose={setClose3}
              value={{
                id: state.dtoUserPermission.option_id,
                text: state.dtoUserPermission.option_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrOptionLookup}
              onChange={onOptionNameChange}
              filterOptions={(options, state) => {
                // searchable Lookup
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Option"
                  placeholder="Select option..."
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onOptionBlur}
                  error={state.errorMessages.option_name ? true : false}
                />
              )}
            />
            <MyTypography className="error">{state.errorMessages.option_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 2 }} style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                name="grant"
                checked={state.dtoUserPermission.grant}
                onChange={onInputChange}
                style={{ transform: 'scale(1.4)', cursor: 'pointer', margin: '0 5px' }}
              />
              &nbsp;Grant
            </label>
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

export default memo(UserPermissionEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
