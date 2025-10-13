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
import * as Constants from '../../constants/constants';

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
    saving,
    arrOptions,
    onAddOption,
    onOptionChange,
    onRemoveOption,
    hasDuplicateOptions
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
                text: state.dtoQuizQuestion.quiz_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrQuizLookup}
              onChange={onQuizNameChange}
              filterOptions={(options, state) => {
                // searchable lookup
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Quiz"
                  placeholder="Select Quiz name..."
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
              open={state.open2}
              onOpen={setOpen2}
              onClose={setClose2}
              value={{ text: state.dtoQuizQuestion.status }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrQuizStatusLookup}
              onChange={onQuizStatusChange}
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
                  placeholder="Select question status..."
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
          <MyGrid size={{ xs: 12, sm: 6 }} style={{ marginBottom: '0.5rem' }}>
            <MyTextField
              label="Question"
              name="question"
              value={state.dtoQuizQuestion.question}
              onChange={onInputChange}
              onBlur={onQuestionBlur}
              placeholder="Enter question here..."
              error={state.errorMessages.question ? true : false}
              multiline
              minRows={1}
              maxRows={4}
              fullWidth
            />
            <MyTypography className="error">{state.errorMessages.question}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }} style={{ textAlign: 'right', marginTop: '0.2rem', marginBottom: '0.5rem' }}>
            <MyButton onClick={onAddOption} variant="outlined" disabled={hasDuplicateOptions}>
              ➕ Add Option
            </MyButton>
          </MyGrid>

          {arrOptions.map((opt, idx) => (
            <MyGrid key={idx} size={{ xs: 12 }} style={{ marginTop: '0.1rem' }}>
              <MyGrid container spacing={2}>
                <MyGrid size={{ xs: 12, sm: 4 }}>
                  <MyTextField
                    label={`Option ${idx + 1}`}
                    value={opt.option_text}
                    placeholder={`Enter option ${idx + 1}...`}
                    onChange={(e) => onOptionChange(idx, 'option_text', e.target.value)}
                    fullWidth
                    inputProps={{ maxLength: Constants.OPTION_LENGTH }}
                    error={
                      !!opt.option_text.trim() &&
                      arrOptions.some((o, i) => i !== idx && !!o.option_text.trim() && o.option_text.trim() === opt.option_text.trim())
                    }
                    helperText={
                      !!opt.option_text.trim() &&
                      arrOptions.some((o, i) => i !== idx && !!o.option_text.trim() && o.option_text.trim() === opt.option_text.trim())
                        ? 'Duplicate option not allowed'
                        : ''
                    }
                  />
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 5 }}>
                  <MyTextField
                    label="Explanation (optional)"
                    placeholder={`Explanation for option ${idx + 1}...`}
                    value={opt.explanation}
                    onChange={(e) => onOptionChange(idx, 'explanation', e.target.value)}
                    fullWidth
                    inputProps={{ maxLength: Constants.EXPLANATION_LENGTH }}
                  />
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 2 }} style={{ display: 'flex', alignItems: 'center' }}>
                  <label>
                    <input
                      type="checkbox"
                      checked={opt.is_correct}
                      onChange={(e) => onOptionChange(idx, 'is_correct', e.target.checked)}
                      style={{ transform: 'scale(1.5)' }}
                    />
                    &nbsp;Is Correct
                  </label>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 1 }} style={{ display: 'flex', alignItems: 'center' }}>
                  <MyButton
                    variant="outlined"
                    color="primary"
                    onClick={() => onRemoveOption(idx)}
                    style={{
                      color: 'red',
                      borderColor: '#1976d2',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    Remove
                  </MyButton>
                </MyGrid>
              </MyGrid>
            </MyGrid>
          ))}
        </MyGrid>
      </MyCardContent>
      <MyDivider />

      <MyCardActions>
        <MyButton onClick={onSaveClick} disabled={saving || hasDuplicateOptions}>
          {saving ? 'Saving...' : 'Save'}
        </MyButton>
        <MyButton onClick={onClearClick}>Clear</MyButton>
        <MyButton onClick={onCancelClick}>Cancel</MyButton>
      </MyCardActions>
    </MyCard>
  );
};

export default memo(QuizQuestionEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
