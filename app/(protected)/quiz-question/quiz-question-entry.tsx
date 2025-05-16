'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useQuizQuestionEntry from './useQuizQuestionEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import QuizQuestionDTO from '@/app/types/QuizQuestionDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import LookupDTO from '@/app/types/LookupDTO';

type QuizQuestionEntryProps = {
  dtoQuizQuestion: QuizQuestionDTO;
  arrQuizLookup: LookupDTO[];
};

const QuizQuestionEntry = (props: QuizQuestionEntryProps) => {
  const {
    state,
    onInputChange,
    onQuizNameChange,
    onStatusBlur,
    onQuestionBlur,
    onQuizBlur,
    onQuizStatusChange,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
  } = useQuizQuestionEntry(props);

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
                id: state.dtoQuizQuestion.quiz_id,
                text: state.dtoQuizQuestion.quiz_name,
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrQuizLookup}
              onChange={onQuizNameChange}
              filterOptions={(options) => // to remove the empty selectable string in the lookup
                options.filter((option: any) => option.text && option.text.trim() !== '')
              }
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Quiz"
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                  onBlur={onQuizBlur}
                  error={state.errorMessages.quiz_name ? true : false}
                />
              )}
            />
            <MyTypography className="error">
              {state.errorMessages.quiz_name}
            </MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Question"
              name="question"
              value={state.dtoQuizQuestion.question}
              onChange={onInputChange}
              onBlur={onQuestionBlur}
              error={state.errorMessages.question ? true : false}
              multiline
              minRows={2} // Minimum height
              maxRows={6} // Optional: limit max expansion
              fullWidth
            />
            <MyTypography className="error">
              {state.errorMessages.question}
            </MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open2}
              onOpen={setOpen2}
              onClose={setClose2}
              value={{ text: state.dtoQuizQuestion.status }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrQuizStatusLookup}
              onChange={onQuizStatusChange}
              onBlur={onStatusBlur}
              filterOptions={(options) =>   // to remove the empty selectable string in the lookup
                options.filter((option: any) => option.text && option.text.trim() !== '')
              }
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Status"
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                  onBlur={onStatusBlur}
                  error={state.errorMessages.status ? true : false}
                />
              )}
            />
            <MyTypography className="error">
              {state.errorMessages.status}
            </MyTypography>
          </MyGrid>
        </MyGrid>
      </MyCardContent>

      <MyDivider />

      <MyCardActions>
        <MyButton onClick={onSaveClick}>Save</MyButton>
        <MyButton onClick={onClearClick}>Clear</MyButton>
        <MyButton onClick={onCancelClick}>Cancel</MyButton>
      </MyCardActions>
    </MyCard>
  );
};

export default memo(QuizQuestionEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
