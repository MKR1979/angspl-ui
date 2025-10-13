'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useStudyNotesEntry from './useStudyNotesEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import StudyNotesDTO from '@/app/types/StudyNotesDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import LookupDTO from '@/app/types/LookupDTO';
import * as Constants from '../../constants/constants';

type StudyNotesEntryProps = {
  dtoStudyNotes: StudyNotesDTO;
  arrCourseLookup: LookupDTO[];
};

const StudyNotesEntry = (props: StudyNotesEntryProps) => {
  const {
    state,
    onInputChange,
    onPlainInputChange,
    onCourseChange,
    onStatusBlur,
    onTitleBlur,
    onCourseBlur,
    onStudyNotesStatusChange,
    // onDescriptionBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    saving
  } = useStudyNotesEntry(props);

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
                id: state.dtoStudyNotes.course_id,
                text: state.dtoStudyNotes.course_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCourseLookup}
              onChange={onCourseChange}
              filterOptions={(options, state) => {
                // searchable lookup
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Course"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onCourseBlur}
                  error={state.errorMessages.course_name ? true : false}
                />
              )}
            />
            <MyTypography className="error">{state.errorMessages.course_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Title"
              name="title"
              value={state.dtoStudyNotes.title}
              onChange={onInputChange}
              inputProps={{
                maxLength: Constants.STUDY_NOTES_TITLE_LENGTH,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              onBlur={onTitleBlur}
              error={state.errorMessages.title ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.title}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open2}
              onOpen={setOpen2}
              onClose={setClose2}
              value={{ text: state.dtoStudyNotes.status }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCourseStatusLookup}
              onChange={onStudyNotesStatusChange}
              onBlur={onStatusBlur}
              filterOptions={(options, state) => {
                // searchable lookup
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Status"
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
          <MyGrid size={{ xs: 12, sm: 12 }}>
            <MyTextField
              label="Description"
              name="description"
              value={state.dtoStudyNotes.description}
              onChange={onPlainInputChange}
              // onBlur={onDescriptionBlur}
              error={state.errorMessages.description ? true : false}
              multiline
              minRows={2}
              maxRows={15}
              fullWidth
            />
            <MyTypography className="error">{state.errorMessages.description}</MyTypography>
          </MyGrid>
        </MyGrid>
      </MyCardContent>
      <MyDivider />
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

export default memo(StudyNotesEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
