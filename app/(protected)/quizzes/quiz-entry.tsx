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

type QuizEntryProps = {
  dtoQuiz: QuizDTO;
  arrCourseLookup: LookupDTO[];
};

const QuizEntry = (props: QuizEntryProps) => {
  const { 
    state,
    onInputChange, 
    onQuizNameBlur, 
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
    setClose2 } =
    useQuizEntry(props);

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
                          text: state.dtoQuiz.course_name,
                        }}
                        getOptionLabel={(option: any) => option.text}
                        firstitem={{ id: 0, text: '' }}
                        options={state.arrCourseLookup}
                        onChange={onCourseNameChange}
                        filterOptions={(options) => // to remove the empty selectable string in the lookup
                          options.filter((option: any) => option.text && option.text.trim() !== '')
                        }
                        renderInput={(params) => (
                          <MyTextField
                            {...params}
                            label="Course"
                            slotProps={{
                              inputLabel: { shrink: true },
                            }}
                            onBlur={onCourseBlur}
                            error={state.errorMessages.course_name ? true : false}
                          />
                        )}
                      />
                      <MyTypography className="error">
                        {state.errorMessages.course_name}
                      </MyTypography>
                    </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Quiz Name"
              name="quiz_name"
              value={state.dtoQuiz.quiz_name}
              onChange={onInputChange}
              inputProps={{
                maxLength: 30, // Restricts input to two characters
                pattern: "^[A-Za-z]{1,2}$", // Allows only up to two letters (A-Z, a-z)
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
             onChange={onInputChange}
             inputProps={{
              maxLength: 8,
              pattern: "^[A-Za-z]{1,2}$",
            }}
             />
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
              filterOptions={(options) => // to remove the empty selectable string in the lookup
                options.filter((option: any) => option.text && option.text.trim() !== '')
              }
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Status"
                  slotProps={{
                  inputLabel: { shrink: true }
                  }}
                  onBlur={onQuizStatusBlur}
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
        <MyButton onClick={onSaveClick}>Save</MyButton>
        <MyButton onClick={onClearClick}>Clear</MyButton>
        <MyButton onClick={onCancelClick}>Cancel</MyButton>
      </MyCardActions>
    </MyCard>
  );
};

export default memo(QuizEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
