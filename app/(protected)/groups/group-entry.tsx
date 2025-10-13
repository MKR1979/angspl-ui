'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useGroupEntry from './useGroupEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import GroupDTO from '@/app/types/GroupDTO';
import * as Constants from '../constants/constants';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';

type TypeEntryProps = {
  dtoGroup: GroupDTO;
};

const GroupEntry = (props: TypeEntryProps) => {
  const {
    state,
    onInputChange,
    onGroupNameBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    saving,
    setOpen1,
    setClose1,
    onGroupsStatusChange,
    onStatusBlur
  } = useGroupEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Group Name"
              name="group_name"
              value={state.dtoGroup.group_name}
              onChange={onInputChange}
              placeholder='Enter Group Type...'
              inputProps={{
                maxLength: Constants.TYPE_NAME_LENGTH, 
                pattern: '^[A-Za-z]{1,2}$'
              }}
              onBlur={onGroupNameBlur}
              error={state.errorMessages.group_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.group_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{ text: state.dtoGroup.status }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrGroupStatusLookup}
              onChange={onGroupsStatusChange}
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

export default memo(GroupEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
