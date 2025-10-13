'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useQuizEntry from './useQuizEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import QuizDTO from '@/app/types/QuizDTO';
import LookupDTO from '@/app/types/LookupDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import * as Constants from '../../constants/constants';

type QuizEntryProps = {
  dtoQuiz: QuizDTO;
  arrCourseLookup: LookupDTO[];
};

const QuizEntry = (props: QuizEntryProps) => {
  const {
    state,
    saving,
    onInputChange,
    onQuizNameBlur,
    onQuizCodeBlur,
    onQuizStatusBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    onQuizStatusChange,
    onCourseNameChange,
    onCourseBlur,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    onQuizTypeBlur,
    onQuizTypeChange,
    onExamDurationChange,
    onQuizCodeChange,
  } = useQuizEntry(props);

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
                id: state.dtoQuiz.course_id,
                text: state.dtoQuiz.course_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCourseLookup}
              onChange={onCourseNameChange}
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
                  placeholder="Select Course..."
                  error={state.errorMessages.course_name ? true : false}
                />
              )}
            />
            <MyTypography className="error">{state.errorMessages.course_name}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Quiz Name"
              name="quiz_name"
              value={state.dtoQuiz.quiz_name}
              onChange={onInputChange}
              placeholder="Enter Exam Name..."
              inputProps={{
                maxLength: Constants.QUIZ_NAME_LENGTH,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              onBlur={onQuizNameBlur}
              error={state.errorMessages.quiz_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.quiz_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Quiz Code"
              name="quiz_code"
              value={state.dtoQuiz.quiz_code}
              onChange={onQuizCodeChange}
              onBlur={onQuizCodeBlur}
              placeholder="Enter Exam Code..."
              inputProps={{
                maxLength: Constants.CODE_LENGTH,
                pattern: '^[A-Z0-9]+$'
              }}
              error={state.errorMessages.quiz_code ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.quiz_code}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open3}
              onOpen={setOpen3}
              onClose={setClose3}
              value={{ text: state.dtoQuiz.quiz_type }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrQuizTypeLookup}
              onChange={onQuizTypeChange}
              onBlur={onQuizTypeBlur}
              filterOptions={(options, state) => {
                // searchable lookup
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Quiz Type"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onQuizTypeBlur}
                  placeholder="eg. Practive / Graded exam"
                  error={state.errorMessages.quiz_type ? true : false}
                />
              )}
            />
            <MyTypography className="error"> {state.errorMessages.quiz_type}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Exam Duration"
              name="exam_duration"
              value={state.dtoQuiz.exam_duration || ''}
              //value={state.dtoQuiz.exam_duration === 0 ? '' : state.dtoQuiz.exam_duration}
              onChange={onExamDurationChange}
              placeholder="Enter value in minutes"
              inputProps={{
                maxLength: Constants.EXAM_DURATION_LENGTH,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              error={state.errorMessages.exam_duration ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.exam_duration}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{ text: state.dtoQuiz.status }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrQuizStatusLookup}
              onChange={onQuizStatusChange}
              onBlur={onQuizStatusBlur}
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
                  onBlur={onQuizStatusBlur}
                  placeholder="eg. Active, In-active"
                  error={state.errorMessages.status ? true : false}
                />
              )}
            />
            <MyTypography className="error"> {state.errorMessages.status}</MyTypography>
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

export default memo(QuizEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
