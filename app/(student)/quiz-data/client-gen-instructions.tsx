'use client';
import React from 'react';
import './quiz.css';
import useQuiz from './useQuizData';
import MyGrid from '@/app/custom-components/MyGrid';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyTextField from '@/app/custom-components/MyTextField';
import MyTypography from '@/app/custom-components/MyTypography';
import MyButton from '@/app/custom-components/MyButton';
import { List, ListItem, Typography } from '@mui/material';
import ClientQuiz from './client-quiz-data';
import { useSelector } from '@/app/store';

interface ClientCodeProjectProps {
  courseId?: number;
  courseName?: string;
}

// const ClientGenInstruction = () => {
const ClientGenInstruction: React.FC<ClientCodeProjectProps> = (props) => {
  const {
    state,
    quizQuestions,
    onQuizNameChange,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    courseId,
    onCourseNameChange,
    handleStartExam,
    onCourseBlur,
    onExamBlur,
    onToggleReadInstructions
  } = useQuiz(props);
  const { showQuiz } = useSelector((state) => state.siteConfigState);

  console.log('course id we get from page.tsx', courseId);
  return (
    <>
      {showQuiz ? (
        <ClientQuiz quizQuestions={quizQuestions} dtoQuizData={state.dtoQuizData} />
      ) : (
        <>
          <div className="quiz-container">
            <div className="course-tabs-wrapper">
              <MyGrid size={{ xs: 12, sm: 1 }} style={{ width: '500px', marginTop: '10px' }}>
                <MyAutocomplete
                  className="my-autocomplete"
                  sx={{ width: '100%' }}
                  open={state.open2}
                  // onOpen={setOpen2}
                  // onClose={setClose2}
                  onOpen={courseId ? undefined : setOpen2}
                  onClose={courseId ? undefined : setClose2}
                  // value={{
                  //   id: state.dtoQuizData.course_id,
                  //   text: state.dtoQuizData.course_name
                  // }}
                  value={state.arrCourseLookup.find((opt) => opt.id === state.dtoQuizData.course_id) ?? { id: 0, text: '' }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrCourseLookup}
                  onChange={onCourseNameChange}
                  onBlur={onCourseBlur}
                  filterOptions={(options, state) => {
                    // searchable lookup
                    const searchTerm = state.inputValue.toLowerCase();
                    return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                  }}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Select Course"
                      //className="quiz-input"
                      // slotProps={{ inputLabel: { shrink: true }, }}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                          sx: {
                            fontSize: '20px',
                            fontWeight: '500',
                            transform: 'translate(14px, -19px) scale(1)'
                          }
                        }
                      }}
                      error={!!state.errorMessages.course_name}
                      placeholder="Select your course..."
                    />
                  )}
                />
                <MyTypography className="error">{state.errorMessages.course_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 1 }} style={{ width: '500px', marginTop: '10px' }}>
                <MyAutocomplete
                  className="my-autocomplete"
                  open={state.open1}
                  onOpen={setOpen1}
                  onClose={setClose1}
                  value={
                    state.arrQuizLookup.find((opt: any) => opt.id === (state.dtoQuizData.id ?? state.dtoQuizData?.id)) ?? {
                      id: 0,
                      text: ''
                    }
                  }
                  getOptionLabel={(option: any) => option?.text ?? ''}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrQuizLookup}
                  onChange={onQuizNameChange}
                  onBlur={onExamBlur}
                  filterOptions={(options, state) => {
                    const searchTerm = state.inputValue.toLowerCase();
                    return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                  }}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Select Exam"
                      //className="quiz-input"
                      // slotProps={{ inputLabel: { shrink: true } }}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                          sx: {
                            fontSize: '20px',
                            fontWeight: '500',
                            transform: 'translate(14px, -19px) scale(1)'
                          }
                        }
                      }}
                      placeholder="Select your exam..."
                      error={!!state.errorMessages.quiz_name}
                    />
                  )}
                />
                <MyTypography className="error">{state.errorMessages.quiz_name}</MyTypography>
              </MyGrid>
            </div>
          </div>
          <Typography variant="h6" style={{ marginTop: '15px', marginBottom: '1px' }}>
            General Instructions for Your Exams:
          </Typography>
          <List>
            {[
              '✔ Ensure a stable internet connection throughout the exam.',
              '✔ Do not refresh or close the browser window during the exam.',
              '✔ Use the Next and Previous buttons to navigate between questions.',
              '✔ The exam will automatically end when the timer reaches zero.',
              '✔ Click Submit after completing all questions to submit your exam.'
            ].map((instruction, idx) => (
              <ListItem key={idx}>
                <Typography variant="body1">{instruction}</Typography>
              </ListItem>
            ))}
          </List>

          <MyGrid size={{ xs: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                style={{ transform: 'scale(1.5)' }}
                checked={state.hasReadInstructions}
                onChange={(e) => onToggleReadInstructions(e.target.checked)}
              />
              I have read all the instructions carefully.
            </label>
            {state.startExamError && (
              <MyTypography className="error" style={{ marginTop: '4px' }}>
                {state.startExamError}
              </MyTypography>
            )}
          </MyGrid>
          <MyButton variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleStartExam}>
            Start Exam
          </MyButton>
        </>
      )}
    </>
  );
};

export default ClientGenInstruction;
