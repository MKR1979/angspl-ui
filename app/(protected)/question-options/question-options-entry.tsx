'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useQuestionOptionsEntry from './useQuestionOptionsEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import QuestionOptionsDTO from '@/app/types/QuestionOptionsDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';

type QuestionOptionsEntryProps = {
  dtoQuestionOptions: QuestionOptionsDTO;
};

const QuestionOptionsEntry = (props: QuestionOptionsEntryProps) => {
  const {
    state,
    onOptionTextBlur,
    onInputChange,
    onQuestionChange,
    onExplanationBlur,
    onSaveClick,
    onQuestionBlur,
    onQuizBlur,
    onQuizNameChange,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2
  } = useQuestionOptionsEntry(props);
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
                id: state.dtoQuestionOptions.quiz_id,
                text: state.dtoQuestionOptions.quiz_name
              }}
              getOptionLabel={(option: any) => option?.text ?? ''}
              firstitem={{ id: 0, text: '' }}
              options={state.arrQuizLookup}
              onChange={onQuizNameChange}
              filterOptions={(
                options // to remove the empty selectable string in the lookup
              ) => options.filter((option: any) => option.text && option.text.trim() !== '')}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Quiz"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onQuizBlur}
                  error={state.errorMessages.quiz_name ? true : false}
                />
              )}
            />
            <MyTypography className="error">{state.errorMessages.quiz_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{
                id: state.dtoQuestionOptions.question_id,
                text: state.dtoQuestionOptions.question
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrQuestionLookup}
              onChange={onQuestionChange}
              filterOptions={(
                options // to remove the empty selectable string in the lookup
              ) => options.filter((option: any) => option.text && option.text.trim() !== '')}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Question"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onQuestionBlur}
                  error={state.errorMessages.question ? true : false}
                />
              )}
            />
            <MyTypography className="error"> {state.errorMessages.question}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Option"
              name="option_text"
              value={state.dtoQuestionOptions.option_text}
              onChange={onInputChange}
              onBlur={onOptionTextBlur}
              error={state.errorMessages.option_text ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.option_text}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Explanation"
              name="explanation"
              value={state.dtoQuestionOptions.explanation}
              onChange={onInputChange}
              onBlur={onExplanationBlur}
              error={state.errorMessages.explanation ? true : false}
            />
            <MyTypography className="error">{state.errorMessages.explanation}</MyTypography>
          </MyGrid>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="is_correct"
              checked={state.dtoQuestionOptions.is_correct}
              onChange={onInputChange}
              className="accent-blue-600 w-5 h-5"
            />
            <span className="text-gray-800 ml-2">is_correct</span>
          </label>
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

export default memo(QuestionOptionsEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
