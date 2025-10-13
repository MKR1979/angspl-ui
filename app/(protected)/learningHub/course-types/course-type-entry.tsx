'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useCourseTypeEntry from './useCourseTypeEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import CourseTypeDTO from '@/app/types/CourseTypeDTO';
import * as Constants from '../../constants/constants';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';

type CourseTypeEntryProps = {
  dtoCourseType: CourseTypeDTO;
};

const CourseTypeEntry = (props: CourseTypeEntryProps) => {
  const {
    state,
    onInputChange,
    onCourseTypeNameBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    saving,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    onCourseTypesStatusChange,
    onStatusBlur,
    onGroupNameChange,
    onGroupNameBlur,
    onCodeBlur,onCodeChange
  } = useCourseTypeEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="CourseType Name"
              name="course_type_name"
              value={state.dtoCourseType.course_type_name}
              onChange={onInputChange}
              placeholder="Enter Course Type Name..."
              inputProps={{
                maxLength: Constants.TYPE_NAME_LENGTH, // Restricts input to two characters
                pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
              }}
              onBlur={onCourseTypeNameBlur}
              error={state.errorMessages.course_type_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.course_type_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Code"
              name="code"
              value={state.dtoCourseType.code}
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
              open={state.open2}
              onOpen={setOpen2}
              onClose={setClose2}
              value={{
                id: state.dtoCourseType.group_id,
                text: state.dtoCourseType.group_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCourseGroupLookup}
              onChange={onGroupNameChange}
              onBlur={onGroupNameBlur}
              filterOptions={(options, state) => {
                // searchable Lookup
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Group Name"
                  placeholder="Select group..."
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                />
              )}
            />
            <MyTypography className="error"> {state.errorMessages.group_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{ text: state.dtoCourseType.status }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrStatusLookup}
              onChange={onCourseTypesStatusChange}
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

export default memo(CourseTypeEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
